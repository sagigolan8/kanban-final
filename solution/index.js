const divSections = document.getElementById('sections')
divSections.addEventListener('click', (e) => {
  const target = e.target
  if (target.tagName === 'BUTTON') {
    const textUserSection1 = document.getElementById('add-to-do-task').value
    const textUserSection2 = document.getElementById(
      'add-in-progress-task'
    ).value
    const textUserSection3 = document.getElementById('add-done-task').value
    switch (target.id) {
      case 'submit-add-to-do':
        const li1 = document.createElement('li')
        li1.textContent = textUserSection1
        if (textUserSection1 === '') alert('add some content please')
        //if input empty an alert pop up
        else ul1.append(li1) //add the text to the list
        break
      case 'submit-add-in-progress':
        const li2 = document.createElement('li')
        li2.textContent = textUserSection2
        if (textUserSection2 === '') alert('add some content please')
        //if input empty an alert pop up
        else ul2.append(li2) //add the text to the list
        break
      case 'submit-add-done':
        const li3 = document.createElement('li')
        li3.textContent = textUserSection3
        if (textUserSection3 === '') alert('add some content please')
        //if input empty an alert pop up
        else ul3.append(li3) //add the text to the list
        break
    }
  }
})

divSections.addEventListener('dblclick', (e) => {
  const target = e.target
})
