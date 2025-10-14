import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

const TaskList = () => {
    const { tasks } = useContext(GlobalContext)
    console.log('Tasks:', tasks)
    return (
        <div>TaskList</div>
    )
}

export default TaskList