class TodoListState {

  constructor({todoListId, name, todos = [], completedTodos = [], completed = false}) {
    this.todoListId = todoListId;
    this.name = name;
    this.todos = todos;
    this.completedTodos = completedTodos;
    this.completed = completed;
  }

  static newState(todoListId, name) {
    return new TodoListState({todoListId, name})
  }

  withListId(todoListId) {
    return Object.assign({}, this, {todoListId});
  }

  addTodo(todo) {
    return Object.assign({}, this, {todos: this.todos.unshift(todo)});
  }

  completeTodo(todoId) {
    let completedTodos = this.completedTodos.slice();
    completedTodos.push(todoId);
    return Object.assign({}, this, {completedTodos: completedTodos});
  }

  completeList() {
    return Object.assign({}, this, {completed: true});
  }

  get todosLeft() {
    return this.todos.length - this.completedTodos.length;
  }

  get isCompleted() {
    return this.completed;
  }

}

class TodoListCreated {
  constructor(todoListId, name) {
    this.todoListId = todoListId;
    this.name = name;
  }
}

class TodoListCompleted {
  constructor(todoListId) {
    this.todoListId = todoListId;
  }
}

class TodoAdded {
  constructor(todoListId, todoId, text) {
    this.todoListId = todoListId;
    this.todoId = todoId;
    this.text = text;
  }
}

class TodoCompleted {
  constructor(todoListId, todoId) {
    this.todoListId = todoListId;
    this.todoId = todoId;
  }
}

class TodoList {

  get aggregateType() {
    return 'todo-list';
  }

  constructor(state) {
    this.todoListId = state.todoListId;
    this.completedTodos = state.completedTodos;
    this.todos = state.todos;
    this.todosLeft = state.todosLeft;
    this.completed = state.completed;
  }

  createList(listId, name) {
    if (!listId || listId.length !== 36) throw "Invalid listId";
    if (!name || name.length < 5) throw "Name must have length >= 5";
    return [new TodoListCreated(listId, name)];
  }

  addTodo(todoId, text) {
    if (this.completed) throw "List cannot be changed since it has been completed";
    if (text === undefined || text.length < 5) throw "Text must have length > 4";
    return [new TodoAdded(this.todoListId, todoId, text)];
  }

  completeTodo(todoId) {
    if (!this.isTodoCompleted(todoId)) {
      let events = [];
      events.push(new TodoCompleted(this.todoListId, todoId));
      if (this.todosLeft === 1) {
        events.push([new TodoListCompleted(this.todoListId)]);
      }
      return events;
    } else {
      // Don't emit event if already completed
      return []
    }
  }

  isTodoCompleted(todoId) {
    return this.completedTodos.indexOf(todoId) > -1
  }

  get eventHandlers() {
    return {
      TodoListCreated(state, event) {
        console.log('Handling TodoListCreated', event)
        return TodoListState.newState(event.todoListId, event.name)
            .withListId(event.todoListId);
      },

      TodoAdded(state, event) {
        console.log('Handling TodoAdded', event)
        return new TodoListState(state).addTodo({text: event.text, todoId: event.todoId});
      },

      TodoCompleted(state, event) {
        console.log('Handling TodoListCompleted', event)
        return new TodoListState(state).completeTodo(event.todoId)
      },

      TodoListCompleted(state, event) {
        console.log('Handling TodoListCompleted', event)
        return new TodoListState(state).completeList();
      }
    }
  }


}

module.exports = {TodoList, TodoListState, TodoAdded, TodoListCreated, TodoCompleted, TodoListCompleted};
