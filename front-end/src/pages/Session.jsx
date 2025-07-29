import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentsList from './CommentsList';

export default function Session() {
    const params = useParams();
    const date = params.date;
    const navigate = useNavigate();

    const [session, setSession] = useState(null);
    const [upvotes, setUpvotes] = useState(0);

    useEffect(() => {
        async function fetchSession() {
            const response = await axios.get('/api/history/' + date);
            setSession(response.data);
            setUpvotes(response.data.upvotes);
        }
        fetchSession();
    }, [date]);

    async function onUpvoteClicked() {
        const response = await axios.post('/api/history/' + date + '/upvote');
        setUpvotes(response.data.upvotes);
    }

    async function onDeleteClicked() {
        await axios.delete('/api/history/' + date + '/delete');
        alert('Session deleted successfully!');
        navigate('/');
    }

    if (!session) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Session from {session.date}</h1>
            <button onClick={onUpvoteClicked}>Upvote</button>
            <button onClick={onDeleteClicked}>Delete</button>
            <p><strong>Piece Practiced:</strong> placeholder</p>
            <p><strong>Duration:</strong> placeholder</p>
            <p><strong>Notes:</strong> placeholder</p>
            <p>This session has {upvotes} upvotes!</p>
            <CommentsList comments={session.comments || []} />
        </>
    );
}