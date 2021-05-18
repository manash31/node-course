const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')



const app = express()
const port = process.env.PORT || 3000


const partialsdirectoryPath = path.join(__dirname,'../template/partials')
hbs.registerPartials(partialsdirectoryPath)


//Set up handle bars and view path 
const viewsdirectoryPath = path.join(__dirname,'../template/views')
app.set('view engine','hbs')
app.set('views',viewsdirectoryPath)


//Set up static directory
const publicdirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicdirectoryPath))

//console.log(__dirname)
//console.log(__filename)

app.get('/',(req,res)=> {
    res.render('index',{
        title:'Weather App',
        name:'Manash'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title:'about App',
        name:'Manash'
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        helptext:'This is help page from hbs',
        title:'about App',
        name:'Manash'
    })
})
app.get('/help/*',(req,res)=> {
    res.render('404',{
        title:'Help Page Not Found',
        name:'Manash',
        errorMessage:'Help Article not found'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
    
        return res.send({
            error:'Please provide address to search for Weather condition.'
        })
 
    }
    const address = req.query.address
   
    geocode(address, (error, data) => {
        if (error) {
            return res.send(error)
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }

            res.send({
                forecast:forecastData,
                location:data.location,
                address:req.query.address
            })
        })
    })

    /******************************************************** */
})

app.get('/products', (req,res)=> {
    if(!req.query.search) {
        return  res.send({
            ErrorMsg: 'You must provide Search  term'
        })
    }
     //console.log(req.query.search)
    res.send(
        {
            products:[]
        }
    )
})

app.get('/*',(req,res)=> {
    res.render('404',{
        title:'Global Page Not Found',
        name:'Manash',
        errorMessage:'Page not found'
    })
})
app.listen(port,()=> {
    console.log('Server is up on port '+port)
})