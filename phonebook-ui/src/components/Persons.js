import Person from "./Person"

const Persons = ({persons, filterUsingName, reloadList, setNotification}) => {
    return (
         persons
            .filter(person => person.name.toUpperCase().indexOf(filterUsingName.toUpperCase()) > -1)
            .map(person => (
                <Person key={person.id} 
                    id={person.id} 
                    name={person.name} 
                    number={person.number} 
                    onRemove={reloadList}
                    setNotification={setNotification}/>)) 
    )
}

export default Persons;