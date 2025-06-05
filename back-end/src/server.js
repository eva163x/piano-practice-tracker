import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

//IN MEMORY DATABASE FOR API TESTING

// const sessionInfo = [
//     {date: '2025-04-20', upvotes: 0, feedback: []},
//     {date: "2025-04-21", upvotes: 0, feedback: [] },
//     {date: "2025-04-22", upvotes: 0, feedback: [] }
// ]

const app = express();

app.use(express.json());

//store as global constant in server
let db;

//create a new function to connect to MongoDB
//async cause 'await'
async function connectToDB() {
    //create a new instance of MongoClient so we can connect to it
    const uri = 'mongodb://127.0.0.1:27017';

    //basic default setup stuff
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    });

    await client.connect()

    db = client.db('full-stack-react-db');
}

app.get("/api/history/:date", async (req, res) => {
    const { date } = req.params;
    const mysession = await db.collection('sessions').findOne({ date });
    res.json(mysession);

})
//create an endpoint

//we start all back-end endpoint reqs w api/

//https://xcv1vf96-8000.use2.devtunnels.ms/api/history/2025-04-20/upvote
//http://localhost:8000/api/history/2025-04-21/upvote
app.post("/api/history/:date/upvote", async function(req, res){

    const { date } = req.params;

    const updatedSession = await db.collection('sessions').findOneAndUpdate({ date }, {
        $inc: {upvtoes: 1}}, {
            //wanna return AFTER updation
            returnDocument: "after"
        }
    );

    res.json(updatedSession)

    // BEFORE DATABASE INTEGRATION!!!
    // const mysession = sessionInfo.find(a => a.date == req.params.date);
    // mysession.upvotes += 1;

    // res.json(mysession);
});

//what should request body look like?
app.post("/api/history/:date/feedback", async function(req, res){
    //get stuff from request URL
    const {date} = req.params;
    const {postedBy, text} = req.body;
    const newComment = {postedBy, text}

    //find specific session in database
    const updatedSession = await db.collection('sessions').findOneAndUpdate({ date },
        {$push: { comments: newComment }},
        {returnDocument: "after"}
    )

    //BEFORE DATABASE!! push it to our database
    // mysession.feedback.push({
    //     postedBy,
    //     text
    // });

    //send back our updated 'session' info as response body
    res.json(updatedSession);
})

//connects to database + starts server at same time
async function start() {
    await connectToDB();
    //starting server
    //8000 --> port number we want app to listen on 
    app.listen(8000, function(){
        console.log('Server is listening on port 8000');
    })
}

start();
    