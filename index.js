const baseUrl = 'http://localhost:8000'

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

const addContact = async () => {
    const name = document.getElementById('name').value
    const contact_no = document.getElementById('contact_no').value
    const email = document.getElementById('email').value
    const subject = document.getElementById('subject').value

    const res = await fetch(`${baseUrl}/v1/api/contact/contactUs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            name,
            contact_no,
            email,
            subject
        })
    })

    const data = await res.json()

    if (res.ok) {
        showSnackbar(data.message, "success");
        document.getElementById('name').value = ''
        document.getElementById('contact_no').value = ''
        document.getElementById('email').value = ''
        document.getElementById('subject').value = ''
    } else {
        showSnackbar(data.error, "error");
    }
}