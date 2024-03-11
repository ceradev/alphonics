async function login(username, password) {
     try {
        const response = await HttpApiRequest('/auth/login', 'POST', {username: username, password: password});
        console.log(response);
        if (response.success) {
            location.href = '/home';
        } else {
            alert(response.message);
            location.href = '/login';
        }
     } catch (error) {
        console.log(error);
     }
    }

async function register(name, username ,email, password) {

    try {
        const response = await HttpApiRequest('/auth/register', 'POST', {name: name, username: username, email: email, password: password});
        console.log(response);
        if (response.success) {
            location.href = '/login';
        } else {
            alert(response.message);
        }
    } catch(error) {
        console.log(error);
    }
}

async function resetPassword(password, newPassword) {
    try {
        const response = await HttpApiRequest('/auth/reset-password', 'POST', {password: password, newPassword: newPassword});
        console.log(response);
        if (response.success) {
            location.href = '/home';
        } else {
            alert(response.message);
        }
    } catch(error) {
        console.log(error);
    }
}

async function logout() {
    try {
        const response = await HttpApiRequest('/auth/logout', 'GET');

        if (response.success) {
            location.href = '/';
        } else {
            alert(response.message);
        }
    } catch(error) {
        console.log(error);
    }
}




const HttpApiRequest = async (url,method,data) => {
    try {
       if (method == "POST") {
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
       } else {
        const response = await fetch(url);
        return response.json();
       }
    } catch (error) {
        console.log(error);
        return error;
    }
}