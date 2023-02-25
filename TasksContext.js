import React, { createContext, useState} from "react";

const TasksContext = createContext([]);

//find a way to save this file in phone memory so that user have the file allways

export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState({
        //'2023-02-25': [{'title': 'test', 'time': '12:00', 'date': '2023-02-25', 'steps': ['step1', 'step2']}, {'title': 'test', 'time': '12:00', 'date': '2023-02-25', 'steps': ['step1', 'step2']}]
    });
    

    //this function let user to push new tasks to list
    const addNewTask = (id, title, timeStart, date, stepsList ) => {
        tasks[date].push({'id': id, 'date': date, 'title': title, 'time': timeStart, "steps": stepsList})
    }

    //this function have to find the object with date and remove all from it
    const removeTask = (date, idelm) => {
        const copy = tasks
        const newArray = copy[date].filter(elm => elm.id !== idelm);

        copy[date] = newArray

        setTasks(copy);
        console.log(newArray)
    }

    return(
        <TasksContext.Provider value={{tasks, addNewTask, setTasks, removeTask}}>{ children }</TasksContext.Provider>
    )
}

export default TasksContext;