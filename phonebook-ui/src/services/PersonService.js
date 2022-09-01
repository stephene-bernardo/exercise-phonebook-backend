import axios from 'axios'

console.log('url', process.env)

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (person) => {
    return axios.post(baseUrl, person)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    getAll,
    create,
    remove,
    update
}