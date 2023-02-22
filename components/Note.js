import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Note = () => {
  return (
    <TouchableOpacity style={styles.body}>
      <View style={styles.nameCont}>
        <Text>Name</Text>
      </View>
      <View style={styles.textCont}>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse blandit, enim vel faucibus auctor, leo ligula tempus dui, quis lacinia.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse blandit, enim vel faucibus auctor, leo ligula tempus dui, quis lacinia.
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn}>
        <Image
        style={styles.icon} 
        source={require('../assets/iconsNotes/delete.png')}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default Note

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: 100,
        backgroundColor: '#EBEBEB',
        marginTop: 25,
        borderRadius: 10,
        flexDirection: 'row'
    },
    icon: {
        width: 22,
        height: 22
    },
    nameCont: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        width: '20%',
        justifyContent:'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    textCont: {
        width: '70%',
        height: '100%',
        overflow: 'scroll',
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