import axios from 'axios';

const isLocalhost = Boolean(

    window.location.hostname === 'localhost' || window.location.hostname === '[::1]' ||

    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/) ||

    window.location.hostname.match(/^192(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)

);

const Axios = axios.create({

    baseURL: isLocalhost ? 'GitHub/React-PDF-Catalog/public/php/' : 'php/',
    
});

export default Axios;