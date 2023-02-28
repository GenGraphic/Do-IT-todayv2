import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, {useRef, useState} from 'react';
import Menu from '../components/Menu';
import { LinearGradient } from 'expo-linear-gradient';
import ProfilePicture from 'react-native-profile-picture';
import { authentication } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { TextInput } from 'react-native-gesture-handler';
import { updateEmail, updatePassword } from 'firebase/auth';



const Profile = () => {
  let user = authentication.currentUser;
  const sideMenu = useRef(null);//ref to the menu forwordRef()
  const [name, setName] = useState('John Smith');
  const [email, setEmail] = useState(user.email);
  const [toggleChangeScreen, setToggleChangeScreen] = useState(true)
  const navigation = useNavigation();


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
            updateEmail(authentication.currentUser, email).then(() => {
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
            setName(userName)
          }
        }
      ],
      'plain-text'
    );
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

          <ProfilePicture
            isPicture = {true}
            requirePicture={require('../assets/iconsProfile/profile-foto.jpg')}
            width={100}
            height={100}
          />

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