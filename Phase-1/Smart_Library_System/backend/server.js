import express from 'express'

const app = express();

app.get('/',(req,res) => {
    res.send('<p>Welcome to server</p>')
})

app.listen(3000,() => console.log('Server started at Port:3000'))
