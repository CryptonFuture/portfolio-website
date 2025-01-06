const baseUrl = 'http://localhost:8000'
const secretKey = "0192384756";

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
      if(rememberMe) {
          const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
          localStorage.setItem('email', data.data.email)
          localStorage.setItem('password', encryptedPassword)
          localStorage.setItem('rememberMe', 'true')

      } else {
          localStorage.removeItem('email')
          localStorage.removeItem('password')
          localStorage.removeItem('rememberMe')
      }
    
    } else {
        showSnackbar(data.error, "error");
    }
}




