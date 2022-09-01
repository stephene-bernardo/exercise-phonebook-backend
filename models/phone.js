const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function(v){
        return /((\d{2}-\d{7})|(\d{3}-\d{8}))/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

phoneSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebook', phoneSchema)