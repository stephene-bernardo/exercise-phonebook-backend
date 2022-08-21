const Filter = ({filterUsingName, setFilterUsingName}) => {
    const onFilterNameChange = (event) => {
        setFilterUsingName(event.target.value)
    }

    return (
        <div>
            filter shown with <input onChange={onFilterNameChange} value={filterUsingName} />
        </div>
    )
}

export default Filter