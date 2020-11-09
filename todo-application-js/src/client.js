const {TodoList} = require('./todolist');

const handleError = async function (handler) {
  try {
    await handler();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to process command: ' + error);
  }
}

class TodoListClient {

  constructor(serializedClient) {
    this.client = serializedClient.aggregateClient(TodoList);
  }

  async createTodoList(listId, name) {
    await handleError(async () => await this.client.create(listId, (todoList) => {
      return todoList.createList(listId, name);
    }));
  }

  async createTodo(listId, todoId, text) {
    await handleError(async () => await this.client.update(listId, (todoList) => {
      return todoList.addTodo(todoId, text);
    }));
  }

  async completeTodo(listId, todoId) {
    await handleError(async () => await this.client.update(listId, (todoList) => {
      return todoList.completeTodo(todoId);
    }));
  }

}

module.exports = TodoListClient;
