const {StateLoader, DomainEvent} = require('@serialized/serialized-client')
const {
  TodoAdded,
  TodoCompleted,
  TodoListState,
  TodoList,
  TodoListCompleted,
  TodoListCreated
} = require("../src/todolist");
const uuidv4 = require('uuid').v4;

describe('TodoList', function () {

  it('should reject todos after it is completed', function () {

    let todoListId = uuidv4();
    let todoId = uuidv4();
    let events = [
      new TodoListCreated(todoListId, 'Xmas Gifts'),
      new TodoAdded(todoListId, todoId, 'A new computer'),
      new TodoCompleted(todoListId, todoId),
      new TodoListCompleted(todoListId),
    ];

    let stateLoader = new StateLoader(TodoList);
    let state = stateLoader.loadState(events.map((e) => DomainEvent.create(e)));
    let todoList = new TodoList(state);

    expect(() => todoList.addTodo(uuidv4(), 'Too late to add more todos..')).toThrowError();

  });

  it('should emit one event when list is new', function () {
    let state = TodoListState.newState();
    let todoList = new TodoList(state);

    expect(todoList.createList(uuidv4(), 'XMas gifts').length).toStrictEqual(1)
  });

  it('should fail if empty list name', function () {
    let state = TodoListState.newState();
    let todoList = new TodoList(state);

    expect(() => todoList.createList(uuidv4(), '1')).toThrowError('Name must have length >= 5')
  });

});
