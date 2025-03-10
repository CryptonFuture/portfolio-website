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
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const isVisible = dropdownContent.style.display === 'block';

    document.querySelectorAll('.dropdown-content').forEach(content => {
        content.style.display = 'none';
    });

    if (!isVisible) {
        dropdownContent.style.display = 'block';
    }
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
        localStorage.removeItem('refreshToken');
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

// SIDEBAR ROUTES
const sidebar = async () => {
    const role = localStorage.getItem('role')

    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        const allowedRoles = link.dataset.role.split(' ');
        if (!allowedRoles.includes(role)) {
            link.style.display = 'none';
        }
    });

}

window.addEventListener('DOMContentLoaded', sidebar)

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        logout();
        return null;
    }

    try {
        const res = await fetch(`${baseUrl}/v1/api/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('accessToken', data.accessToken);
            return data.accessToken;
        } else {
            logout();
            return null;
        }
    } catch (error) {
        console.error("Error refreshing token", error);
        logout();
        return null;
    }
};

const fetchWithAuth = async (url, options = {}) => {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        logout();
        return null;
    }

    if (!options.headers) {
        options.headers = {};
    }

    options.headers['Authorization'] = `Bearer ${accessToken}`;

    let res = await fetch(url, options);

    if (res.status === 401) {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) return null;

        options.headers['Authorization'] = `Bearer ${newAccessToken}`;
        res = await fetch(url, options);
    }

    return res.json();
};




