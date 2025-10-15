import React from 'react'
import { memo } from 'react'

const TaskRow = memo(

    ({ task }) => {

        const statusClassName = task.status.replace(" ", "").toLowerCase()

        return (


            <tr>
                <td>{task.title}</td>
                <td><span className={`status ${statusClassName}`}>{task.status}</span></td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
            </tr>

        )
    }
)

export default TaskRow