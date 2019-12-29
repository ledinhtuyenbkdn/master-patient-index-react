import axios from 'axios';

export default axios.create({
    baseURL: 'https://master-patient-index.herokuapp.com/api'
})