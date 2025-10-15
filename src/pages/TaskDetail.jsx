import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import Modal from '../components/Modal'
import EditTaskModal from '../components/EditTaskModal'


const TaskDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

    const task = tasks.find(t => t.id === parseInt(id))

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    if (!task) {
        return <h2>Task non trovata</h2>
    }

    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert("Task eliminata con successo");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert(error.message)
        }
    }

    // RENAMED param -> evita shadowing con updateTask dal context
    const handleUpdate = async (updatedTask) => {
        try {
            // updateTask qui è la funzione che viene dal GlobalContext
            await updateTask(updatedTask);
            setShowEditModal(false)
        } catch (error) {
            console.error(error);
            alert(error.message)
        }
    }

    return (
        <div className='task-detail'>
            <h1>Dettaglio Task</h1>
            <p>Nome:<strong>{task.title}</strong></p>
            <p>Descrizione:<strong>{task.description}</strong></p>
            <p>Stato:<strong>{task.status}</strong></p>
            <p>Data di creazione: <strong>{new Date(task.createdAt).toLocaleDateString()}</strong></p>

            <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
            <button onClick={() => setShowEditModal(true)}>Modifica Task</button>

            <Modal
                title="conferma eliminazione"
                content={<p>Sicuro di voler eliminare la Task?</p>}
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina" />

            <EditTaskModal
                task={task}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdate}
            />
        </div>
    )
}

export default TaskDetail