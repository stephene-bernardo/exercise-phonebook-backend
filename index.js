const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const Phone = require('./models/phone')

app.use(cors())
app.use(express.json())
const customMorgan = (tokens, req, res) => {
    const body = req.body;
    let customLog =  [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
    ]

    if(Object.keys(body).length !== 0) {
        customLog.push(JSON.stringify(body))
    }
    return customLog.join(' ')

}
app.use(morgan(customMorgan))

app.get('/api/persons', async (request, response) => {
    let phones = await Phone.find({});
    response.json(phones)
})

app.get('/api/persons/:id', async (request, response) => {
    let phone =  await Phone.findById(request.params.id);
    if(!phone){
        response.status(404).end()
    }
    response.json(phone)
})

app.delete('/api/persons/:id', async (request, response) => {
    await Phone.deleteOne({_id: request.params.id})
    response.status(204).end()
})

app.post('/api/persons', async (request, response, next) => {
    const body = request.body;
    let errorMessages = []
    let personExist = await Phone.find({name: body.name})
    // if(personExist.length > 0){
    //     errorMessages.push('name must be unique')
    // }

    // if(0 < errorMessages.length) {
    //     response.json({
    //         error: errorMessages.join(', ')
    //     }).end()
    //     return;
    // }

    try {
        let phone = new Phone({
            name: body.name,
            number: body.number
        })
      
        phone = await phone.save()
        response.json(phone).end()
    }
    catch(error) {
        next(error);
    }
})

app.put('/api/persons/:id', async (request, response, next) => {
    const body = request.body

    let phone = {
      name: body.name,
      number: body.number,
    }
    try{
        phone =  await Phone.findOneAndUpdate(
            request.params.id, 
            phone, 
            { new: true, runValidators: true, context: 'query'  }
        );
    
        if(!phone){
            response.status(404).end()
        }
        response.json(phone)
    } 
    catch(error){
        next(error)
    }

})

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
    console.error(error.name, '  ', error.message)
  
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
  // handler of requests with unknown endpoint
app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})