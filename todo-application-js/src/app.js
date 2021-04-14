const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const chalk = require('chalk');
const {Serialized} = require("@serialized/serialized-client");
const TodoListClient = require('./client');
const TodoListView = require("./viewmodel");
const {ProjectionsClient} = require("./projections");

dotenv.config();
const configuration = {
  port: process.env.PORT,
  serialized: {
    accessKey: process.env.SERIALIZED_ACCESS_KEY,
    secretAccessKey: process.env.SERIALIZED_SECRET_ACCESS_KEY
  }
};

const app = express();

app.use(clientErrorHandler);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const serializedClient = Serialized.create(configuration.serialized);
const todoListClient = new TodoListClient(serializedClient);
const projectionsClient = new ProjectionsClient(serializedClient);

app.get('/', async function (req, res) {
  try {
    const lists = await projectionsClient.findListProjections();
    const views = lists.map(list => TodoListView.fromProjection(list.data));
    res.render('index', {lists: views});
  } catch (error) {
    res.status(400).json({error: error})
  }
});

app.get('/stats', async function (req, res) {
  try {
    let stats = (await projectionsClient.findListStats()).data;
    res.send(stats);
  } catch (error) {
    res.status(400).json({error: error})
  }
});


app.get('/lists/:listId', async function (req, res) {
  const listId = req.params.listId;
  try {
    let view = TodoListView.fromProjection((await projectionsClient.findListProjection(listId)).data);
    res.render('list', view);
  } catch (error) {
    res.status(400).json({error: error})
  }
});

app.post('/commands/create-list', async function (req, res) {
  const {listId, name} = req.body
  console.dir(req.body)
  try {
    await todoListClient.createTodoList(listId, name);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({error: error})
  }
});

app.post('/commands/create-todo', async function (req, res) {
  const {listId, todoId, text} = req.body;
  try {
    await todoListClient.createTodo(listId, todoId, text);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({error: error})
  }
});

app.post('/commands/complete-todo', async function (req, res) {
  const {listId, todoId} = req.body;
  try {
    await todoListClient.completeTodo(listId, todoId);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({error: error})
  }
});

app.listen(configuration.port, async () => {

  console.log(`Starting ${chalk.green.bold(process.env.SERVICE_NAME)}...`);

  await projectionsClient.updateProjections();

  console.log(`Application ${chalk.green.bold(process.env.SERVICE_NAME)} is up and running.`);
  console.log(`API is available at: https://localhost:${configuration.port}`);
});

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    console.error(err);
    res.status(500).json({error: err})
  } else {
    next(err)
  }
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

function errorHandler(err, req, res, next) {
  res.status(err.status);
  res.render('error', {error: err})
}


