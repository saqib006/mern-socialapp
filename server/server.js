import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'


mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)
mongoose.connection.on('error', ()=>{
    throw new Error(`unable to connect to database ${config.mongoUri}`)
})



app.listen(config.port, (err)=>{
    if(err){
        console.log('error listening',err)
    }
    console.info('Server running on port', config.port)
})