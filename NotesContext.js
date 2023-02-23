import React, { createContext, useState } from "react";

const NotesContext = createContext([]);

//find a way to save this file in phone memory so that user have the file allways
//make a Context for tasks too

export function NotesProvider({ children }) {
    const [notes, setNotes] = useState([])

    //function that take in key, title and text that is beeing called on NotesScreen to add new alement in the array
    const addNewNote = (key, title, text) => {
        setNotes((prevState) => [...prevState, {key: key, title: title, text: text}]);
    }
    //function that take in the key and it's being called from Note component to remove an element
    const removeNote = (keyTosearch) => {
        const newArray = notes.filter((i) => i.key !== keyTosearch);
        setNotes(newArray);
    }

    //this function is beeing called in Note and take in the key of the note, title and text variable from this
    //asing the value to new variable
    //and find the note in notes list and update it's values
    const editNote = (key, title, text) => {
        const newTitle = title;
        const newText = text;

        notes.find(x => x.key === key).title = newTitle;
        notes.find(x => x.key === key).text = newText;
    }

    return (
        <NotesContext.Provider value={{ notes, addNewNote, removeNote, editNote }}>{ children }</NotesContext.Provider> //values are the variable or the functions that i want to acces across the app
    )
}

export default NotesContext;