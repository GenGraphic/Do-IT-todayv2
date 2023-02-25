import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Menu from '../components/Menu';
import Task from '../components/Task';
import {Agenda} from 'react-native-calendars';
import TasksContext from '../TasksContext';
import AddTask from '../components/AddTask';




const Home = () => {
  const sideMenu = useRef(null);//ref to the menu forwordRef()
  const { tasks, setTasks } = useContext(TasksContext);


  const { addNewTask } = useContext(TasksContext);
  const { removeTask } = useContext(TasksContext);
  const [ toggleNewTaskComp, settoggleNewTaskComp ] = useState(false);
  

  const loadItems = (day) => {

    setTimeout(() => {

      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!tasks[strTime]) {
          tasks[strTime] = [];
          
          const numItems = tasks.length;
          for (let j = 0; j < numItems; j++) {
            tasks[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }
      
      SetNewItems();
    }, 1000);
  }

  const SetNewItems = () => {
    const newTasks = {};
    Object.keys(tasks).forEach(key => {
      newTasks[key] = tasks[key];
    });
    setTasks(newTasks);
  }

  //function to convert time to string
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  
  //get the function from the Menu Component and close it
  const openMenu = () => {
    sideMenu.current.slideToRight();
  }

  const handleAddTaskComp = () => {
    settoggleNewTaskComp(true);
  }

  //i belive when i delete one task the render item asign props other data
  const renderItem = (task) => {
    return (
      <Task 
        id={task.id}
        title={task.title} 
        time={task.time} 
        date={task.date} 
        steps={task.steps}
        removeTask={removeTask}
        reloadList={SetNewItems}
        >
      </Task>
    )
  }
  return (
    <LinearGradient 
    colors={['#10002B', '#3C096C', '#5A189A', '#7B2CBF']}
    start={{x: 1, y: 0}}
    end={{x:0, y:1}} 
    style={styles.body}>
      <Menu style={styles.sideMenu} ref={sideMenu}></Menu>

      <View style={styles.topBar}>
        <TouchableOpacity onPress={openMenu}>
          <Image source={require('../assets/iconsHome/menu.png')} style={styles.iconLarge}/>
        </TouchableOpacity> 
        <Image source={require('../assets/iconsHome/bell.png')} style={styles.iconLarge}/>
      </View>
      <View style={styles.welcomeTxt}>
        <Text style={{color:'#FFF', fontSize: 16}}>Hi, Eduard</Text>
        <Text style={{color:'#FFF', fontSize: 18, fontWeight:'bold'}}>Let's be productive today.</Text>
      </View>

      <Agenda
        items={tasks}
        loadItemsForMonth={loadItems}
        selected={new Date}
        renderItem={renderItem}
        showClosingKnob={true}
      >
      </Agenda>

      <View style={styles.addBtnCont}>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddTaskComp}>
          <Image 
            style={styles.plusIcon}
            source={require('../assets/iconsHome/plus.png')}
          />
        </TouchableOpacity>
      </View>

      {toggleNewTaskComp &&
        <View style={styles.addScreenCont}>
          <AddTask addTask={addNewTask} toggleThis={settoggleNewTaskComp}></AddTask>
        </View> 
      }
      
    </LinearGradient>
  )
}



export default Home;


const styles = StyleSheet.create({
  body: {
    flex:1,
  },
  iconLarge: {
    width: 25,
    height: 25
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40
  },
  welcomeTxt: {
    padding: 20
  },
  addBtnCont: {
    position: 'absolute', 
    bottom: 25, 
    left: 0, 
    right: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  addBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#39B8FE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusIcon: {
    width: 30,
    height: 30
  },
  addScreenCont: {
    position: 'absolute', 
    bottom: 0,
    top:0, 
    left: 0, 
    right: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
  
})