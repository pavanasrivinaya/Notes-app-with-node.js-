//file system
const fs = require('fs')

//chalk package : We can apply color styles to the content in the console 
const chalk = require('chalk')
const { inverse } = require('chalk')


//adding a note 
const addNote = (title, body) => {
    const notes = loadNotes()
    //finding the particluar title in the note
    const duplicateNote = notes.find((note) => note.title === title)

    //debugger
    // const duplicateNotes = notes.filter(function(note) {
    //     return note.title === title
    // })

    if (!duplicateNote) {
        //appending/inserting the data into the notes varible here
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else {
        console.log(chalk.blue.inverse('Note title taken'))
    }
}

// remove note
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    // const notesToKeep = notes.filter(function(note) {
    //     return note.title !== title
    // })
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        //applies the  color to the content in the console
        console.log(chalk.red.inverse("No Note Found"))
    }
}

//listing a note
const listNotes = () =>{
    //stores the data into the notes
    const notes = loadNotes()
    //applies the  color to the content in the console
  console.log(chalk.yellow.inverse('Your notes'))
  
  //displays the data 
  //The forEach() method calls a function once for each element in an array, in order.
  notes.forEach((note) => {
      console.log(note.title)
  })

}

//read note
const readNote = (title) => {
    const notes = loadNotes()
    //finds the title in the notes variable
    const note = notes.find((note) => note.title === title)

    if (note) {
       //applies the color to the content in the console
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else {
        //applies the red color to the content in the console
        console.log(chalk.red.inverse('Note not found'))
    }
}
 
//save note to the json
const saveNotes = (notes) => {
    //stringify method converts a JavaScript object or value to a JSON string,
    const dataJSON = JSON.stringify(notes)
    //writes the data inot the notes.json file
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try {
        //read file
        const dataBuffer = fs.readFileSync('notes.json')
        //converts to the databuffer content to the string
        const dataJSON = dataBuffer.toString()

        //and then parse the data in the dataJSON  variable
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
    
}
//The module is a variable that represents the current module, and exports is an object that will be exposed as a module
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}