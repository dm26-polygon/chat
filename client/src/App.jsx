import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import './app.css'

import socket from './components/Socket'

const App = () => {

  const element = <FontAwesomeIcon icon={faPaperPlane} />

  const [userNameDB, setUserNameDB] = useState('Anonymous')

  useEffect(() => {

    let messages = document.getElementById('chat');

    socket.on('actions', function (msg) {
      console.log(msg)
      let item = document.createElement('div');

      if (msg.type === 'question') {

        item.innerHTML = `
        <div class="card__question me-2 " key={i}>
          <div class="card__header text-white">
              <span>${msg.user}</span>  <span hidden>{new Date().getHours() + ":" + new Date().getMinutes()}</span>
          </div>
          <div class="card__body">
                ${msg.message}
          </div>
       </div>`

      }
      else if (msg.type === 'comment') {

        item.innerHTML = `
        <div class="card me-2 " key={i}>
          <div class="card__header">
            <span>${msg.user}</span>  <span hidden>{new Date().getHours() + ":" + new Date().getMinutes()}</span>
          </div>
          <div class="card__body">
            ${msg.message}
          </div>
      </div>`

      }

      messages.appendChild(item);
      messages.scrollTop = messages.scrollHeight;

    });

  }, [])

  const sendMessage = (e) => {

    e.preventDefault()

    const chatBox = document.querySelector('#chat');
    const userNameForm = userNameDB
    const messageForm = document.getElementById("messageForm")

    const message = {
      user: userNameForm,
      message: messageForm.value,
    };

    socket.emit("actions", message);

    messageForm.value = "";
    messageForm.focus()

    chatBox.scrollTop = chatBox.scrollHeight;

  }

  const changeUser = (e) => setUserNameDB(e.target.value)

  return (
    <div>

      <h2 className="text-center text-info mt-5" >CHAT</h2>
      <br />
      <br />

      <div className="container-fluid">

        <div className="row">
          <div className="col-6 container-video">

            <div className="row">
              <div className="col-5">

                <label htmlFor="" className="text-secondary">Usuario DB</label>
                <input type="text" className="form-control mt-1" placeholder="Ingresar usuario" value={userNameDB} onChange={changeUser} autoComplete="off" />

                <button className="btn btn-info" hidden type="submit">Guardar</button>

              </div>
            </div>

          </div>

          <div className="col-6 " >


            <div className="container-chat" >

              <div className="container-messsages" id="chat">
                <div id="messages">
                  {/* AQUI SE RENDERIZAN LOS MENSAJES */}
                </div>
              </div>

              <hr />

              <form onSubmit={sendMessage}>

                <div className="container-message">

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" id="messageForm" placeholder="Escribe tu comentario" aria-label="Recipient's username" aria-describedby="button-addon2" autoComplete="off" />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={sendMessage}>{element}</button>
                  </div>

                  <button className="btn btn-primary" type="submit" hidden>Enviar</button>
                  <small className="text-secondary">* Recuerda el signo de interrogación " ? " si vas a preguntar. </small>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  )

}

export default App
