function removeContentFromOldTask(ulId) {
  switch (ulId) {
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
}
