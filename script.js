const dom = {
  new: document.getElementById('new'),
  add: document.getElementById('add'),
  tasks: document.getElementById('tasks')
}

const tasks = []

// Отслеживаем клик по кнопке Добавить задачу
dom.add.onclick = () => {
  let newTaskText = dom.new.value
  if(newTaskText && isNotHaveTask(newTaskText, tasks)){
    addTask(newTaskText, tasks)
    dom.new.value = ''
    tasksRender(tasks)
  }
}

// Функция добавления задачи
function addTask(text, list) {
  const task = {
    id: Date.now(),
    text,
    isComplete: false
  }
  list.push(task)
}

// Проверка если похожая задача в массиве задач
function isNotHaveTask(text, list) {
  let isNotHave = true

  list.forEach((task) => {
    if(task.text === text) {
       alert('Задача уже существует!')
       isNotHave = false
    }
  });

  return isNotHave
}

// Функция вывода списка задача
function tasksRender(list) {
  let htmlList = ''
  list.forEach((task) =>{
  const cls = task.isComplete ? 'todo__task todo__task--done' : 'todo__task'

  const checked = task.isComplete ? 'checked' : ''
  
    const htmlTask = `
    <div id="${task.id}" class="${cls}">
      <label class="todo__checkbox">
        <input type="checkbox" ${checked}>
        <div class="todo__checkbox-div"></div>
      </label>
      <div class="todo__task-text">${task.text}</div>
      <div class="todo__task-del">-</div>
    </div>
    `
  
    htmlList = htmlList + htmlTask
  })
  dom.tasks.innerHTML = htmlList
}

// Отслеживание клика по чекбоксу задачи
dom.tasks.onclick = (event) => {
  const target = event.target
  const isCheckboxEl = target.classList.contains('todo__checkbox-div')
  const isDeleteEl = target.classList.contains('todo__task-del')

  if (isCheckboxEl) {
    const task = target.parentElement.parentElement
    const taskId = task.getAttribute('id')
    changeTaskStatus(taskId, tasks)
    tasksRender(tasks) 
  }
  if (isDeleteEl) {
    const task = target.parentElement
    const taskId = task.getAttribute('id')
    deleteTask(taskId, tasks)
    tasksRender(tasks)
  }
} 

// Функция изменения статуса задачи
function changeTaskStatus(id, list) {
  list.forEach((task) => {
    if (task.id == id) {
      task.isComplete = !task.isComplete
    }
  })
}

// Функция удаления задачи
function deleteTask(id, list) {
  list.forEach((task, idx) => {
    if(task.id == id) {
      list.splice(idx, 1)
      console.log(list.length)
    }
  })
}
