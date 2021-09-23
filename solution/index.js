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
createTasks()
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
    let li = createElement('li', [], ['task'])

    //chooses the case by the button that clicked
    switch (target.id) {
      case 'submit-add-to-do':
        li.textContent = addToDo
        if (addToDo === '') alert('add some content please')
        //if input empty an alert pop up
        else {
          ulTodo.append(li)

          tasksObj.todo.push(addToDo)
        } //add the text to the list
        break

      case 'submit-add-in-progress':
        li.textContent = addProgress
        if (addProgress === '') alert('add some content please')
        //if input empty an alert pop up
        else {
          ulProgress.append(li)

          tasksObj['in-progress'].push(addProgress)
        } //add the text to the list
        break

      case 'submit-add-done':
        li.textContent = addDone
        if (addDone === '') alert('add some content please')
        //if input empty an alert pop up
        else {
          ulDone.append(li)

          tasksObj.done.push(addDone)
        } //add the text to the list
        break
    }
    localStorage.setItem('tasks', JSON.stringify(tasksObj))
  }
}

// divSections.addEventListener('dblclick', (e) => {
//   e.preventDefault()
//   const target = e.target
//   if (target.className === 'task') {
//     let newInput = createElement('input', [], ['change-task'])
//     // let oldTaskValue = target.innerText
//     newInput.value = target.textContent
//     target.innerText = ''
//     target.append(newInput)

//     // target.addEventListener('blur', (e) => {
//     //   saveNewTask()
//     // }),
//     //   true
//   }
// })

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
function createElement(tagName, children = [], classes = [], attributes = {}) {
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
  return element
}

function createTasks() {
  for (let task of tasksObj.todo) {
    let li = createElement('li', [], ['task'])
    li.innerHTML = task
    ulTodo.append(li)
  }
  for (let task of tasksObj['in-progress']) {
    let li = createElement('li', [], ['task'])
    li.innerHTML = task
    ulProgress.append(li)
  }
  for (let task of tasksObj.done) {
    let li = createElement('li', [], ['task'])
    li.innerHTML = task
    ulDone.append(li)
  }
}
