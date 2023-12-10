const alinSelector = document.querySelector('#alin-selector')
const deriSelector = document.querySelector('#deri-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInput = document.querySelector('.chat-input')
const chatInputForm = document.querySelector('.chat-input-form')
const clearChat = document.querySelector('.clear-chat-button')

const messages = []

const createChatMessageElement = (message) => 
(
    `<div class="message ${message.sender === 'Alin' ? 'blue-bg' : 'gray-bg'}">
      <div class="message-sender">${message.sender}</div>
      <div class="message-text">${message.text}</div>
      <div class="message-timestamp">${message.timestamp}</div>
    </div>`
);

let messageSender = 'Alin'
const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.textContent = `${messageSender} chatting..` 
    chatInput.placeholder  = `Type here, ${messageSender}`

    if (name === 'Alin') {
        alinSelector.classList.add('active-person')
        deriSelector.classList.remove('active-person')
        
    }

    if (name === 'Deri') {
        alinSelector.classList.remove('active-person')
        deriSelector.classList.add('active-person')
    }

    chatInput.focus()
}

alinSelector.onclick = () => updateMessageSender('Alin')
deriSelector.onclick = () => updateMessageSender('Deri')

const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleDateString('ro-EU', {hour:'numeric', minute:"numeric", hour24: true})
    const message = {
        sender : messageSender,
        text: chatInput.value,
        timestamp,
    }

    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))

    chatMessages.innerHTML += createChatMessageElement(message)
    chatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChat.onclick = () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
}