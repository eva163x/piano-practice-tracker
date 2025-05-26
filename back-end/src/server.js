import express from 'express';

const sessionInfo = [
    {date: '2025-04-20', upvotes: 0, feedback: []},
    {date: "2025-04-21", upvotes: 0, feedback: [] },
    {date: "2025-04-22", upvotes: 0, feedback: [] }
]

const app = express();

app.use(express.json());
//create an endpoint

//we start all back-end endpoint reqs w api/

//https://xcv1vf96-8000.use2.devtunnels.ms/api/history/2025-04-20/upvote
app.post("/api/history/:date/upvote", function(req, res){
    const mysession = sessionInfo.find(a => a.date == req.params.date);
    mysession.upvotes += 1

    res.json(mysession);
})

//what should request body look like?
app.post("/api/history/:date/feedback", function(req, res){
    //get stuff from request URL
    const {date} = req.params;
    const {postedBy, text} = req.body;

    //find specific session in database
    const mysession = sessionInfo.find(a => a.date == date);

    //push it to our database
    mysession.feedback.push({
        postedBy,
        text
    });

    //send back our updated 'session' info as response body
    res.json(mysession);
})

//starting server
//8000 --> port number we want app to listen on 
app.listen(8000, function(){
    console.log('Server is listening on port 8000');
})