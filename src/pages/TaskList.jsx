import React, { useMemo, useState } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import TaskRow from '../components/TaskRow'

const TaskList = () => {
    const { tasks } = useContext(GlobalContext)
    console.log('Tasks:', tasks)

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1)

    const sortIcon = sortOrder === 1 ? "⬇️" : "⬆️"

    const handlesort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1)
        }
    }

    const sortedTask = useMemo(() => {
        // clono l'array originale per non mutarlo
        return [...(tasks || [])].sort((a, b) => {
            let comparison = 0;

            if (sortBy === 'title') {
                // localeCompare per stringhe
                comparison = (a.title || '').localeCompare(b.title || '')
            } else if (sortBy === 'status') {
                const statusOptions = ["To do", "Doing", "Done"]
                comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status)
            } else if (sortBy === 'createdAt') {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                comparison = dateA - dateB
            }
            return comparison * sortOrder
        })
    }, [tasks, sortBy, sortOrder])

    return (
        <div>
            <h1>Lista delle Task</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handlesort('title')}>Nome
                            {sortBy === "title" && sortIcon}
                        </th>
                        <th onClick={() => handlesort('status')}>Status
                            {sortBy === "status" && sortIcon}
                        </th>
                        <th onClick={() => handlesort('createdAt')}>Data di creazione
                            {sortBy === "createdAt" && sortIcon}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTask.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TaskList
