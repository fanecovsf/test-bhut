import axios from "axios";

const bhutIntegrationAxios = axios.create({
    baseURL: 'http://api-test.bhut.com.br:3000/api',
    headers: {
        'accept': 'application/json',
    }
})

const localAxios = axios.create({
    baseURL: 'http://app:3000'
})

export {
    bhutIntegrationAxios,
    localAxios
}
