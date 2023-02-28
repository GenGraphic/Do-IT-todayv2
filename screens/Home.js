import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Menu from '../components/Menu';
import Task from '../components/Task';
import {Agenda} from 'react-native-calendars';
import TasksContext from '../TasksContext';
import AddTask from '../components/AddTask';
import { authentication } from '../firebase';





const Home = () => {
  let user = authentication.currentUser;

  const sideMenu = useRef(null);//ref to the menu forwordRef()
  const { tasks } = useContext(TasksContext);

  const [tasksList, setTasksList] = useState({});


  const { addNewTask } = useContext(TasksContext);
  
  const [ toggleNewTaskComp, settoggleNewTaskComp ] = useState(false);
  

  const loadItems = (day) => {

    setTasksList(tasks)

    setTimeout(() => {

      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        //check if tasks has strTime and if not creates an empy araay ex '2023-02-26' have strtime, if not add []
        if (!tasks[strTime]) {
          tasks[strTime] = [];
        }
      }
      const SetNewItems = () => {  
        const newTasks = {};
        
        Object.keys(tasks).forEach(key => {
          newTasks[key] = tasks[key];
        });
        setTasksList(newTasks);
      }
      SetNewItems();
    }, 1000);
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

  //open the window that let's user to add new task
  const handleAddTaskComp = () => {
    settoggleNewTaskComp(true);
  }

  //BIG BUG
  //when on the same day exist 3 items, and the second is beeing removed, the third dissapears
  const renderItem = (task) => {
    return (
      <Task 
        taskKey={task.key}
        title={task.title} 
        time={task.time} 
        date={task.date} 
        steps={task.steps}
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
        <Text style={{color:'#FFF', fontSize: 16}}>Hi, {user.displayName}</Text>
        <Text style={{color:'#FFF', fontSize: 18, fontWeight:'bold'}}>Let's be productive today.</Text>
      </View>

      <Agenda
        items={tasks}
        loadItemsForMonth={loadItems}
        selected={new Date}
        renderItem={renderItem}
        showClosingKnob={true}
        refreshing={true}
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