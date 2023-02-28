import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useContext, useState} from 'react';
import TasksContext from '../TasksContext';


const Task = ({taskKey, title, time, date, steps}) => {

    const { removeTask } = useContext(TasksContext);
    const { tasks, setTasks } = useContext(TasksContext);
    const [stepsList ,setStepsList] = useState(steps);
    const[progressWidth, setProgressWidth] = useState('0%');
    const [initialLength, setInitialLength] = useState(stepsList.length);

    //this function handle removing a task on long press
    //throw Alert to make sure that user want to remove the task
    const handleRemoveTask = () => {
        Alert.alert('Alert Title', 'Do you want to remove this task?' + date + ' ' + time, [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'), //if NO is pressed, nothing happens
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => {
                removeTask(date, taskKey) //if YES is pressed, camm removeTask from TasksContext
            }},
          ]);
    }

    //removing step from task
    const removeStep = (step) => {
        const newArray = tasks; //makes a new Array
        setStepsList(stepsList.filter(elm => elm !== step)); //set the steps list the list that is beeing filterd so the step pressed id removed
        
        newArray[date].find(obj => obj.key === taskKey)['steps'] = stepsList; //find the task with date of this task and search for steps argument
                                                                              //give this list the new stepsList

        setTasks(newArray); //set the task the new modified list
        handleProgress(); //call the fuinction to incresse the progress bar

        if(stepsList.length === 1) {
            removeTask(date, taskKey);
        }
    }

    const handleProgress = () => {
        const newArray = Array(initialLength).fill(0); //create a copy of the array that is not taking changes if the original array changes

        const stepWorth = 100 / newArray.length; //see how much proccest is a step taking

        const formatedWidth = parseFloat(progressWidth.replace('%','')); //had to format the progrees from '0%' to '0'

        setProgressWidth(formatedWidth + stepWorth + '%') //set the progress with the formated width + what the removed step worth
    }
    

    

    return (
        <TouchableOpacity style={styles.taskCont} onLongPress={handleRemoveTask}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color:'#FFFFFF'}}>{title}</Text>
                <Image style={styles.icon} source={require('../assets/iconsHome/important.png')}/>
            </View>
  
            <View style={styles.statusBar}>
                <View style={styles.procents}>
                    <Text style={{color:'#FFF'}}>{parseInt(progressWidth) + '%'}</Text>
                    <Text style={{color:'#FFF'}}>100%</Text>
                </View>
                    <View style={styles.bar}>
                    <View style={[styles.progress, {width: progressWidth }]}></View>
                </View>
            </View>
            
            <View style={styles.stepCont}>
                {stepsList.map((step, index) => {
                    return (
                        <TouchableOpacity  style={styles.step} key={index} onPress={() => {removeStep(step)}}>
                            <Text>{step}</Text>
                        </TouchableOpacity>
                    )
                })

                }
            </View>
    
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <Image style={styles.iconSmall}  source={require('../assets/iconsHome/clock.png')}/>
                <Text style={{color:'rgba(255,255,255,0.5)', padding:5}}>{time}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Task

const styles = StyleSheet.create({
    taskCont: {
        marginRight: 10,
        marginTop: 17,
        backgroundColor: 'rgba(94,101,102,1)',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-between'
    },
    icon: {
        width:22,
        height: 22
    },
    iconSmall: {
        width:15,
        height:15
    },
    statusBar: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    procents: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    bar: {
        backgroundColor:'#D9D9D9',
        height:5,
        width: "100%",
        borderRadius: 10
    },
    progress: {
        height: "100%",
        backgroundColor: '#0CC941',
        borderRadius: 10
    },
    stepCont: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    step: {
        backgroundColor: '#e9ecef',
        borderRadius: 5,
        padding: 3,
        margin: 5,
    }
})