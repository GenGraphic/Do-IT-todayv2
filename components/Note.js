import { StyleSheet, View, TouchableOpacity, Image, TextInput, Text } from 'react-native'
import React, { useContext, useState } from 'react';
import NotesContext from '../NotesContext';

const Note = ({id, title, text}) => {
  const { removeNote } = useContext(NotesContext);
  const { editNote } = useContext(NotesContext);

  const [height, setHeight] = useState(100);
  const [isToggled, setIsToggled] = useState(false);
  //make a const that keeps track if the note height is 200 and if so enable/disable textInputs

  const [newTitle, setNewTitle] = useState('');//value of new title that is being send to the NotesContext and edited
  const [newText, setNewText] = useState('');//value of new text that is beeing send to the NotesContext and edited


  //check if note is 100 heght
  //if so make it 200
  //if is 200, make it 100
  const toggleNote = () => {
    if (height === 100) {
      setHeight(200);
      setIsToggled(true);
    } else {
      setHeight(100);
      setIsToggled(false);
      handleEditedNote();
    }
  }

  //handle note that has to be removed
  const handleRemoveNote = () => {
    removeNote(id);
  }

  //handle edit to notes
  const handleEditedNote = () => {
    editNote(id, newTitle, newText)
  }
  return (
    <View style={[styles.body, {height: height}]}>
      <View style={styles.nameCont}>
        <TextInput 
        multiline={true}
        editable={isToggled}
        placeholder={'-Title-'} 
        onChangeText={(valueTitle) => setNewTitle(valueTitle)}>
          <Text>{title}</Text>
        </TextInput>
        <TouchableOpacity onPress={toggleNote}>
          <Image source={require('../assets/iconsNotes/resize-expand.png')} style={styles.iconSmall}/>
        </TouchableOpacity>
      </View>
      <View style={styles.textCont}>
        <TextInput 
        style={{width: '100%', height: '100%'}}
        multiline={true}
        editable={isToggled}
        placeholder={'Your notes goes here...'} 
        onChangeText={(valueText) => setNewText(valueText)}>
          <Text>{text}</Text>
        </TextInput>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={handleRemoveNote}>
        <Image
        style={styles.icon} 
        source={require('../assets/iconsNotes/delete.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Note

const styles = StyleSheet.create({
  body: {
    width: '100%',
    backgroundColor: '#EBEBEB',
    marginTop: 25,
    borderRadius: 10,
    flexDirection: 'row'
},
icon: {
    width: 22,
    height: 22
},
iconSmall: {
  width: 15,
  height: 15
},
nameCont: {
    backgroundColor: '#D9D9D9',
    height: '100%',
    width: '20%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    padding: 5
},
textCont: {
    width: '70%',
    height: '100%',
    padding: 5
},
deleteBtn: {
    backgroundColor: '#D9D9D9',
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10
}
})