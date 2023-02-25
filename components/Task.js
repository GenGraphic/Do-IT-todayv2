import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useContext, useState} from 'react';
import TasksContext from '../TasksContext';


const Task = ({id, title, time, date, steps, removeTask, reloadList}) => {


    const { tasks, setTasks } = useContext(TasksContext);
    const [stepsList ,setStepsList] = useState(steps)

    
    const handleRemoveTask = () => {
        Alert.alert('Alert Title', 'Do you want to remove this task?' + date + ' ' + time, [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => {
                removeTask(date, id)
                reloadList();
            }},
          ]);
    }
    const removeStep = (step) => {
        const newArray = tasks;
        setStepsList(stepsList.filter(elm => elm !== step));
        
        newArray[date].find(obj => obj.id === id)['steps'] = stepsList;

        setTasks(newArray);
    }

    return (
        <TouchableOpacity style={styles.taskCont} onLongPress={handleRemoveTask}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color:'#FFFFFF'}}>{title}</Text>
                <Image style={styles.icon} source={require('../assets/iconsHome/important.png')}/>
            </View>
  
            <View style={styles.statusBar}>
                <View style={styles.procents}>
                    <Text style={{color:'#FFF'}}>0%</Text>
                    <Text style={{color:'#FFF'}}>100%</Text>
                </View>
                    <View style={styles.bar}>
                    <View style={styles.progress}></View>
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
                <Text style={{color:'rgba(255,255,255,0.5)', padding:5}}>{id}</Text>
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
        width: '50%',
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