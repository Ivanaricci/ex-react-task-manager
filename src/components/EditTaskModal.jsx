import React, { useState, useRef, useEffect } from 'react'
import Modal from './Modal'

const EditTaskModal = ({ show, onClose, task, onSave }) => {

    const [editedTask, setEditedTask] = useState(task || { title: '', description: '', status: 'To do' });

    useEffect(() => {

        if (show && task) {
            setEditedTask(task);
        }
    }, [show, task]);

    const editFormRef = useRef()

    const changeEditedTask = (key, event) => {
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }))
    }

    const handleSubmit = e => {
        e.preventDefault();

        onSave(editedTask)
    }


    const { title = '', description = '', status = 'To do' } = editedTask || {};

    return (
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <label style={{ display: 'block', marginBottom: '.6rem' }}>
                        Nome Task:
                        <input
                            type="text"
                            value={title}
                            onChange={e => changeEditedTask('title', e)}
                            style={{ display: 'block', width: '100%', padding: '.5rem', marginTop: '.3rem' }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '.6rem' }}>
                        Descrizione:
                        <input
                            type="text"
                            value={description}
                            onChange={e => changeEditedTask('description', e)}
                            style={{ display: 'block', width: '100%', padding: '.5rem', marginTop: '.3rem' }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '.6rem' }}>
                        Stato:
                        <select
                            value={status}
                            onChange={e => changeEditedTask('status', e)}
                            style={{ display: 'block', width: '100%', padding: '.5rem', marginTop: '.3rem' }}
                        >
                            {["To do", "Doing", "Done"].map((value, index) => (
                                <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                    </label>
                </form>
            }
            confirmText="Salva"
            onConfirm={() => {
                // trigger submit del form (usa requestSubmit se disponibile)
                if (editFormRef.current) {
                    if (typeof editFormRef.current.requestSubmit === 'function') {
                        editFormRef.current.requestSubmit();
                    } else {
                        editFormRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                    }
                }
            }}
            show={show}
            onClose={onClose}
        />
    )
}

export default EditTaskModal