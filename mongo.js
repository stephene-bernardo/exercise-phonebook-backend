const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackexercise:${password}@cluster0.tphed0a.mongodb.net/?retryWrites=true&w=majority`

const phonebookScheme = new mongoose.Schema({
    name: String,
    number: String
});

(async function() {
        let abc = await mongoose.connect(url)
        const Phone = mongoose.model('Phonebook', phonebookScheme)
        if(process.argv[3] && process.argv[4]){
            let phone = new Phone({
                name: process.argv[3],
                number: process.argv[4]
              })
          
              phone = await phone.save()
              console.log(`added ${phone.name} number ${phone.number} to phonebook`)
        } else {
            console.log('phonebook:')
            let phones = await Phone.find({});
            phones.forEach(phone => {
                console.log(`${phone.name} ${phone.number}`)
            })
        }
        mongoose.connection.close()
})();


