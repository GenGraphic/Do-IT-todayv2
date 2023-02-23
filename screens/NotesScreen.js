import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useRef, useContext } from 'react';
import Menu from '../components/Menu';
import { LinearGradient } from 'expo-linear-gradient';
import NotesContext from '../NotesContext';
import Note from '../components/Note';


const NotesScreen = () => {
  const sideMenu = useRef(null);//ref to the menu forwordRef()
  const { notes } = useContext(NotesContext);
  const { addNewNote } = useContext(NotesContext);
 
  
  //get the function from the Menu Component and close it
  const openMenu = () => {
    sideMenu.current.slideToRight();
  }

  //function that makes a new random key, and use a function from NotesContext and adds it to the list
  const handleAddNote =() => {
    const key = Math.random() * 100;
    addNewNote(key, '', '');
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
      <ScrollView contentContainerStyle={styles.notesList}>
        {notes.map((item) => {
          return (
            <Note key={item.key} id={item.key} title={item.title} text={item.text}></Note>//in  this case i use 'id' instead of key, so i dont't get an error since key and ref are default props in React native
            //i had a problem here: when i would delete a note, i would delete the wrong one, and i was because:
            //the Note element had no props for title and text, and it would not update the text in the fields
          )
        })
        }
      </ScrollView>

      <View style={{position: 'absolute', bottom: 25, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddNote}>
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
    paddingBottom: 100
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