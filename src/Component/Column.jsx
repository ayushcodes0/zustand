import { useState } from "react";
import { useStore } from "../store"
import "./Column.css"
import Task from "./Task"
import { shallow } from 'zustand/shallow';


export default function Column({state}){

    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)

    // const tasks = useStore((store)=>
    //     store.tasks.filter((task)=>task.state === state),
    //     shallow
    // );
    const tasks = useStore((store)=>store.tasks, shallow)
    const task = tasks.filter((t)=>t.state === state);
    console.log(task);

    const addTask = useStore((store)=>store.addTask);
    const setDraggedTask = useStore((store)=>store.setDraggedTask);
    const draggedTask = useStore((store)=>store.draggedTask);

    return(
        <>
        <div className="column" onDragOver={e=>e.preventDefault()}  onDrop={e=>{
            console.log(draggedTask)
            setDraggedTask(null)
            }} >
            <div className="title-wrapper">
                <p>{state}</p>
                <button onClick={()=>setOpen(true)}>Add</button>
            </div>
            {task.map((t, idx)=>{
                return(
                    <Task key={idx} title={t.title}/>
                )
            })}
        </div>
        {open && <div className="modal">
                
                <div className="modal-content">
                    <div className="heading">Add {state} Task</div>
                    <input placeholder="title" type="text" value={text} onChange={e=>setText(e.target.value)} />
                    <button onClick={()=>{
                        addTask(text,state)
                        setText("")
                        setOpen(false)
                    }}>
                    Submit
                    </button>
                </div>
            </div>}
        </>
    )
}