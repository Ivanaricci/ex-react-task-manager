import React from 'react'
import { memo } from 'react'
import { Link } from 'react-router-dom'

const TaskRow = memo(

    ({ task }) => {

        const statusClassName = task.status.replace(" ", "").toLowerCase()

        return (


            <tr>
                <td><Link to={`/task/${task.id}`}>{task.title}</Link></td>
                <td><span className={`status ${statusClassName}`}>{task.status}</span></td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
            </tr>

        )
    }
)

export default TaskRow