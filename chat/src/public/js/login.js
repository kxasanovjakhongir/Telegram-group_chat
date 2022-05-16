const usernameInput= document.querySelector('#usernameInput')
const passwordInput= document.querySelector('#passwordInput')
const registrationForm= document.querySelector('.site-form')
const showButton=document.querySelector('#showButton')
const title = document.querySelector('.title')


let token = window.localStorage.getItem('token')
let data = window.localStorage.getItem('response')
if (data) data = JSON.parse(data)
else data = []
if (data.token) window.location = '/'

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
    let response = await request('/login', 'POST', {
        username: usernameInput.value,
        password: passwordInput.value
    })
    if (response.token) {
        title.textContent = response.message
        window.localStorage.setItem('response', JSON.stringify(response))
        setTimeout(() => {
            window.location = '/'
        }, 1500)
    } else {
        title.textContent = response.message
    }
}

