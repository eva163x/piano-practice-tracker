import sessions from '../sample-sessions';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function EditSession() {

    const { date } = useParams();
    const navigate = useNavigate();
    const [newDate, setNewDate] = useState(date);

    async function updateSessionClicked(){
        const response = await axios.post('/api/history/' + date + '/edit')

    }

    return(
        <>
        <h1>Edit Session</h1>
        <button onClick={updateSessionClicked}>Done</button>
        </>
    );
}