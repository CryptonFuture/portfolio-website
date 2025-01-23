const baseUrl = 'http://localhost:8000'
const secretKey = "0192384756";

const accessToken = localStorage.getItem('accessToken')

if (accessToken) {
    window.location.href = '../../Panel/panel.html';
}

function showSnackbar(message, type = "success") {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336";

    snackbar.className = "show";

    setTimeout(() => {
        snackbar.className = "hide";


        setTimeout(() => {
            snackbar.className = "";

        }, 500);
    }, 3000);

}

window.onload = () => {
    const rememberedEmail = localStorage.getItem('email');
    const encryptedPassword = localStorage.getItem('password');
    if (rememberedEmail && encryptedPassword) {
        const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, secretKey).toString(CryptoJS.enc.Utf8)
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('password').value = decryptedPassword;
        document.getElementById('rememberMe').checked = true;
    }
};


const login = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const rememberMe = document.getElementById('rememberMe').checked

    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    let isValid = true;
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required.';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required.';
        isValid = false;
    } else if (password.length < 10) {
        document.getElementById('passwordError').textContent = 'Password must be at least 10 characters';
        isValid = false;
    }

    if (!isValid) {
        return;
    }



    const res = await fetch(`${baseUrl}/v1/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        })
    })

    const data = await res.json()

    if (res.ok) {
        showSnackbar(data.message, "success");
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('userId', data.data._id)
        localStorage.setItem('firstname', data.data.firstname)
        localStorage.setItem('lastname', data.data.lastname)
        localStorage.setItem('email', data.data.email)
        localStorage.setItem('profileImage', data.data.profileImage)
        localStorage.setItem('role', data.data.role)

        if (rememberMe) {
            const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
            localStorage.setItem('email', data.data.email)
            localStorage.setItem('password', encryptedPassword)
            localStorage.setItem('rememberMe', 'true')

        } else {
            localStorage.removeItem('email')
            localStorage.removeItem('password')
            localStorage.removeItem('rememberMe')
        }

        if (data.data.role === 0) {
            setTimeout(() => {
                window.location.href = '../../Panel/panel.html'
            }, 3000);
        } else if (data.data.role === 1) {
            setTimeout(() => {
                window.location.href = '../../Panel/panel.html'
            }, 3000);
        } else if (data.data.role === 2) {
            setTimeout(() => {
                window.location.href = '../../Panel/panel.html'
            }, 3000);
        } else if (data.data.role === 3) {
            setTimeout(() => {
                window.location.href = '../../Panel/panel.html'
            }, 3000);
        } else {
            setTimeout(() => {
                window.location.href = '../../index.html'
            }, 3000);
        }

    } else {
        showSnackbar(data.error, "error");
    }
}


// SHOW AND HIDE PASSWORD AND CONFIRM PASSWORD

const showAndHidePassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

const showAndHideConfirmPassword = () => {
    var x = document.getElementById("confirmPass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}




