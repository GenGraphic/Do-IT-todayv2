import React, { createContext, useState} from "react";

const TasksContext = createContext([]);

//find a way to save this file in phone memory so that user have the file allways

export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState({
        //'2023-02-25': [{'key': 123, 'title': 'test', 'time': '12:00', 'date': '2023-02-25', 'steps': ['step1', 'step2']}, {'key':234, 'title': 'test', 'time': '12:00', 'date': '2023-02-25', 'steps': ['step1', 'step2']}]
        //'2023-02-26': [{'key': 123, 'title': 'test', 'time': '12:00', 'date': '2023-02-25', 'steps': ['step1', 'step2']}, {'key':234, 'title': 'test', 'time': '12:00', 'date': '2023-02-25', 'steps': ['step1', 'step2']}]
    });
    

    //this function let user to push new tasks to list
    const addNewTask = (taskKey, title, timeStart, date, stepsList) => {
        if(tasks[date].length >=2){
            alert('We are sorry but this app can suport only 2 task on the same day. We work to improve that. You can help us on Github if you like '+ 'https://github.com/GenGraphic/Do-IT-today');
        }else {
            tasks[date].push({'key': taskKey, 'date': date, 'title': title, 'time': timeStart, "steps": stepsList})
        }        
    }

    //this function have to find the object with date and remove all from it
    const removeTask = (date, taskKey) => {
        //const newTasks = {...tasks};
        //const index = newTasks[date].findIndex((task) => task.key === taskKey);
        //if (index !== -1) {
        //newTasks[date].splice(index, 1);
        //setTasks(newTasks);
        //}
        setTasks((prevTasks) => {
            const newTasks = {};
            for (let date in prevTasks) {
              newTasks[date] = prevTasks[date].filter((task) => task.key !== taskKey);
            }
            return newTasks;
          });
    }

    return(
        <TasksContext.Provider value={{tasks, addNewTask, setTasks, removeTask}}>{ children }</TasksContext.Provider>
    )
}

export default TasksContext;