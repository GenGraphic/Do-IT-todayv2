import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authentication } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const Stack = createNativeStackNavigator();


export default function Login() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(user => {
      if(user) {
        navigation.navigate('Home')
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch(error => alert(error.message))
  }
  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Home');
      })
      .catch(error => alert(error.message))
  }

  return (
    <LinearGradient 
      colors={['#10002B', '#3C096C', '#5A189A', '#7B2CBF']}
      start={{x: 1, y: 0}}
      end={{x:0, y:1}}
      style={styles.container}
    >
      <View style={styles.logoCont}>
        <Image
          source={require('../assets/logo-noBkg.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.titleCont}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>We are happy to see you again.</Text>
      </View>

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.form}>
      <View style={styles.forms}>
        <LinearGradient 
          colors={['rgba(217, 217, 217, 0.1)', 'rgba(217, 217, 217, 0.5)']}
          start={{x: 0, y:1}}
          style={[styles.inputCont, styles.inputContUser]}>
          <Image
            source={require('../assets/user.png')}
            style={styles.icon}
          />
          <TextInput
            placeholder='E-mail'
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'#FFF'}
            style={{width:'80%', color: 'white'}}
          />
        </LinearGradient>

        <LinearGradient
          colors={['rgba(217, 217, 217, 0.1)', 'rgba(217, 217, 217, 0.5)']}
          start={{x: 0, y:1}} 
          style={[styles.inputCont, styles.inputContPass]}>
          <Image
            source={require('../assets/pass.png')}
            style={styles.icon}
          />
          <TextInput
            placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            placeholderTextColor={'#FFF'}
            style={{width:'80%', color: 'white'}}
            secureTextEntry={true}
          />
        </LinearGradient>
      </View>

      <TouchableOpacity
      onPress={handleSignIn} 
      style={styles.btnLogin}>
        <Text style={{textAlign: 'center', margin: 2}}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={handleSignUp} 
      style={styles.btnRegister}>
        <Text style={{textAlign: 'center', margin: 2, color:'#FFFFFF'}}>Register</Text>
      </TouchableOpacity>

      </KeyboardAvoidingView>
      

      <StatusBar style="light" />

      <View style={styles.vectorCont}>
        <Image 
        style={styles.vectorImg}
        source={require('../assets/listVector.png')}/>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    justifyContent: 'space-between'
  },
  logoCont: {
    alignSelf: 'flex-start'
  },
  logo: {
    width: 150,
    height: 70,

  },
  titleCont: {
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    marginBottom: 20
  },
  subtitle: {
    color: '#FFFFFF',
    opacity: 0.5,
    fontSize: 12,
    marginBottom: 20
  },
  form: {
    alignItems: 'center',
  },
  forms: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20
  },
  icon: {
    width: 22,
    height:22,
    marginRight: 15
  },
  inputCont: {
    flexDirection: 'row',
    width: 250,
    padding: 20,
  },
  inputContUser: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  inputContPass: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  btnLogin: {
    width: 200,
    height: 30,
    backgroundColor: '#39B8FE',
    borderRadius: 15,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center'
  },
  btnRegister: {
    width: 150,
    borderRadius: 15,
    borderColor: '#39B8FE',
    borderWidth: 1
  },
  vectorImg: {
    width: 450,
    height: 300
  }
});
