const baseUrl = 'http://localhost:8000'

function showSnackbar(message, type = "success") {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336";

    snackbar.className = "show";

    setTimeout(() => {
        snackbar.className = "hide";
        window.location.href = '../login/index.html'
        setTimeout(() => {
            snackbar.className = "";
        }, 500);
    }, 3000);
}

const register = async () => {
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPass = document.getElementById('confirmPass').value
    const profileImage = document.getElementById('profileImage').files[0]

    document.getElementById('firstNameError').textContent = '';
    document.getElementById('lastNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPassError').textContent = '';

    let isValid = true;
    if (!firstname) {
        document.getElementById('firstNameError').textContent = 'First Name is required.';
        isValid = false;
    }

    if (!lastname) {
        document.getElementById('lastNameError').textContent = 'Last Name is required.';
        isValid = false;
    }

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

    if (!confirmPass) {
        document.getElementById('confirmPassError').textContent = 'confirmPass is required.';
        isValid = false;
    } else if (password !== confirmPass) {
        document.getElementById('confirmPassError').textContent = "password does'nt match";
        isValid = false;
    } else if (confirmPass.length < 10) {
        document.getElementById('passwordError').textContent = 'confirm Password must be at least 10 characters';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const formData = new FormData()

    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('confirmPass', confirmPass)
    formData.append('profileImage', profileImage)

    const res = await fetch(`${baseUrl}/v1/api/auth/register`, {
        method: 'POST',
        body: formData
    })

    const data = await res.json()
    if (res.ok) {
        showSnackbar(data.message, "success");
        document.getElementById('firstname').value = ''
        document.getElementById('lastname').value = ''
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        document.getElementById('confirmPass').value = ''
        document.getElementById('profileImage').value = '';
        
    } else {
        showSnackbar(data.error, "error");


    }
}


