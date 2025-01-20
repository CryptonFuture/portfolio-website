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

