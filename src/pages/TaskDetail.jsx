import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

const TaskDetail = () => {


    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);


    const task = tasks.find(t => t.id === parseInt(id))

    if (!task) {
        return (
            <h2>Task non trovata</h2>
        )
    }

    const handleDelete = () => {
        console.log(`task ${task.id} eliminata`)
    }

    return (
        <div>
            <h1>Dettaglio Task</h1>
            <p>Nome:<strong>{task.title}</strong></p>
            <p>Descrizione:<strong>{task.description}</strong></p>
            <p>Stato:<strong>{task.status}</strong></p>
            <p>Data di creazione: <strong>{new Date(task.createdAt).toLocaleDateString()}</strong></p>
            <button onClick={handleDelete}>Elimina Task</button>
        </div>
    )
}

export default TaskDetail