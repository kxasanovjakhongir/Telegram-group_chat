const uploadedFiles   = document.querySelector('.uploaded-file')
const profileAvatar = document.querySelector('.profile-avatar')
const profileName= document.querySelector('.profile-name')
const chatsList= document.querySelector('.chats-list')
const textInput= document.querySelector('#textInput')
const uploadInput= document.querySelector('#uploads')
const chatMain= document.querySelector('.chat-main')
const form= document.querySelector('.chat-footer')

let token = window.localStorage.getItem('token')
let data = window.localStorage.getItem('response')
if (data) data = JSON.parse(data)
else data = []

if (!data.token) window.location = '/login'


let currentUserId = data.body.user_id

profileAvatar.src = `images/${data.body.avatar_link}`
profileName.textContent = data.body.username

async function groupMembersRender() {
    let data = await request('/users', 'GET')
    let string = ""
    data.map(user => {
        string += `
            <li class="chats-item">
                <img src=${'images/' + user.avatar_link} alt="profile-picture" />
                <p>${user.username}</p>
            </li>
        `
    })
    chatsList.innerHTML = string
    const allAvatars = document.querySelectorAll('.chats-item span')
    allAvatars.forEach((avatar, index) => {
    })
    messagesRenderer(currentUserId, data)
}
async function messagesRenderer(id, users) {
    let data = await request('/messages', 'GET')
    let string = ""
    let str = ""
    data.map(message => {
        if (message.message) {
            let currentUser = users.find(user => user.user_id == message.user_id)
            string += `
                <div class="msg-wrapper ${(message.user_id == id) ? "msg-from" : ""}">
                    <img src=${'images/' + currentUser.avatar_link} alt="profile-picture" />
                    <div class="msg-text">
                        <p class="msg-author">${currentUser.username}</p>
                        <p class="msg">${message.message}</p>
                        <p class="time">${message.time}</p>
                    </div>
                </div>
            `
        } else {
            let currentUser = users.find(user => user.user_id == message.user_id)
            string += `
                <div class="msg-wrapper ${(message.user_id == id) ? "msg-from" : ""}">
                    <img src=${'images/' + currentUser.avatar_link} alt="profile-picture" />
                    <div class="msg-text">
                        <p class="msg-author">${currentUser.username}</p>
                        <object data=${'files/' + message.file_link} class="msg object-class"></object>
                        <a href="/downloads?fileName=${message.file_link}">
                            <img src="./img/download.png" width="25px" />
                        </a>
                        <p class="time">${message.time}</p>
                    </div>
                </div>
            `
            str += `
                <li class="uploaded-file-item">
                    <a href="${'files/' + message.file_link}">
                        <img src="./img/file.png" alt="file" width="30px">
                        <p>${message.file_link.length > 25 ? message.file_link.slice(5, 25) + '...' +  message.file_link.slice(message.file_link.length - 5, message.file_link.length) : message.file_link.slice(5, message.file_link.length)}</p>
                    </a>
                </li>
            `
        }
    })
    chatMain.innerHTML = string
    uploadedFiles.innerHTML = str
}
groupMembersRender()

form.onsubmit = async (event) => {
    event.preventDefault()
    let date = new Date()
    let time = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getHours() < 12 ? 'AM' : 'PM'}`
    let response = await request('/', 'POST', {
        user_id: currentUserId,
        message: textInput.value,
        time
    })
    textInput.value = null
    groupMembersRender()
}

uploadInput.onchange = async (event) => {
    event.preventDefault()
    let date = new Date()
    let time = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getHours() < 12 ? 'AM' : 'PM'}`
    let formData = new FormData()
    formData.append('user_id', currentUserId)
    formData.append('time', time)
    formData.append('file', uploadInput.files[0])
    let response = await fetch('/', {
        method: 'POST',
        body: formData
    })
    response = await response.json()
    console.log(response);
    groupMembersRender()
}
