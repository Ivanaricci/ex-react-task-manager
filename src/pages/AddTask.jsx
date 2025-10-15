import React, { useMemo } from 'react'
import { useState, useRef } from 'react'


const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";



const AddTask = () => {

    const [taskTitle, setTaskTitle] = useState("");
    const descriptionRef = useRef();
    const statusRef = useRef();

    const taskNameError = useMemo(() => {
        if (!taskTitle.trim()) return "Nome non può essere vuoto"
        if ([...taskTitle].some(char => symbols.includes(char))) return "Il nome non può contenere simboli"
        return ""
    }, [taskTitle])

    const handleSubmit = e => {
        e.preventDefault();
        if (taskNameError)
            return;

        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }

        console.log('Nuova task', newTask)
    }

    return (
        <div>
            <h1>Aggiungi una task</h1>
            <form onSubmit={handleSubmit}>

                <label>
                    Nome Task:
                    <input type="text"
                        value={taskTitle}
                        onChange={e => setTaskTitle(e.target.value)} />
                </label>
                {taskNameError &&
                    <p style={{ color: 'red' }}>{taskNameError}</p>}

                <label>
                    Descrizione:
                    <textarea ref={descriptionRef} />
                </label>

                <label>
                    Stato:
                    <select ref={statusRef} defaultValue="To do">
                        {["To do", "Doing", "Done"].map((value, index) => (
                            <option key={index} value={value}></option>
                        ))}
                    </select>
                </label>
                <button type='submit' disabled={taskNameError}>Aggiungi Task</button>
            </form>
        </div>
    )
}

export default AddTask