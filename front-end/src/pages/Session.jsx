import {useParams, useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//gets value so we can use as prop
import sessions from '../sample-sessions';
import axios from 'axios';
import CommentsList from './CommentsList';

export default function Session() {
    const params = useParams();
    const date = params.date;
    const navigate = useNavigate();

    //set initial, so we can keep changing state
    const { upvotes : initialUpvotes, comments } = useLoaderData();
    const [upvotes, setUpvotes] = useState(initialUpvotes);

    const session = sessions.find(s => s.date == date);

    async function onUpvoteClicked(){
        const response = await axios.post('/api/history/' + date + '/upvote');
        const updatedSessionData = response.data;
        setUpvotes(updatedSessionData.upvotes);
    }

    async function onDeleteClicked(){
        const response = await axios.delete('/api/history/' + date + '/delete');
        const deletedSessionData = response.data;
        alert('Session deleted successfully!');
        navigate('/')

    }

    return(
        <>
        <h1>Session from {date}</h1>
        <button onClick={onUpvoteClicked}>Upvote</button>
        <button onClick={onDeleteClicked}>Delete</button>
        <p><strong>Piece Practiced:</strong> {session.pieces} </p>
        <p><strong>Duration:</strong> {session.durationMinutes} minutes </p>
        <p><strong>Notes:</strong> {session.notes} </p>
        <></>
        <p>This article has { upvotes } upvotes!</p>
        <CommentsList comments = {comments}></CommentsList>
        </>
    );
}

//how the session is getting its data!!
export async function loader({ params }) {
        const response = await axios.get('/api/history/' + params.date);
        const { upvotes, comments } = response.data;
        return { upvotes, comments };
      }