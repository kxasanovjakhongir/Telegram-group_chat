const usernameInput= document.querySelector('#usernameInput')
const passwordInput= document.querySelector('#passwordInput')
const registrationForm= document.querySelector('.site-form')
const uploadInput= document.querySelector('#uploadInput')
const showButton = document.querySelector('#showButton')
const emailInput= document.querySelector('#emailInput')
const fileName= document.querySelector('.file-name')
const title= document.querySelector('.title')


let data = window.localStorage.getItem('response')
if (data) data = JSON.parse(data)
else data = []
if (data.token) window.location = '/'


uploadInput.addEventListener('change', () => {
    let file = uploadInput.files[0].name
    file = file.length > 25 ? file.slice(0, 20) + '...' + file.slice(file.length - 3, file.length) : file
    fileName.textContent = file
})

showButton.onclick = () => {  
    if (showButton.classList.contains('zmdi-eye')) {
        showButton.classList.remove('zmdi-eye')
        showButton.classList.add('zmdi-eye-off')
        passwordInput.type = 'text'
    } else {
        showButton.classList.remove('zmdi-eye-off')
        showButton.classList.add('zmdi-eye')
        passwordInput.type = 'password'
    }
}

registrationForm.onsubmit = async (event) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('username', usernameInput.value)
    formData.append('password', passwordInput.value)
    formData.append('email', emailInput.value)
    formData.append('file', uploadInput.files[0])
    let response = await fetch('/register', {
        method: 'POST',
        body: formData
    })
    response = await response.json()
    if (response.token) {
        title.textContent = response.message
        window.localStorage.setItem('response', JSON.stringify(response))
        setTimeout(() => {
            window.location = '/'
        }, 1500)
    }
}

