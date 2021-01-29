//Yargs helps you build interactive command line tools, by parsing arguments and generating an elegant user interface.
const yargs = require('yargs')
const notes = require('./notes.js')
const chalk = require('chalk')
//customize yargs version
yargs.version('1.0.0')

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true, //this filed require the value should not be empty
            type: "string" //it should be string
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        //console.log("Removing a note!")
        notes.removeNote(argv.title)
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'list a note',
    handler() {
        notes.listNotes()
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
          describe: 'Note Title',
          demandOption: true,
          type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})
//console.log(yargs.argv)

yargs.parse()
