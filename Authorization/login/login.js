const baseUrl = 'http://localhost:8000'

function showSnackbar(message, type = "success") {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336";

    snackbar.className = "show";

    setTimeout(() => {
        snackbar.className = "hide";
        window.location.href = '../../index.html'
        setTimeout(() => {
            snackbar.className = "";
        }, 500);
    }, 3000);
}


const login = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

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
        localStorage.setItem('email', data.data.email)
        localStorage.setItem('password', data.data.password)
    
    } else {
        showSnackbar(data.error, "error");
    }
}


