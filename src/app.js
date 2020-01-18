const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define path for Express config 
const publicdirectorypath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view location 
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicdirectorypath))


app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        name:'Amar chourasia'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About me',
        name:'Amar chourasia'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helptext:'This is some helpful text',
        title:'Help',
        name:'Amar chourasia'
    })
})


app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
           
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastdata) =>{
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })

})

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
         products:[]
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Amar chourasia',
        errormessage:'Help article not found.'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Amar chourasia',
        errormessage:'Page not found.'
    })
})

app.listen(3000,() => {
 
    console.log('server is up on port 3000.')

})
