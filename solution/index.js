if (localStorage.getItem('tasks') === null) {
  //check if there is  a "tasks" key in the local storage if not, create one
  let tasks = {
    todo: [],
    'in-progress': [],
    done: [],
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

let tasksObj = JSON.parse(localStorage.getItem('tasks'))
createExistedTasks()
const divSections = document.getElementById('sections')
divSections.addEventListener('click', addTask)

function addTask(event) {
  event.preventDefault()
  const target = event.target
  if (target.tagName === 'BUTTON') {
    //gets the text from the user
    const addToDo = document.getElementById('add-to-do-task').value
    const addProgress = document.getElementById('add-in-progress-task').value
    const addDone = document.getElementById('add-done-task').value

    //create the list for the task
    let li = createElement(
      'li',
      [],
      ['task'],
      { tabindex: '0' },
      { keydown: moveTask }
    )

    //chooses the case by the button that clicked
    switch (target.id) {
      case 'submit-add-to-do':
        li.textContent = addToDo
        if (addToDo === '') alert('add some content please')
        //if input empty an alert pop up
        else {
          ulTodo.append(li)
          document.getElementById('add-to-do-task').value = ''
          tasksObj.todo.push(addToDo)
        } //add the text to the list
        break

      case 'submit-add-in-progress':
        li.textContent = addProgress
        if (addProgress === '') alert('add some content please')
        //if input empty an alert pop up
        else {
          ulProgress.append(li)
          document.getElementById('add-in-progress-task').value = ''
          tasksObj['in-progress'].push(addProgress)
        } //add the text to the list
        break

      case 'submit-add-done':
        li.textContent = addDone
        if (addDone === '') alert('add some content please')
        //if input empty an alert pop up
        else {
          ulDone.append(li)
          document.getElementById('add-done-task').value = ''
          tasksObj.done.push(addDone)
        } //add the text to the list
        break
    }
    localStorage.setItem('tasks', JSON.stringify(tasksObj))
  }
}

divSections.addEventListener('dblclick', changeTask)

function changeTask(e) {
  e.preventDefault()
  const target = e.target
  if (target.className === 'task') {
    let newInput = document.createElement('input')
    newInput.setAttribute('id', 'change-task-input')
    const oldcontent = target.textContent
    newInput.value = target.textContent
    target.innerText = ''
    let abc = []
    target.append(newInput)
    newInput.focus()
    newInput.addEventListener('blur', () => {
      target.innerHTML = newInput.value
      switch (target.parentElement.id) {
        case 'ulTodo':
          abc = tasksObj.todo
          break
        case 'ulProgress':
          abc = tasksObj['in-progress']
          break
        case 'ulDone':
          abc = tasksObj.done
          break
      }
      abc[abc.findIndex((a) => a === oldcontent)] = newInput.value
      localStorage.setItem('tasks', JSON.stringify(tasksObj))
    })
  }
}

//     // target.addEventListener('blur', (e) => {
//     //   saveNewTask()
//     // }),
//     //   true

// .addEventListener('keydown', (e) => {
//     if (e.altKey && e.key === '1')

//     if (e.altKey && e.key === '2')

//         if (e.altKey && e.key === '3')
//   })

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
  let element = document.createElement(tagName)

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

function createExistedTasks() {
  //creates tasks to the page, meant for the case that we refresh the page to save all the existed tasks
  for (let task of tasksObj.todo) {
    let li = createElement(
      'li',
      [],
      ['task'],
      { tabindex: '0' },
      { keydown: moveTask }
    )
    li.innerHTML = task
    ulTodo.append(li)
  }
  for (let task of tasksObj['in-progress']) {
    let li = createElement(
      'li',
      [],
      ['task'],
      { tabindex: '0' },
      { keydown: moveTask }
    )
    li.innerHTML = task
    ulProgress.append(li)
  }
  for (let task of tasksObj.done) {
    let li = createElement(
      'li',
      [],
      ['task'],
      { tabindex: '0' },
      { keydown: moveTask }
    )
    li.innerHTML = task
    ulDone.append(li)
  }
}

// try1.addEventListener('keydown', moveTask)
function moveTask(event) {
  //   move the task to the right place
  //     console.log('works')
  //   let listType = []
  switch (event.target.parentElement.id) {
    case 'ulTodo':
      tasksObj.todo = tasksObj.todo.filter(
        (a) => a !== event.target.textContent
      )
      break
    case 'ulProgress':
      tasksObj['in-progress'] = tasksObj['in-progress'].filter(
        (a) => a !== event.target.textContent
      )
      break
    case 'ulDone':
      tasksObj.done = tasksObj.done.filter(
        (a) => a !== event.target.textContent
      )
      break
  }
  if (event.key === '1' && event.altKey) {
    moveTaskHelper(1, event.target.textContent)
    event.target.remove()
  }

  if (event.key === '2' && event.altKey) {
    // console.log('alt 2')
    moveTaskHelper(2, event.target.textContent)
    event.target.remove()
  }

  if (event.key === '3' && event.altKey) {
    // console.log('alt 3')
    moveTaskHelper(3, event.target.textContent)
    event.target.remove()
  }

  //   console.log(tasksObj)
  localStorage.setItem('tasks', JSON.stringify(tasksObj))
}

function moveTaskHelper(num, text) {
  const li = createElement(
    'li',
    [text],
    ['task'],
    { tabindex: '0' },
    { keydown: moveTask }
  )
  if (num === 1) {
    tasksObj.todo.push(text)
    ulTodo.append(li)
  }
  if (num === 2) {
    tasksObj['in-progress'].push(text)
    ulProgress.append(li)
  }
  if (num === 3) {
    tasksObj.done.push(text)
    ulDone.append(li)
  }
}
