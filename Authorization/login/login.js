const baseUrl = 'http://localhost:8000'

const login = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const response = await fetch(`${baseUrl}/v1/api/auth/login`, {
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

    const result = response.json()
    if (response.ok) {
        alert("logged In successful!");
        window.location.href = '../../index.html'
    } else {
        console.log(result.message);
    }
}


