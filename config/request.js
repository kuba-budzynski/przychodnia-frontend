import axios from 'axios';
import SETTINGS from '../config/settings';

const request = axios.create({
    baseURL: SETTINGS.server
});

export default request;
