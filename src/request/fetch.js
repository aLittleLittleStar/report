import axios from '../plugins/axios'
import Vue from 'vue'
import qs from 'qs'

export default async(url = '', data = {}, type = 'GET', headers) => {
    type = type.toUpperCase();
    if (type == 'GET') {
        if (Object.keys(data).length !== 0) {
            url = url + '?' + qs.stringify(data);
        }
    }
    let requestConfig = {
        method: type,
        headers: headers || {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    if (type == 'POST' || type == 'PUT') {
        requestConfig.data = qs.stringify(data);
    }
    if(headers){
        requestConfig.data = data;
    }
    const response = await axios(url, requestConfig);
    if (response) {
        return response.data;
    }
}