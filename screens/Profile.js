import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, {useRef, useState} from 'react';
import Menu from '../components/Menu';
import { LinearGradient } from 'expo-linear-gradient';
import { authentication } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';



const Profile = () => {
  let user = authentication.currentUser;
  const sideMenu = useRef(null);//ref to the menu forwordRef()
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(user.photoURL);


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

  //change user Email
  const handleChangeEmail = () => {
    Alert.prompt(
      "Change your Email",
      "Enter your new E-mail Adress.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: email => {
            updateEmail(user, email).then(() => {
              navigation.navigate('Login');
            }).catch((error) => {
              alert(error);
            })
          }
        }
      ],
    );
  };
  //change user pass
  const handleChangePass = () => {
    Alert.prompt(
      "Change your Password",
      "Enter your new Password.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: password => {
            updatePassword(user, password).then(() => {
              navigation.navigate('Login');
            }).catch((error) => {
              alert(error);
            })
          }
        }
      ],
      'secure-text'
    );
  };

  //change user name
  const handleChangeName = () => {
    Alert.prompt(
      "Change user name.",
      "Enter your new user Name.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: userName => {
            updateProfile(user, {
              displayName: userName
            })
            setName(userName)
          }
        }
      ],
      'plain-text'
    );
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
    }
  }

  //


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

          <Text style={{color:'#FFF', fontSize:20, fontWeight:'bold'}} onPress={handleChangeName}>{name}</Text>
          <Text style={{color:'#FFF', fontSize:14}}>{email}</Text>
        </View>

        <View style={styles.btnCont}>
          <View style={styles.changeBtnCont}>
            <TouchableOpacity style={styles.changeBtn} onPress={handleChangeEmail}>
              <Text style={{color:'#FFF', fontSize: 15}}>Change E-mail</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.changeBtn} onPress={handleChangePass}>
              <Text style={{color:'#FFF', fontSize: 15}}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.deletBtn} onPress={handleDeletAccount}>
            <Text style={{color:'#FFF', fontSize: 15}}>Delete account</Text>
          </TouchableOpacity>
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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  changeBtnCont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20
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
    alignSelf: 'center',
    margin: 10
  },
})