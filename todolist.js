var todoList = document.getElementById('todolist'),
  form = document.getElementById('myform'),
  field = document.getElementById('newitem'),
  todos = [],
  i = 0;

form.addEventListener('submit', function(evt) {
  var text = field.value;
  evt.preventDefault();
  // This is what creates the item when added to the todo list.
  var todo = document.createElement('div');
  //This is what allows you to enter the text.
  var todoText = document.createElement('span');
  todoText.innerText = text;
  //This is the edit button. The innertext is what is shown on the button
  var todoEdit = document.createElement('button');
  todoEdit.innerText = 'Edit';
  //Sets the data index to i
  todoEdit.dataset.index = i;
  //When clicked it allows you to edit the text. The current variable is what is getting the value of the list item in the data.
  todoEdit.onclick = function(evt) {
    var current = todos[evt.target.dataset.index];
    var text = current.childNodes[0];
    //Allowing you to edit
    text.contentEditable = true;
    document.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 13) {
      text.contentEditable = false;
    }

  });
  };


  var todohighlight = document.createElement('button');

  todohighlight.innerText = 'Highlight';

  todohighlight.dataset.index = i;
  todohighlight.onclick = function(evt) {
    var current = todos[evt.target.dataset.index];
    var text = current.childNodes[0];
    text.style.backgroundColor = "yellow";
  };







  var todoDelete = document.createElement('button');
  todoDelete.innerText = 'Delete';
  todoDelete.dataset.index = i;
  // This deletes things from the todo list when the button is clicked. Line 54 is what removes the item from the todo list.
  todoDelete.onclick = function(evt) {
    var current = todos[evt.target.dataset.index];
    var text = current.childNodes[0];
    todo.parentNode.removeChild(todo);
  };

  //Combins certain elements with eachother. Append means to push together
  todo.appendChild(todoText);
  todo.innerHTML += ' ';
  todo.appendChild(todoEdit);
  todo.appendChild(todoDelete);
  todo.appendChild(todohighlight);
  todoList.appendChild(todo);
  todos.push(todo);
  //i increses by one in the data set everytime something new is added
  i++;
}, false);