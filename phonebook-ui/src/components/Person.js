import personService from "../services/PersonService";

const Person = ({id, name, number, onRemove, setNotification}) => {
    const handleClick = () => {
        if(window.confirm(`Delete ${name}`)){
            personService.remove(id)
                .then(() => {
                    setNotification(`Information of ${name} has been successfully remove from server`)                    
                })
                .catch(() => {
                    setNotification(`Information of ${name} has already been removed from server`)
                })
                .finally(() => {
                    onRemove()
                });
        }
    }
    return (
    <div> 
        <p>{name} {number} <button onClick={handleClick}>Delete</button></p>
    </div>
    )
}

export default Person;