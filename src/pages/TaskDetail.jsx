import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

const TaskDetail = () => {


    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask } = useContext(GlobalContext);


    const task = tasks.find(t => t.id === parseInt(id))

    if (!task) {
        return (
            <h2>Task non trovata</h2>
        )
    }

    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert("Task eliminata con successo");
            navigate("/")
        } catch (error) {
            console.error(error);
            alert(error.message)
        }
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