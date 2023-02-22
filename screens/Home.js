import { StyleSheet, Text, View ,TouchableOpacity, Image, Alert } from 'react-native';
import {Agenda} from 'react-native-calendars';
import GloballyConst from '../GloballyConst';
import React, { useEffect, useState, useRef } from 'react';
import  Menu  from '../components/Menu';
import AddTask from '../components/AddTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

//function to convert time to string
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

const Home = () => {
  let [items, setItems] = useState(GloballyConst.tasks);
  const [addScreen, setAddScreen] = useState(false);
  const [todayDate, setTodayDate] = useState(new Date);
  const [refreshing, setRefreshing] = useState(false);
  const sideMenu = useRef(null);//ref to the menu forwordRef()

  //change the value of the add screnn from Globally and if true Add Screen is shown
  const showAddScreen = () => {
    GloballyConst.ADDSCREEN_ON = true;
  }

  //check every 0.5Sek if the value of isOn (for the addScreen) changed, and if so change the state of this
  useEffect(() => {
    const interval = setInterval(() => {
      setAddScreen(GloballyConst.ADDSCREEN_ON);
    }, 500);
    return () => clearInterval(interval);
      }, [])

  //function that load the tasks
  const loadItems = (day) => {
    setItems(GloballyConst.tasks);

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
          
          const numItems = items.length;
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: strTime + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }
    }, 1000);
  }

  //set the items ??
  const SetNewItems = () => {
    const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
  }
  
  //function that takes in the date of task and REMOVE it
  const RemoveTask = (taskDate) => {
    GloballyConst.tasks[taskDate] = [];
    SetNewItems();
  }

  //on Task clicked alert pop up to confirm removing
  const createTwoButtonAlert = (str) => 
  Alert.alert('Remove Task', 'Are you sure you want to delete this task?', [{
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
    },
    {text: 'Yes', onPress: () => {
      //Function to remove task
      RemoveTask(str)
    }},
  ]);


  //this is the way task will look like
  const renderItem = (item) => {
    return (
      <TouchableOpacity
      onLongPress={() => {
        //colling the function that show allert
        createTwoButtonAlert(item.date)
      }} 
      style={styles.taskCont}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{color:'#FFFFFF'}}>{item.name}</Text>
          <Image style={styles.icon} source={require('../assets/iconsHome/important.png')}/>
        </View>

        <View style={styles.statusBar}>
          <View style={styles.procents}>
            <Text style={styles.whiteTxt}>0%</Text>
            <Text style={styles.whiteTxt}>100%</Text>
          </View>
          <View style={styles.bar}>
            <View style={styles.progress}></View>
          </View>
        </View>

        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Image style={styles.iconSmall}  source={require('../assets/iconsHome/clock.png')}/>
          <Text style={{color:'rgba(255,255,255,0.5)', padding:5}}>{item.timeStart}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  //get the function from the Menu Component and close it
  const openMenu = () => {
    sideMenu.current.slideToRight();
  }

  return (
    <View style={styles.body}>
    <Menu style={styles.sideMenu} ref={sideMenu}></Menu>

      <View style={styles.topBar}>
        <TouchableOpacity onPress={openMenu}>
          <Image 
            source={require('../assets/iconsHome/menu.png')}
            style={styles.iconLarge} 
          />
        </TouchableOpacity> 
        <Image 
          source={require('../assets/iconsHome/bell.png')}
          style={styles.iconLarge} 
        />
      </View>
      <View style={styles.welcomeTxt}>
        <Text style={styles.sayHi}>Hi, Eduard</Text>
        <Text style={styles.impulseTxt}>Let's solve some tasks.</Text>
      </View>

      <View style={{flex:1}}>
        <Agenda
          items={GloballyConst.tasks}
          loadItemsForMonth={loadItems}
          selected={todayDate}
          renderItem={renderItem}
          theme={{
            agendaKnobColor: '#000814'
          }}
        />
      </View>
      <View style={{position: 'absolute', bottom: 25, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.addBtn} onPress={showAddScreen}>
          <Image 
            style={styles.plusIcon}
            source={require('../assets/iconsHome/plus.png')}
          />
        </TouchableOpacity>
      </View>

      {addScreen && 
        <View style={{position: 'absolute', bottom: 0,top:0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
          <AddTask></AddTask>
      </View>
      }
    </View>
  )
}



export default Home;


const styles = StyleSheet.create({
  //General Style
  whiteTxt: {
    color: '#FFF'
  },

  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width:200,
    height: '100%'
  },
  body: {
    backgroundColor: '#000814',
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40
  },
  iconSmall: {
    width:15,
    height:15
  },
  iconLarge: {
    width: 25,
    height:25
  },
  icon: {
    width:22,
    height: 22
  },
  welcomeTxt: {
    padding: 10
  },
  sayHi: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  impulseTxt: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  taskCont: {
    marginRight: 10,
    marginTop: 17,
    backgroundColor: 'rgba(94,101,102,1)',
    height: 100,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between'
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
  }
})