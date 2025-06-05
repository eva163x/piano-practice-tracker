import {useParams, useLoaderData } from 'react-router-dom';
//gets value so we can use as prop
import sessions from '../sample-sessions';
import axios from 'axios';
import CommentsList from './CommentsList';

export default function Session() {
    const params = useParams();
    const date = params.date;
    const { upvotes, comments } = useLoaderData();

    const session = sessions.find(s => s.date == date);

    return(
        <>
        <h1>Session from {date}</h1>
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