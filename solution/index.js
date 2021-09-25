if (localStorage.getItem('tasks') === null) {
  //check if there is  a "tasks" key in the local storage if not, create one
  let tasks = {
    todo: [],
    'in-progress': [],
    done: [],
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const tasksObj = JSON.parse(localStorage.getItem('tasks'))
generateTasks() //make sure all the tasks stay in the page after refresh/closing the page

sections.addEventListener('click', addTask) //add task with click

function addTask(event) {
  event.preventDefault()
  const target = event.target

  //gets the text from the user
  const addToDo = document.getElementById('add-to-do-task').value
  const addProgress = document.getElementById('add-in-progress-task').value
  const addDone = document.getElementById('add-done-task').value

  //create the list for the task
  const li = buildListItem([])

  //chooses the case by the button that clicked
  const ulPogress = document.getElementById('in-progress')
  switch (target.id) {
    case 'submit-add-to-do':
      li.textContent = addToDo
      if (addToDo === '') alert('add some content please')
      //if input empty an alert pop up
      else {
        todo.append(li)
        document.getElementById('add-to-do-task').value = ''
        tasksObj.todo.unshift(addToDo)
      } //add the text to the list
      break

    case 'submit-add-in-progress':
      li.textContent = addProgress
      if (addProgress === '') alert('add some content please')
      //if input empty an alert pop up
      else {
        ulPogress.append(li)
        document.getElementById('add-in-progress-task').value = ''
        tasksObj['in-progress'].unshift(addProgress)
      } //add the text to the list
      break

    case 'submit-add-done':
      li.textContent = addDone
      if (addDone === '') alert('add some content please')
      //if input empty an alert pop up
      else {
        done.append(li)
        document.getElementById('add-done-task').value = ''
        tasksObj.done.unshift(addDone)
      } //add the text to the list
      break
  }
  localStorage.setItem('tasks', JSON.stringify(tasksObj))
}

sections.addEventListener('dblclick', changeTask) //enable to the user to change the content of the task

function changeTask(e) {
  e.preventDefault()
  const target = e.target
  const saveKey = tasksObj[target.closest('ul').id] //now saveKey contains for example: taskObj.todo
  const oldText = target.textContent
  target.setAttribute('contentEditable', 'true')
  target.addEventListener('blur', () => {
    let newText = target.textContent
    if (newText === '') target.textContent = oldText
    //bug fixed - when we dblclick and then remove the content and then lose focus so the old content came up and the task wouldn't stay empty
    newText = target.textContent
    saveKey[saveKey.findIndex((a) => a === oldText)] = newText
    localStorage.setItem('tasks', JSON.stringify(tasksObj))
  })
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
}

sections.addEventListener('keydown', moveTask)
function moveTask(event) {
  if (
    !(
      (event.key === '1' && event.altKey) ||
      (event.key === '2' && event.altKey) ||
      (event.key === '3' && event.altKey)
    )
  )
    return
  const target = event.target
  if (target.className !== 'task') return
  const newTask = buildListItem([target.innerHTML])
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
  localStorage.setItem('tasks', JSON.stringify(tasksObj))
}

function buildListItem(item) {
  //gets the wanted list childrens and return new list
  return createElement('li', item, ['task'], { tabindex: '0' })
}

// function buildListItem(item) {
//   return createElement(
//     createElement('li', item, [], {
//       tabindex: '0',
//       class:
//         'task list-group-item list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent',
//     })
//   )
// }

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
