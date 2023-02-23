import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, {useRef, useState} from 'react';
import Menu from '../components/Menu';
import { LinearGradient } from 'expo-linear-gradient';


const Profile = () => {
  const sideMenu = useRef(null);//ref to the menu forwordRef()
  const [name, setName] = useState('Eduard Deleu')



  //get the function from the Menu Component and close it
  const openMenu = () => {
    sideMenu.current.slideToRight();
  }
  return (
    <LinearGradient 
      colors={['#10002B', '#3C096C', '#5A189A', '#7B2CBF']}
      start={{x: 1, y: 0}}
      end={{x:0, y:1}}
      style={styles.body}
      >
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
          <Text style={{color:'#FFF', fontSize: 18, fontWeight:'bold'}}>This is you.</Text>
        </View>

        <View style={styles.userCont}>

          <ImageBackground style={styles.iconPhoto} source={require('../assets/iconsProfile/user.png')}>
            <TouchableOpacity style={styles.addFotoBtn}>
              <Text style={{color:'#FFF'}}>Edit</Text>
            </TouchableOpacity>
          </ImageBackground>

          <Text style={{color:'#FFF', fontSize:20, fontWeight:'bold'}}>{name}</Text>
          <Text style={{color:'#FFF', fontSize:14}}>deleucostel32@gmail.com</Text>
        </View>
    </LinearGradient>
  )
}

export default Profile

const styles = StyleSheet.create({
  iconLarge: {
    width: 25,
    height: 25
  },
  iconPhoto: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  body: {
    flex:1,
    padding: 10
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width:200,
    height: '100%'
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  userCont: {
    paddingBottom: 10,
    width:'100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomColor: '#FFF',
    borderBottomWidth: 1
  },
  addFotoBtn: {
    backgroundColor: 'red'
  }
})