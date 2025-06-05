import {useParams, useLoaderData } from 'react-router-dom';
//gets value so we can use as prop
import sessions from '../sample-sessions';

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
        </>
    );
}