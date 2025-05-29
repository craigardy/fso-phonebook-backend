// Run line below (Replace password with database password):
// node mango.js <password> <name> <number>
//  Note that if there is whitespace in the name or number, they must be in quotes
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as arguments')
  process.exit(1)
}
const password = process.argv[2]


// Connect to database
const url = `mongodb+srv://fullstack:${password}@cluster0.nf9lqqr.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url)

// Define note schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
// Define the model
const Person = mongoose.model('Person', personSchema)

// If adding a user
if (process.argv.length > 4) {
  const name = process.argv[3]
  const number = process.argv[4]
  // Create new note object via Note model
  const person = new Person({
    name: name,
    number: number,
  })
  // Save the note to the database
  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

} else { // If displaying all users
  // Retrieve ALL ({}) notes from database
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}



// // Retrieve ALL ({}) notes from database
// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

// // Include only important notes
// Note.find({ important: true }).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })