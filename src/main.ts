import './style.css'
import { connectToServer } from './socket-client'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>
    <div style='border: #1a1a1a solid 1px; padding: 10px; margin: 10px 0'>
        <strong>Server status:</strong>
        <span id='server-status'>Offline</span>
    </div>
    <div style='border: #1a1a1a solid 1px; padding: 10px; margin: 10px 0'>
        <input type='text' id='jwt' placeholder='JWT' />
        <button id='connect'>Connect</button>
    </div>
    <div style='border: #1a1a1a solid 1px; padding: 10px; margin: 10px 0' id='#clients'>   
        <strong>Connected clients:</strong>
        <ul id='clients-id'></ul>
    </div>
    <hr>
    <div style='display: flex; flex-direction: column; align-items: center;'>
        <form id='message-form' style='width: max-content'>
        <input style='padding: 10px 20px; margin: 10px 0;' id='message-input' type='text' placeholder='Type your message' />
        <button style='padding: 10px 20px; margin: 10px 0' type='submit'>Send</button>
        </form>
    </div>
    <hr>
    <h3>Messages</h3>
    <ul id='messages-ul'></ul>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
const inputJwt = document.querySelector<HTMLInputElement>('#jwt')!
const connectButton = document.querySelector<HTMLButtonElement>('#connect')!

connectButton.addEventListener('click', () => {
    if (inputJwt.value.trim().length <= 0) {
        return alert('Enter a valid JWT')
    }
    connectToServer(inputJwt.value.trim());
})
