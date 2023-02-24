import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react';
import Menu from '../components/Menu';
import { LinearGradient } from 'expo-linear-gradient';
import {CalendarList, DateData} from 'react-native-calendars';

const RANGE = 24;
const initialDate = Date.now();



const CalendarScreen = () => {
  const sideMenu = useRef(null);//ref to the menu forwordRef()

  //get the function from the Menu Component and close it
  const openMenu = () => {
    sideMenu.current.slideToRight();
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
        <Text style={{color:'#FFF', fontSize: 16}}>Hi, Eduard</Text>
        <Text style={{color:'#FFF', fontSize: 18, fontWeight:'bold'}}>Be productive this month.</Text>
      </View>

      <CalendarList
        current={initialDate}
        style={styles.calendar}
      />
    </LinearGradient>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({
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
    paddingLeft:10,
    paddingRight:10
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
  calendar: {
    marginTop: 10,
    borderRadius: 20
  }
  
})