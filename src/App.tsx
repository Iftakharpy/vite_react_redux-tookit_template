import { useState } from 'react'
import './App.css'
import { useAppDispatch } from './app/hooks'

import { TodoList } from './features/todo/Todo'
import { addTodo } from './features/todo/TodoSlice'


function App() {
  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <h1>React &amp; Redux Toolkit todo app</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          let fromElement = e.currentTarget

          // parse form data
          let formData = new FormData(fromElement)
          let parsedData = new Map(formData.entries())
          fromElement.reset()

          // add new todo
          let todo = parsedData.get('todoTitle') as string
          dispatch(addTodo(todo))
        }}
      >
        <div className='form-control'>
          <label htmlFor="todoTitle">New task:</label>
          <input type="text" required name='todoTitle' id='todoTitle' placeholder='Go for a walk' />
        </div>
        <div>
          <button type='submit'>Add Todo</button>
        </div>
      </form>
      <TodoList></TodoList>
    </div>
  )
}

export default App
