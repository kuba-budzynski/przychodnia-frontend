import SETTINGS from '../config/settings';
import axios from 'axios';

const request = axios.create({
    baseURL: SETTINGS.server
});

export default request;
