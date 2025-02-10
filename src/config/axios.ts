import axios from "axios";

const bhutIntegrationAxios = axios.create({
    baseURL: 'http://api-test.bhut.com.br:3000/api',
    headers: {
        'accept': 'application/json',
    }
})

export {
    bhutIntegrationAxios
}
