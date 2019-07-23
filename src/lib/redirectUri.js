const redirectUri = process.env.NODE_ENV  === 'production' ? 'https://fb.cheshirebeane.com/auth' : 'https://localhost:3000/auth';

export default redirectUri;
