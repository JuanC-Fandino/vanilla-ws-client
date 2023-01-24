import { Manager, Socket } from 'socket.io-client'

export const connectToServer = (token:string) => {
    // localhost:3000/socket.io/socket.io.js
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            authentication: token
        }
    })
    // nsp = namespace
    // '/' es el default/root namespace
    const socket = manager.socket('/')
    addListeners(socket)
    console.log(socket)
}

export const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status')!
    const clientsContainer = document.querySelector('#clients-id')!
    const messageForm =
        document.querySelector<HTMLFormElement>('#message-form')!
    const messageField =
        document.querySelector<HTMLInputElement>('#message-input')!
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!

    // Escuchar eventos del servidor
    socket.on('connect', () => {
        console.log('connected')
        serverStatusLabel.innerHTML = 'Online'
    })
    socket.on('disconnect', () => {
        // serverStatusLabel.innerHTML = 'Offline'
        serverStatusLabel.innerHTML = socket.disconnected ? 'Disconnected' : 'Online'
        console.log('disconnected')
    })

    socket.on('nombreEvento', (clients: string[]) => {
        console.log(clients)
        clientsContainer.innerHTML = ''
        clients.forEach((client) => {
            clientsContainer.innerHTML += `<li>${client}</li>`
        })
    })

    socket.on(
        'message-from-server',
        (payload: { fullName: string; message: string }) => {
            const newMessage = `
                <li>
                    <strong>${payload.fullName}</strong>
                    <span>${payload.message}</span>
                </li>`
            messagesUl.innerHTML += newMessage
        }
    )

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault()
        if (messageField.value.trim().length <= 0) return
        socket.emit('message-from-client', {
            id: socket.id,
            message: messageField.value,
        })
        // console.log({id: socket.id, message: messageField.value})

        messageField.value = ''
    })
}
