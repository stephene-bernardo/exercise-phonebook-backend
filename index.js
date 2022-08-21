const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

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

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(entry => entry.id === id)
    if(!person){
        response.status(404).end()
    }
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(entry => entry.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body;
    let errorMessages = []
    if(!body.name) {
        errorMessages.push('name is missing')
    } else {
        let personExist = persons.find(person => person.name === body.name)
        if(personExist){
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

    let id = 0;
    let personExist;
    do {
        id = Math.floor(Math.random() * 10000) + 1
        personExist = persons.find(person => person.id === id)
    } while(personExist)

    const newPerson = {
        ...body,
        id: id
    }

    persons = persons.concat(newPerson)
    response.json(newPerson).end()
})



app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.use(express.static('build'))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})