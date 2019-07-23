const apiUrl = process.env.NODE_ENV === 'production' ? 'https://fbapi.cheshirebeane.com/api' : 'http://localhost:8080/api';

export default apiUrl;
