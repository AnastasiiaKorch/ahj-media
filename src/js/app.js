import checkLocation from './checkLocation.js'

function getDate() {
  const itemDate = new Date();
  const date = formatDate(itemDate.getDate());
  const month = formatDate(itemDate.getMonth() + 1);
  const year = formatDate(itemDate.getFullYear());
  const hours = formatDate(itemDate.getHours());
  const min = formatDate(itemDate.getMinutes());

  const dateSet = `${date}.${month}.${year} ${hours}:${min}`;

  return dateSet;
}

function formatDate(value){
  const returnValue = value < 10 ? `0${value}` : value;

  return returnValue;
}

function getGeo() {
  let location = '';
  const message = 'none';

  if (navigator.geolocation) {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        location = `${latitude}, ${longitude}`;
        resolve(location);
      }, (error) => {
        const message = 'none';
        console.log(error);
        resolve(message);
      });
    });
  }

  return message;
}

class Messenger {
  constructor() {
    this.messages = document.querySelector('.messenger');
    this.coords = null;
  }

  async newMessage(text) {
    this.coords = await getGeo();

    if (this.coords === 'none') {
      const modalError = document.querySelector('.modal');

      if (!modalError) {
        const modal = createModal();

        document.body.appendChild(modal);

        const ok = modal.querySelector('.modal-ok');
        const cancel = modal.querySelector('.modal-cancel');
        const input = modal.querySelector('.modal-input');

        ok.addEventListener('click', () => {
          const valid = checkLocation(input.value);

          if (valid) {
            this.coords = input.value;
            this.addMessage(text, this.coords);
            modal.parentNode.removeChild(modal);
          } else {
            alert('Введите корректные координаты');
          }
        });

        cancel.addEventListener('click', () => {
          modal.parentNode.removeChild(modal);
        });
      }
    } else {
      this.addMessage(text, this.coords);
    }
  }

  addMessage(text, geoPosition) {
    const message = document.createElement('div');

    message.className = 'message';
    message.innerHTML = `<div class='message-item'>
        <p class="message-text">${text}</p>
        <div class="message-coordinates">${geoPosition}</div>
        </div>
        <div class="message-date">${getDate()}</div>`;

    this.messages.insertAdjacentElement('afterbegin', message);
  }

}

function createModal() {
  const modal = document.createElement('div');

  modal.className = 'modal';
  modal.innerHTML = `<h3 class="modal-header">Oops...something went wrong:(</h3>
    <p class="modal-message">Please give permission to use your geolocation, or enter the coordinates manually.</p>
    <p class="modal-message">Latitude and longitude separated by commas please</p>
    <input type"text" class="modal-input" placeholder="Separated by commas please..">
    <div class="modal-buttons">
      <button class="modal-ok button" type="button">Ok</button>
      <button class="modal-cancel button" type="button">Cancel</button>
    </div>`;
  return modal;
}

const messenger = new Messenger();
const inputMessage = document.querySelector('.input-content');
let text = null;

inputMessage.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    text = inputMessage.value;
    messenger.newMessage(text);
    inputMessage.value = '';
  }
})
