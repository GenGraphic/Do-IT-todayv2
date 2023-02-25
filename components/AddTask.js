import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Platform, TextInput, Button, ScrollView,Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NotesContext from '../NotesContext';


//function to convert time to string
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

const AddTask  = ({addTask, toggleThis}) => {
  const { tasks } = useContext(NotesContext);

  const [date, setDate] = useState( new Date);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [temporaryStep ,setTemporaryStep] = useState('')

 
  const [titleTask, setTitleTask] = useState('');
  const [dateTask, setDateTask] = useState(timeToString(date)); //default value is today date
  const [timeTask, setTimeTask] = useState(date.getHours() + ':' + date.getMinutes());
  const [stepList, setStepList] = useState([]);

  //function  for datTime picker(better don't touch)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    let monthTwoDigits;
    let tempMonth = tempDate.getMonth() + 1;
    
    //the default format of month is 2 or 3 or 5, i needed to be 02 or 03 or 05
    //i hat to find a way to make it two digits
    //so if the length of default month format is one i added a 0 in front
    if(tempMonth.toString().length == 1 ){
      monthTwoDigits = '0' + (tempDate.getMonth() + 1);
    }else {
      monthTwoDigits = tempDate.getMonth() + 1;
    }

    let fDate = tempDate.getFullYear() + '-' + monthTwoDigits + '-' + tempDate.getDate();
    let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes();

    setDateTask(fDate);
    setTimeTask(fTime);

  }
  //this function takes input (time/date) and show the Time/Date picker screen
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  //this push a new task on the Globally tasks file on btn press (Add Btn)
  const handleAddTask = () => {
    const id = Math.random() * 100000 //generate a random number to be used as id

    addTask(id, titleTask, timeTask, dateTask, stepList); //this function is called in TasksContext
    closeThis();
  }

  //first keybord is dissmissed
  //teb check if user has typed something in field
  //is so, insert the input into the StepsList
  //if not throw an alert
  //remove text from field
  const AddStepToList = () => {
    Keyboard.dismiss();

    if(temporaryStep <= 0) {
      alert('Empty step is not valid.')
    }else {
      setStepList([...stepList, temporaryStep])
    }
    setTemporaryStep(null);
  }

  //makes a copy of the StepsList
  //slice the list and remove the element with index
  //set the Steps the copy list without the removed element
  const RemoveStep = (index) => {
    let itemsCopy = [...stepList];
    itemsCopy.splice(index, 1);
    setStepList(itemsCopy);
  }

  //function to close this component
  const closeThis = () => {
    toggleThis(false);
  }
    return (
      <View style={styles.body}>
        <View style={styles.topBar}>
          <Text style={{fontSize: 18}}> Something new to do </Text>
          <Image 
            source={require('../assets/iconsHome/save.png')}
            style={styles.icon}
          />
        </View>
        
        <View style={styles.inputCont}>

        <View style={styles.inputs}>
            <Image
              source={require('../assets/iconsHome/task.png')}
              style={styles.icon}
            />
            <Text>Task:</Text>
            <TextInput 
            style={styles.inputField}
            placeholder={'ex. Meeting'}
            onChangeText={(text) => setTitleTask(text)}
            />
          </View>
          <View style={styles.inputs}>
            <Image
              source={require('../assets/iconsHome/calendar.png')}
              style={styles.icon}
            />
            <Text>Date:</Text>
            <TouchableOpacity showSoftInputOnFocus={false}>
              {Platform.OS === 'ios' ?
              <DateTimePicker
                style={{width:150}}
                testID='dateTimePicker'
                value={date}
                mode= 'date'
                is24Hour={true}
                display= 'default'
                onChange={onChange}
                dateFormat= "shortdate"/> 
                : <TouchableOpacity onPress={() => showMode('date')}>
                    <Text style={styles.inputField}>{dateTxt}</Text>
                </TouchableOpacity> 
              }
            </TouchableOpacity>
          </View>

          <View style={styles.inputs}>
            <Image
              source={require('../assets/iconsHome/clock.png')}
              style={styles.icon}
            />
            <Text>Time:</Text>
            <TouchableOpacity onPress={() => showMode('time')} showSoftInputOnFocus={false}>
            {Platform.OS === 'ios' ?
            <DateTimePicker
                style={{width:150}}
                testID='dateTimePicker'
                value={date}
                mode='time'
                is24Hour={true}
                display= 'default'
                onChange={onChange}
                dateFormat= "shortdate"/> 
                :
              <TouchableOpacity onPress={() => showMode('time')}>
                <Text style={styles.inputField}>{timeTxt}</Text>
                  {show && (
                    <DateTimePicker
                      testID='dateTimePicker'
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display= 'default'
                      onChange={onChange}
                      dateFormat= "shortdate"
                  />)}
              </TouchableOpacity>  
            }
            </TouchableOpacity>
          </View>
          
          <View style={styles.stepsCont}>
            <View style={styles.inputs}>
              <Image
              style={styles.icon}
              source={require('../assets/iconsHome/steps.png')}
              />
              <TextInput
              placeholder='ex. make clients list'
              style={styles.inputSteps}
              onChangeText={text => setTemporaryStep(text)}
              value={temporaryStep}
              />
              <Button style={styles.addStepBtn} title='Add' onPress={AddStepToList}>
              </Button>
            </View>
            <ScrollView style={styles.stepsField}>
              { stepList.map((item, index) => {
                  return (
                    <TouchableOpacity style={styles.step} key={index} onPress={() => RemoveStep(index)}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ) 
                })
              }
            </ScrollView>
          </View>
        </View>

        <View style={styles.btnCont}>
          <Button style={styles.cancelBtn} onPress={closeThis} title='Cancel' color={'#fb5607'}>
          </Button>
          <Button  style={styles.doneBtn} title='Done' color={'#70e000'} onPress={handleAddTask}>
          </Button>
        </View>

      </View>
    )
}

export default AddTask;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFF',
    width: '90%',
    height: 550,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 22,
    height: 22
  },
  inputCont: {
    flex:1,
    justifyContent: 'space-between',
    paddingBottom:20,
    paddingTop: 20
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputField: {
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 15,
    width: 150,
    textAlign: 'center'
  },
  addStepBtn: {
    width: 25,
    height: 25,
    backgroundColor: '#39B8FE',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadious: 10
  },
  inputSteps: {
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 15,
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  },
  stepsField: {
    width:'100%',
    height: 150,
    backgroundColor: '#e9ecef',
    padding:5,
    marginTop: 10
  },
  step: {
    backgroundColor: '#FFF',
    marginBottom:5,
    padding: 5,
    borderRadius:10
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cancelBtn: {
    width: 90,
    height: 25,
    borderRadius: 10,
    backgroundColor: '#DC2F02',
    alignItems: 'center',
    justifyContent: 'center'
  },
  doneBtn: {
    width: 90,
    height: 25,
    borderRadius: 10,
    backgroundColor: '#39B8FE',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1
  }

})
