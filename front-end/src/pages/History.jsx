//import sessions from '../sample-sessions';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function History() {

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        async function fetchSessions(){
            const response = await axios.get('/api/history');
            setSessions(response.data);
        }

        fetchSessions();
    }, []);

    return(
        //react fragments are used so there is not just 1 top level element
        <>
        <h1>History</h1>
        {sessions.map(s => (
            <Link key={s.date} to={'/history/' + s.date}>
                <h3>{s.date}</h3>
            </Link>
        ))}
        </>

    );
}