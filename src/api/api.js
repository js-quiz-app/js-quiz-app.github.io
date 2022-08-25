export const settings = {
    host: ''
};

async function request(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.ok === false) {
            const err = await response.json();
            alert(err.message);
            throw new Error(err.message);
        }

        try {
            return await response.json();
        } catch (err) {
            return response;
        }
    } catch (err) {
        alert(err.message)
        throw err;
    }
}

function createOptions(method = 'GET', data) {
    const result = {
        method,
        headers: {
            'X-Parse-Application-Id': 'hiNTtGdut8ASkfzAft80aJ1klcrnu2ghCtWcb9yN',
            'X-Parse-REST-API-Key': 'b1V3Q5cuFipCWjSPi4xvNpxNOb2wHh7sThut1pLD'
        }
    };

    if (data) {
        result.headers['Content-Type'] = 'application/json';
        result.body = JSON.stringify(data);
    }

    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        result.headers['X-Parse-Session-Token'] = token;
    }

    return result;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('POST', data));
}

export async function put(url, data) {
    return request(url, createOptions('PUT', data));
}

export async function del(url) {
    return request(url, createOptions('DELETE'));
}

export async function register(email, username, password) {
    const response = await post(settings.host + '/users', { email, username, password });
    
    sessionStorage.setItem('authToken', response.sessionToken);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('userId', response.objectId);


    return response;
}

export async function login(username, password) {
    const response = await post(settings.host + '/login', { username, password });

    sessionStorage.setItem('authToken', response.sessionToken);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('userId', response.objectId);

    return response;
}

export async function logout() {
    const response = await post(settings.host + '/logout', {});

    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userId');

    return response;
}