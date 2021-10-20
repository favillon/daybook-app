import axios from 'axios';

const dayBookApi = axios.create({
    baseURL : 'https://curso-vue-udemy-5e9cd-default-rtdb.firebaseio.com/'
})

export default dayBookApi
