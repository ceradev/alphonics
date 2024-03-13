async function login(username, password) {
    try {
        const response = await HttpApiRequest('/auth/login', 'POST', { username: username, password: password });
        console.log(response);
        if (response && response.success) {
            location.href = '/home';
        } else {
            alert(response && response.message ? response.message : 'Error en la autenticación');
            location.href = '/login';
        }
    } catch (error) {
        console.log(error);
        alert('Error en la solicitud');
    }
}

async function register(name, username, email, password) {
    try {
        const response = await HttpApiRequest('/auth/register', 'POST', { name: name, username: username, email: email, password: password });
        console.log(response);
        if (response && response.success) {
            location.href = '/login';
        } else {
            alert(response && response.message ? response.message : 'Error en el registro');
        }
    } catch (error) {
        console.log(error);
        alert('Error en la solicitud');
    }
}

async function resetPassword(password, newPassword) {
    try {
        const response = await HttpApiRequest('/auth/reset-password', 'POST', { password: password, newPassword: newPassword });
        console.log(response);
        if (response && response.success) {
            location.href = '/home';
        } else {
            alert(response && response.message ? response.message : 'Error al restablecer la contraseña');
        }
    } catch (error) {
        console.log(error);
        alert('Error en la solicitud');
    }
}

async function logout() {
    try {
        const response = await HttpApiRequest('/auth/logout', 'GET');
        if (response && response.success) {
            location.href = '/';
        } else {
            alert(response && response.message ? response.message : 'Error al cerrar sesión');
        }
    } catch (error) {
        console.log(error);
        alert('Error en la solicitud');
    }
}

const HttpApiRequest = async (url, method, data) => {
    try {
        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (method === 'POST' && data) {
            options.body = JSON.stringify(data);
        }
        const response = await fetch(url, options);
        return response.json();
    } catch (error) {
        console.log(error);
        throw new Error('Error en la solicitud');
    }
}
