import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/core';
import { authentication } from '../firebase';



export const Menu = React.forwardRef((props, ref) => {
    let user = authentication.currentUser;

    const [isVisible, setIsVisible] = useState(true);
    const position = useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();


    //Log out the user using firebase signout
    //then send user to sign in page
    //catch error if any
    const LogOutUser = () => {
        authentication
            .signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .catch(error => alert(error.message))
    }

    //Animation function to right
    const slideToLeft = () => {
        Animated.timing(position, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setIsVisible(false));
      };
    
    //Animation Function to left
    const slideToRight = () => {
        setIsVisible(true);
        Animated.timing(position, {
          toValue: 200,
          duration: 500,
          useNativeDriver: true,
    }).start();
      };

    //it is used to refear the functions to other screens
    useImperativeHandle(ref, () => ({
        slideToLeft,
        slideToRight // slideToRight function is exposed here
    }));

    
  return (
      <Animated.View 
      ref={ref} 
      style={[styles.body, { transform: [{ translateX: position }] }]} 
      pointerEvents={isVisible ? 'auto' : 'none'}>
            <BlurView intensity={40}>
            <LinearGradient style={styles.menuWrapper} blurRadius={40} colors={['rgba(16, 0, 43, 0.7)', 'rgba(60,9,108,0.7), rgba(90,24,154,0.7),rgba(123,44,191,0.7)']}>
                <View style={styles.topBar}>
                    <Text style={styles.sayHi}>Hi, {user.displayName}</Text>
                    <TouchableOpacity onPress={slideToLeft}>
                        <Image source={require('../assets/iconsHome/close.png')} style={styles.icon}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.optionsList}>
                    <TouchableOpacity 
                    onPress={() => navigation.replace('Home')}
                    style={styles.menuOption}>
                        <Image source={require('../assets/iconsHome/home.png')} style={styles.icon}/>
                        <Text style={styles.whiteTxtMenu}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.menuOption} 
                    onPress={() => navigation.replace('Notes')}>
                        <Image source={require('../assets/iconsHome/sticky-notes.png')} style={styles.icon}/>
                        <Text style={styles.whiteTxtMenu}>Notes</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                    onPress={() => navigation.replace('Calendar')} 
                    style={styles.menuOption}>
                        <Image source={require('../assets/iconsHome/calendar-menu.png')} style={styles.icon}/>
                        <Text style={styles.whiteTxtMenu}>Calendar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={() => navigation.replace('Profile')}
                    style={styles.menuOption}>
                        <Image source={require('../assets/iconsHome/user.png')} style={styles.icon}/>
                        <Text style={styles.whiteTxtMenu}>My Profile</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                      <Text style={{color: '#C2C2C2', textAlign: 'center', marginBottom: 25}}>Give Feedback</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.logOutBtn} onPress={LogOutUser}>
                      <Text style={styles.whiteTxt}>Log out</Text>
                      <Image source={require('../assets/iconsHome/log-out.png')} style={styles.iconSmall}/>
                  </TouchableOpacity>
                </View>
            </LinearGradient>
            </BlurView>
    </Animated.View> 
  )
});

export default Menu

const styles = StyleSheet.create({
    //general Sytel
    icon: {
        width: 22,
        height: 22
    },
    iconSmall: {
        width:15,
        height: 15,
        margin: 5
    },
    whiteTxt: {
        color: '#FFF',
        fontSize: 18,
        
    },
    whiteTxtMenu: {
        color: '#FFF',
        fontSize: 18,
        paddingLeft: 7
    },



    body: {
        width: 200,
        height: '100%',
        position: 'absolute',
        left: -200,
        bottom: 0,
        zIndex: 2,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    sayHi: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    menuWrapper: {
        height:'100%', 
        paddingTop: 40,
        paddingBottom: 50, 
        padding: 10,
        justifyContent: 'space-between'
    },
    menuOption: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50
    },
    logOutBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DC2F02',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 7
    },

})