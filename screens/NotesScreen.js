import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react';
import Menu from '../components/Menu';
import Note from '../components/Note';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';


const NotesScreen = () => {
  const sideMenu = useRef(null);//ref to the menu forwordRef()
  const [DATA, setDATA] = useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    
  ]);

  const Item = Note;
  

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
        <Text style={{color:'#FFF', fontSize: 18, fontWeight:'bold'}}>Take notes.</Text>
      </View>
      <View style={styles.notesList}>
        <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        >
          
        </FlatList>
      </View>
      <View style={{position: 'absolute', bottom: 25, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.addBtn}>
          <Image 
            style={styles.plusIcon}
            source={require('../assets/iconsHome/plus.png')}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

export default NotesScreen

const styles = StyleSheet.create({
  body: {
    flex:1,
    padding: 10
  },
  iconLarge: {
    width: 25,
    height: 25
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40
  },
  notesList: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 100

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