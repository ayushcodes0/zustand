import classNames from "classnames"
import "./Task.css"
import { useStore } from "../store"
import { MdDelete } from "react-icons/md";


export default function Task({title}){

    const tasks = useStore((store)=>store.tasks)
    const task = tasks.find(t=>t.title===title)

    const deleteTask = useStore((store)=>store.deleteTask);
    const setDraggedTask = useStore((store)=>store.setDraggedTask);


    return (
        <div className="task" draggable onDragStart={()=>setDraggedTask(task.title)} >
            <div className="title-wrapper">
                <div>{task.title}</div>
                <div onClick={()=>deleteTask(task.title)} className="task-delete"><MdDelete /></div>
            </div>
            <div className="bottom-wrapper">
                <div></div>
                <div className= {classNames("status",task.state) }>{task.state}</div>
            </div>
        </div>
    )
}