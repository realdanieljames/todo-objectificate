const readline = require('readline');
const fs = require('fs');

// let todos
let todos = [];
const interface = readline.createInterface({input: process.stdin, output: process.stdout})
const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Mark a todo completed.
4. Mark a todo uncompleted.
5. Quit.

`

// get JSON instead of CSV
//   and put the data in our javascript without .split
const loadTodos = function() {
  const file = fs.readFileSync(__dirname + '/../back-end/todos.json' ,'utf8');
  const toDosObject = JSON.parse(file)
  
  
  todos = toDosObject.todos
  console.log(todos)
  }



  //    Get rid of everything before the writeFileSync call
  //     add the __dirname value, first argument of writeFileSync
  //    create an object with a todos property, 
  //    set that todos property to be our global todos array.
  //    Next: create a newContents variable
  //    set it to the result of calling JSON.stringify our object
  //    This will give us a JSON string we can write to the file
const saveTodos = function() {

  let object ={ todos: todos}
  let newContents = JSON.stringify(object)
  fs.writeFileSync(__dirname + '/../back-end/todos.json', newContents);

}






//get rid of text, isComplete,  priority properties
//    replace them with todo.text, todo.isComplete, and todo.priority
const displayTodos = function(shouldPrintNumber) {
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const text = todo.text;
    const isComplete = todo.isComplete;
    const priority = todo.priority;
    const num = i + 1;
    let listSymbol = '*';
    let mark = '✖';
    if (shouldPrintNumber) {
      listSymbol = num + '.';
    }

    if (isComplete === 'complete') {
      mark = '✅';
    }

    const todoLine = listSymbol + ' ' + text + ' - priority: ' + priority + ' - ' + mark;
    // or, using interpolation:
    // const todoLine = `${listSymbol} ${todo.text} - priority: ${todo.priority} - ${mark}`
    console.log(todoLine);
  }
}

const add = function(text) {
  const todo = [text, 'uncomplete'];
  todos.push(todo);
  saveTodos();
  displayTodos(false);
  interface.close();
}

const remove = function(num) {
  todos.splice(num - 1, 1);
  saveTodos();
  displayTodos(false);
  interface.close();
}

const complete = function(num) {
  [['thing1', 'complete'], ['thing2', 'uncomplete']]
  for (let i = 0; i < todos.length; i++) {
    if (i + 1 === Number(num)) {
      todos[i][1] = 'complete';
    }
  }

  saveTodos();
  displayTodos(false);
  interface.close();
}

const uncomplete = function(num) {
  for (let i = 0; i < todos.length; i++) {
    if (i + 1 === Number(num)) {
      todos[i][1] = 'uncomplete';
    }
  }

  saveTodos();
  displayTodos(false);
  interface.close();
}

const handleMenu = function(cmd) {
  if (cmd === '1') {
    // Add a todo.
    interface.question('\nWhat should go on your list? ', add)
  } else if (cmd === '2') {
    // Remove a todo.
    displayTodos(true);
    interface.question('\nPlease pick a todo to remove: ', remove)
  } else if (cmd === '3') {
    // Mark a todo complete.
    displayTodos(true);
    interface.question('\nPlease pick a todo to mark complete: ', complete)
  } else if (cmd === '4') {
    // Mark a todo complete.
    displayTodos(true);
    interface.question('\nPlease pick a todo to mark uncomplete: ', uncomplete)
  } else {
    console.log('Quitting!');
    interface.close();
  }
}

loadTodos();
displayTodos(false);
interface.question(menu, handleMenu);
