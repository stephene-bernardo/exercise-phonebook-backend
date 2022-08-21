import { useState } from 'react'
import personService from '../services/PersonService'

const PersonForm = ({persons, setPersons, reloadList, setNotification}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const onInputNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    const onInputNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault();
        const nameAlreadyExist = persons.filter(person => person.name === newName);
        if(nameAlreadyExist.length > 0 ) {
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
            personService.update(nameAlreadyExist[0].id, {number: newNumber, name: newName}).then(() => {
              reloadList();
              setNotification(`Updated ${newName}`)
            })
          }
        }
        else if(newName.trim() !== '') {
          personService.create({name: newName, number: newNumber}).then(() => {
            reloadList();
            setNotification(`Added ${newName}`)
          })
          // setPersons(persons.concat({name: newName, id: persons.length + 1, number: newNumber}))
        }
        setNewName('')
        setNewNumber('')
    }
    

    return (
        <form onSubmit={addName}>
        <div>
          name: <input onChange={onInputNameChange} value={newName} />
          <br/>
          number: <input onChange={onInputNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm;