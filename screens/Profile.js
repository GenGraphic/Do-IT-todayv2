import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, {useRef, useState} from 'react';
import Menu from '../components/Menu';
import { LinearGradient } from 'expo-linear-gradient';
import { authentication } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import Dialog from "react-native-dialog";



const Profile = () => {
  let user = authentication.currentUser;
  const sideMenu = useRef(null);//ref to the menu forwordRef()
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(user.photoURL);

  const [changedName, setChangedName] = useState();
  const [toggleDialog, setToggleDialog] = useState(false);


  const handleDeletAccount = () =>
    Alert.alert('Warning', 'Are you sure you want to delete your account?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        user
          .delete()
          .then(() => navigation.navigate('Login'))
          .catch((e) => alert(e))
      }},
    ]);

  //get the function from the Menu Component and close it
  const openMenu = () => {
    sideMenu.current.slideToRight();
  }

  //change user pass
  const handleChangePass = () => {
    sendPasswordResetEmail(authentication, email)
      .then(alert('We have sent you an reset Password Email'))
      .catch((error => alert(error)))
  };

  //change user name
  const handleChangeName = () => {
    updateProfile(user, {
      displayName: changedName
    }).then(() => {
      setToggleDialog(false)
      setName(user.displayName)
    }).catch((error) => {
      alert(error)
    })
  }
  
  //change profile Image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true
    })
    if(!result.canceled) {
      updateProfile(authentication.currentUser, {
        photoURL: result.assets[0].uri
      })
      setProfileImage(user.photoURL);
    }
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
          <Text style={{color:'#FFF', fontSize: 16}}>Hi, {name}</Text>
          <Text style={{color:'#FFF', fontSize: 18, fontWeight:'bold'}}>This is you.</Text>
        </View>

        <View style={styles.userCont}>

          <TouchableOpacity onPress={pickImage}>
            <Image source={{uri: profileImage}} style={styles.profileFoto}/>
          </TouchableOpacity>

          <Text style={{color:'#FFF', fontSize:20, fontWeight:'bold'}} onPress={() => setToggleDialog(true)}>{name}</Text>
          <Text style={{color:'#FFF', fontSize:14}}>{email}</Text>
        </View>

        <View style={styles.btnCont}>
            <TouchableOpacity style={styles.deletBtn} onPress={handleDeletAccount}>
              <Text style={{color:'#FFF', fontSize: 15}}>Delete account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.changeBtn} onPress={handleChangePass}>
              <Text style={{color:'#FFF', fontSize: 15}}>Change Password</Text>
            </TouchableOpacity>
        </View>

        <Dialog.Container visible={toggleDialog}>
          <Dialog.Title>Change name</Dialog.Title>
          <Dialog.Input placeholder='Name' onChangeText={(text) => setChangedName(text)}></Dialog.Input>
          <Dialog.Button label="Cancel"/>
          <Dialog.Button label="Confirm" onPress={() => handleChangeName()}/>
        </Dialog.Container>
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
    paddingLeft:10,
    paddingRight: 10
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
  },
  profileFoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#6c757d'
  },
  btnCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 50,
  },
  changeBtn: {
    width: 150,
    height: 30,
    backgroundColor: '#39B8FE',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deletBtn: {
    backgroundColor: '#FC0005',
    width: 150,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
   
   
  },
})