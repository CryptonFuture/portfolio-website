const baseUrl = 'http://localhost:8000'

const accessToken = localStorage.getItem('accessToken')

if (!accessToken) {
    window.location.href = '../Authorization/login/index.html';
}

function showSnackbar(message, type = "success") {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336";

    snackbar.className = "show";

    setTimeout(() => {
        snackbar.className = "hide";
        window.location.href = '../Authorization/login/index.html'
        setTimeout(() => {
            snackbar.className = "";

        }, 500);
    }, 3000);

}

// USERNAME AND PROFILE IMAGE FETCH
const firstname = localStorage.getItem('firstname')
const lastname = localStorage.getItem('lastname')
const profileImage = localStorage.getItem('profileImage')

const backendUrl = 'https://your-backend-url.com';
const defaultProfileImage = '../assets/user1.png'

const fullname = firstname && lastname ? `${firstname} ${lastname}` : 'User'

document.getElementById('fullname').textContent = fullname

const profileImageUrl = profileImage
    ? profileImage.startsWith('http')
        ? profileImage
        : `${profileImage}`
    : defaultProfileImage;

const profileImageElement = document.getElementById('profileImage')
profileImageElement.src = profileImageUrl
profileImageElement.alt = `${fullname}'s Profile Image`

// DROPDOWN
function showDropdown(dropdown) {
    document.querySelectorAll('.dropdown-content').forEach(content => {
        content.style.display = 'none';
    });

    const dropdownContent = dropdown.querySelector('.dropdown-content');
    dropdownContent.style.display = 'block';
}

document.onclick = function (event) {
    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.style.display = 'none';
        });
    }
};

// LOGOUT
const logout = async () => {
    const userId = localStorage.getItem('userId')

    const res = await fetch(`${baseUrl}/v1/api/auth/logout?userId=${userId}`, {
        method: 'POST',
    })

    const data = await res.json()

    if (res.ok) {
        showSnackbar(data.message, "success");

        localStorage.removeItem('accessToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('firstname')
        localStorage.removeItem('lastname')
        localStorage.removeItem('email')
        localStorage.removeItem('password')
        localStorage.removeItem('profileImage')
        localStorage.removeItem('rememberMe')


    } else {
        showSnackbar(data.error, "error");
    }

}


