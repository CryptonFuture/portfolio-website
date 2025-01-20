const firstname = localStorage.getItem('firstname')
const lastname = localStorage.getItem('lastname')
const profileImage = localStorage.getItem('profileImage')

const defaultProfileImage = '../assets/user1.png'

const fullname = firstname && lastname ? `${firstname} ${lastname}` : 'User'

document.getElementById('fullname').textContent = fullname

const profileImageElement = document.getElementById('profileImage')
profileImageElement.src = profileImage || defaultProfileImage
profileImageElement.alt = `${fullname}' s Profile Image`