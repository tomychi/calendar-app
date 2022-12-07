const basuURL = process.env.REACT_APP_API_URL;
console.log(basuURL);
const fetchSinToken = (endpoint, data, method = 'GET') => {
    const url = `${basuURL}/${endpoint}`; // localhost:4000/api/....

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // anexar la data en el body
        });
    }
};

const fetchConToken = (endpoint, data, method = 'GET') => {
    const url = `${basuURL}/${endpoint}`; // localhost:4000/api/....
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token,
            },
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token,
            },
            body: JSON.stringify(data), // anexar la data en el body
        });
    }
};

export { fetchSinToken, fetchConToken };
