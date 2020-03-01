const form = document.querySelector('form')
const textInput = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

const getForcast = (location) => {
    fetch("http://localhost:3000/weather?address=" + location).then(res => {
      res.json().then(data => {
        if (data.error) {
          return message1.textContent = data.error
        }
        message1.textContent = data.location
        message2.textContent = data.forcast
      });
    });
}

form.addEventListener('submit', (e)=> {
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent = ''
    getForcast(textInput.value.trim())
})