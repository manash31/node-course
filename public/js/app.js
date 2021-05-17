console.log('clinet side JS file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=> {
e.preventDefault()    

messageOne.textContent = 'Loading...'
messageTwo.textContent = ''

    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=> {
        response.json().then((data)=> {
        if(data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }
        else  
           {
               messageTwo.textContent = data.location+'\n'+data.forecast
               messageOne.textContent = ''
               console.log(data.location)
               console.log(data.forecast)
           }
    })
})
})