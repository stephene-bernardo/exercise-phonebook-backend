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

app.post('/api/persons', async (request, response) => {
    const body = request.body;
    let errorMessages = []
    if(!body.name) {
        errorMessages.push('name is missing')
    } else {
        let personExist = await Phone.find({name: body.name})
        if(personExist.length > 0){
            errorMessages.push('name must be unique')
        }
    }

    if(!body.number) {
        errorMessages.push('number is missing')
    }

    if(0 < errorMessages.length) {
        response.json({
            error: errorMessages.join(', ')
        }).end()
        return;
    }

    let phone = new Phone({
        name: body.name,
        number: body.number
    })
  
    phone = await phone.save()
    response.json(phone).end()
})

app.put('/api/persons/:id', async (request, response) => {
    const body = request.body

    let phone = {
      name: body.name,
      number: body.number,
    }
    
    phone =  await Phone.findOneAndUpdate(request.params.id, phone, { new: true });

    if(!phone){
        response.status(404).end()
    }
    response.json(phone)
})

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.use(express.static('build'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
  // handler of requests with unknown endpoint
app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})