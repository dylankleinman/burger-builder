import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-d521e.firebaseio.com/'
});

export default instance;