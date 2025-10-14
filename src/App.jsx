import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'

const App = () => {
  return (
    <BrowserRouter>

      <nav>
        <NavLink to="/">Lista Task</NavLink>
        <NavLink to="/add">Aggiungi Task Task</NavLink>
      </nav>

      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/add' element={<AddTask />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App