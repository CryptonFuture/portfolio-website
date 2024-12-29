const baseUrl = 'http://localhost:8000'

const register = async () => {
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPass = document.getElementById('confirmPass').value

    const response = await fetch(`${baseUrl}/v1/api/auth/register`, {
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

    const result = response.json()
    if (response.ok) {
        alert("create register successful!");
        document.getElementById('firstname').value = ''
        document.getElementById('lastname').value = ''
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        document.getElementById('confirmPass').value = ''
        window.location.href = '../login/index.html'
    } else {
        console.log(response.message);

    }
}


