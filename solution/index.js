// First of all we have to check if there is any 'tasks' key in our the local storage if not, create one.
if (localStorage.getItem('tasks') === null) {
  let tasks = {
    todo: [],
    'in-progress': [],
    done: [],
  }
  //Update it into the localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Here we copied the 'tasks' object into "taskObj" object so that we can change "taskObj", when we done, update it into localStorage.
let tasksObj = JSON.parse(localStorage.getItem('tasks'))

//Make sure all the tasks stay in the page after refresh/closing the page
generateTasks()

//_____________________________________________________First interaction assignment_____________________________________________________
// ◼ When the user clicks on one of the add-task buttons, a new task will be added to the respective list. The task content will be taken from the respective input field.

//Listening to the 'click' event in order to add a task to the to-do/in-progress/done sections.
sections.addEventListener('click', addTask)

//Function that handels the case of clicking in the field of all sections.
//Add a list(that represent a task) to the correct unordinary lists(represent the three sections - to-do/in-progress/done).
function addTask(event) {
  event.preventDefault()
  const target = event.target

  //Gets the texts from the user
  const addToDo = document.getElementById('add-to-do-task').value
  const addProgress = document.getElementById('add-in-progress-task').value
  const addDone = document.getElementById('add-done-task').value

  //Create the list(list = task).
  const li = buildListItem([])

  //Chooses the case according to the clicked button.
  const ulPogress = document.getElementById('in-progress')
  switch (target.id) {
    case 'submit-add-to-do':
      li.textContent = addToDo

      //If the user trying to add an empty task an alert messege pops up.
      if (addToDo === '') alert('add some content please')
      //Add the text to the list, and add the task to the taskObj in order to update the localStorage.
      else {
        todo.append(li)
        document.getElementById('add-to-do-task').value = ''
        tasksObj.todo.unshift(addToDo)
      }
      break
    //The same progress(as the case above) is executed in the other cases...
    case 'submit-add-in-progress':
      li.textContent = addProgress
      if (addProgress === '') alert('add some content please')
      else {
        ulPogress.append(li)
        document.getElementById('add-in-progress-task').value = ''
        tasksObj['in-progress'].unshift(addProgress)
      }
      break
    case 'submit-add-done':
      li.textContent = addDone
      if (addDone === '') alert('add some content please')
      else {
        done.append(li)
        document.getElementById('add-done-task').value = ''
        tasksObj.done.unshift(addDone)
      }
      break
  }
  //Updates the localStorage
  localStorage.setItem('tasks', JSON.stringify(tasksObj))
}

//____________________________________________________Second interaction assignment_____________________________________________________
// ◼ Double clicking a task element will enable the user to edit its text. When the task element loses focus (blur event) the change will be saved.

//Listening to the 'dblclick' event in order to edit some task in the to-do/in-progress/done sections.
sections.addEventListener('dblclick', editTask)

//Function that handels the case of double clicking in the field of all sections.
//Gives an options for the user to edit some task by double click on it, when the task element loses focus the changes will be saved.
function editTask(e) {
  e.preventDefault()

  //In this case, we will refer to the case that the target is a list
  const target = e.target

  //Now saveKey contains some array from the our copied object taskObj - todo[]/in-progress[]/done[]
  const saveKey = tasksObj[target.closest('ul').id]

  //Here we save the current task before the change.
  //Why are we need to save the current task? because we have to know what needs to be changed in the localStoarage.
  const oldTask = target.textContent

  //This attribute enable the user to edit the list(task) by double click on it.
  target.setAttribute('contentEditable', 'true')

  //Listening to the 'blur' event for the case of loose focus from the edited list(task).
  target.addEventListener('blur', () => {
    //Here we save the new task in order to save it in the localstorage
    let newTask = target.textContent

    //This if statement take care of any case the user double click on a task, then removes it's content,and eventually loses focus.
    //So the old content came up and the task wouldn't stay empty.
    if (newTask === '') target.textContent = oldTask

    //Here we need to update the new task the user just wrote
    newTask = target.textContent

    //Here we removes the old task and replace it with the new task, the findIndex method make sure we replace the correct task
    saveKey[saveKey.findIndex((a) => a === oldTask)] = newTask

    //Updates the localStorage
    localStorage.setItem('tasks', JSON.stringify(tasksObj))
    target.setAttribute('contentEditable', 'false')
  })
}

//____________________________________________________Third interaction assignment_____________________________________________________
// ◼ Hovering over a task element and pressing alt + 1-3 will move the task to the appropriate list (1: todo, 2: in-progress, 3: done).

//Listening to the 'keydown' event in order to more some task section to another section.
sections.addEventListener('keydown', moveTask)

//Function that handels the case of tap some character on the keyboard, in the field of all sections(to-do/in-progress/done).
//Move the task to the appropriate list (1: todo, 2: in-progress, 3: done), after click on the wanted task.
function moveTask(event) {
  //In case of the user tapping some characters on the keyboard that it's not include - alt+1/2/3 will immediately get out from the function.
  if (
    !(
      (event.key === '1' && event.altKey) ||
      (event.key === '2' && event.altKey) ||
      (event.key === '3' && event.altKey)
    )
  )
    return

  //If we got here it means the user tapped alt+1/2/3.

  ////In this case, we will refer to the case that the target is a list.
  const target = event.target

  //This if statement take care of any case the user clicked on something that isn't a task, this case will get out of the function.
  if (target.className !== 'task') return

  //If we got here it means the user clicked on some task and not something else.

  //Here we create a new task with the content of the cilcked task.
  const newTask = buildListItem([target.innerHTML])

  //Then we choose the right section(to-do/in-progress/done) to place the task.
  switch (target.parentElement.id) {
    case 'todo':
      tasksObj.todo = tasksObj.todo.filter((a) => a !== newTask.textContent)
      break
    case 'in-progress':
      tasksObj['in-progress'] = tasksObj['in-progress'].filter(
        (a) => a !== newTask.textContent
      )
      break
    case 'done':
      tasksObj.done = tasksObj.done.filter((a) => a !== newTask.textContent)
      break
  }

  const ulPogress = document.getElementById('in-progress')
  if (event.key === '1' && event.altKey) {
    todo.prepend(newTask)
    target.remove()
    tasksObj.todo.unshift(newTask.textContent)
  }
  if (event.key === '2' && event.altKey) {
    ulPogress.prepend(newTask)
    target.remove()
    tasksObj['in-progress'].unshift(newTask.textContent)
  }
  if (event.key === '3' && event.altKey) {
    done.prepend(newTask)
    target.remove()
    tasksObj.done.unshift(newTask.textContent)
  }

  //Updates the localStorage
  localStorage.setItem('tasks', JSON.stringify(tasksObj))
}

function buildListItem(item) {
  //gets the wanted list childrens and return new list
  return createElement(
    'li',
    item,
    ['task'],
    { tabindex: '0', draggable: 'true' },
    { dragstart: drag }
  )
}

search.addEventListener('input', searchTask)

function searchTask() {
  const lists = document.getElementsByClassName('task')
  const length = lists.length
  for (let i = 0; i < length; i++) {
    lists[0].remove()
  }
  for (const taskType in tasksObj) {
    //run on arrays in taskObj
    for (const text of tasksObj[taskType]) {
      //run on texts in some array from the taskObj
      if (text.includes(search.value)) {
        const newTask = buildListItem([text])
        document.getElementById(taskType).append(newTask)
      }
    }
  }
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(
  tagName,
  children = [],
  classes = [],
  attributes = {},
  eventListeners = {}
) {
  const element = document.createElement(tagName)

  for (const child of children) {
    element.append(child)
  }

  for (const cls of classes) {
    element.classList.add(cls)
  }

  for (const attr in attributes) {
    element.setAttribute(attr, attributes[attr])
  }
  for (const listener in eventListeners) {
    const functionArray = eventListeners[listener]
    element.addEventListener(listener, functionArray)
  }

  return element
}

function generateTasks() {
  const ulPogress = document.getElementById('in-progress')
  //creates tasks to the page, meant for the case that we refresh the page to save all the existed tasks
  for (const task of tasksObj.todo) {
    const li = buildListItem([])
    li.innerHTML = task
    todo.append(li)
  }
  for (const task of tasksObj['in-progress']) {
    const li = buildListItem([])
    li.innerHTML = task
    ulPogress.append(li)
  }
  for (const task of tasksObj.done) {
    const li = buildListItem([])
    li.innerHTML = task
    done.append(li)
  }
  let uls = document.getElementsByTagName('UL')
  for (const ul of uls) {
    ul.addEventListener('dragover', allowDrop)
    ul.addEventListener('drop', drop)
  }
}

function drop(e) {
  const removeTask = document.getElementById('remove-task')
  if (removeTask === null) return
  const taskText = e.dataTransfer.getData('Text')
  e.target.closest('ul').append(buildListItem(taskText))
  tasksObj[e.target.closest('ul').id].unshift(taskText)
  tasksObj[removeTask.parentNode.id] = tasksObj[
    removeTask.parentNode.id
  ].filter((a) => a !== taskText)
  removeTask.remove()
  localStorage.setItem('tasks', JSON.stringify(tasksObj))
}

function drag(e) {
  e.target.setAttribute('id', 'remove-task')
  e.dataTransfer.setData('Text', e.target.textContent)
}

function allowDrop(e) {
  e.preventDefault()
}

const urlApi = 'https://json-bins.herokuapp.com/bin/614b27c34021ac0e6c080cf8'
const loader = createElement('div', [], ['loader'])

async function save() {
  document.getElementById('wrapAll').append(loader)
  const putProp = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tasks: tasksObj }),
  }
  const response = await fetch(urlApi, putProp)
  if (response.status > 400 && response.status !== 418) {
    console.log('Saving The Data Failed! \n Try Again')
  }
  document.getElementById('wrapAll').remove(loader)
}

async function load() {
  document.getElementById('wrapAll').append(loader)
  const getProp = {
    method: 'Get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  let getAns = await fetch(urlApi, getProp)
  const data = await getAns.json()
  console.log(data.tasks)
  localStorage.setItem('tasks', JSON.stringify(data.tasks))
  tasksObj = data.tasks
  document.getElementById('wrapAll').remove(loader)
  let tasks = document.getElementsByClassName('task')
  const length = tasks.length
  for (let i = 0; i < length; i++) {
    tasks[0].remove()
  }
  generateTasks()
}
