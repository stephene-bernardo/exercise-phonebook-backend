import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/PersonService'

function App() {
  const [persons, setPersons] = useState([])
  const [filterUsingName, setFilterUsingName] = useState('')
  const [message, setMessage] = useState('')

  const reloadList = () => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }

  useEffect(()=> {
    reloadList()
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filterUsingName={filterUsingName} setFilterUsingName={setFilterUsingName}/>
      <PersonForm persons={persons} setPersons={setPersons} reloadList={reloadList} setNotification={setMessage}/>
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filterUsingName={filterUsingName}
        reloadList={reloadList}
        setNotification={setMessage}/>
    </div>
  )
}

export default App;
