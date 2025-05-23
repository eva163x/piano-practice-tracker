import express from 'express';

const app = express();

app.use(express.json());
//create an endpoint

//get request
app.get('/hello', function(req, res) { //function has 2 args: request & response
    res.send('Hello from a GET endpoint!'); //saying send Hello! as response
})

//post request
app.post('/hello', function(req, res){
    res.send('Hello,' + req.body.name + ' from a POST endpoint!');
})

//starting server
//8000 --> port number we want app to listen on 
app.listen(8000, function(){
    console.log('Server is listening on port 8000');
})