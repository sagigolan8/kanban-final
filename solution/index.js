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

sections.addEventListener('click', addTask)

function addTask(event) {
  event.preventDefault()
  const target = event.target
  if (target.tagName === 'BUTTON') {
    //gets the text from the user
    const addToDo = document.getElementById('add-to-do-task').value
    const addProgress = document.getElementById('add-in-progress-task').value
    const addDone = document.getElementById('add-done-task').value

    //create the list for the task
    let li = createElement('li', [], ['task'], { tabindex: '0' })

    //chooses the case by the button that clicked
    switch (target.id) {
      case 'submit-add-to-do':
        li.textContent = addToDo
        if (addToDo === '') alert('add some content please')
        //if input empty an alert pop up
        else {
          todo.append(li)
          document.getElementById('add-to-do-task').value = ''
          tasksObj.todo.push(addToDo)
        } //add the text to the list
        break

      case 'submit-add-in-progress':
        li.textContent = addProgress
        if (addProgress === '') alert('add some content please')
        //if input empty an alert pop up
        else {
          section2.children[2].append(li)
          document.getElementById('add-in-progress-task').value = ''
          tasksObj['in-progress'].push(addProgress)
        } //add the text to the list
        break

      case 'submit-add-done':
        li.textContent = addDone
        if (addDone === '') alert('add some content please')
        //if input empty an alert pop up
        else {
          done.append(li)
          document.getElementById('add-done-task').value = ''
          tasksObj.done.push(addDone)
        } //add the text to the list
        break
    }
    localStorage.setItem('tasks', JSON.stringify(tasksObj))
  }
}

sections.addEventListener('dblclick', changeTask)

function changeTask(e) {
  e.preventDefault()
  const target = e.target
  target.focus()
  originTask = target.textContent
  const saveKey = tasksObj[target.closest('ul').id]
  console.log(target)
  oldText = target.textContent
  target.contentEditable = 'true'
  target.addEventListener('blur', () => {
    let newText = target.textContent
    if (newText === '') newText = oldText //bug fixed - when we dblclick and then remove the content and then lose focus so the old content came up and the task wouldn't stay empty
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
    let li = createElement('li', [], ['task'], { tabindex: '0' })
    li.innerHTML = task
    todo.append(li)
  }
  for (let task of tasksObj['in-progress']) {
    let li = createElement('li', [], ['task'], { tabindex: '0' })
    li.innerHTML = task
    section2.children[2].append(li)
  }
  for (let task of tasksObj.done) {
    let li = createElement('li', [], ['task'], { tabindex: '0' })
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
  let task = event.target
  if (task.className !== 'task') return
  const newTask = createElement('li', [task.innerText], ['task'], {
    tabindex: '0',
  })
  switch (task.parentElement.id) {
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

  if (event.key === '1' && event.altKey) {
    todo.append(newTask)
    task.remove()
    tasksObj.todo.push(newTask.textContent)
  }
  if (event.key === '2' && event.altKey) {
    section2.children[2].append(newTask)
    task.remove()
    tasksObj['in-progress'].push(newTask.textContent)
  }
  if (event.key === '3' && event.altKey) {
    done.append(newTask)
    task.remove()
    tasksObj.done.push(newTask.textContent)
  }
  localStorage.setItem('tasks', JSON.stringify(tasksObj))
}

search.addEventListener('input', searchTask)

function searchTask() {
  let lists = document.getElementsByClassName('task')
  const length = lists.length
  for (let i = 0; i < length; i++) {
    lists[0].remove()
  }
  for (const taskType in tasksObj) {
    //run on arrays in taskObj
    for (const text of tasksObj[taskType]) {
      //run on texts in some array from the taskObj
      if (text.includes(search.value)) {
        const newTask = createElement('li', [text], ['task'], { tabindex: '0' })
        document.getElementById(taskType).append(newTask)
      }
    }
  }
}
