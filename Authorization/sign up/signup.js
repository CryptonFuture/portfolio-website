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

    const res = await fetch(`${baseUrl}/v1/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
            confirmPass

        })
    })

    const data = await res.json()
    if (res.ok) {
        showSnackbar(data.message, "success");
        document.getElementById('firstname').value = ''
        document.getElementById('lastname').value = ''
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        document.getElementById('confirmPass').value = ''
        
    } else {
        showSnackbar(data.error, "error");


    }
}


