import sessions from '../sample-sessions';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function EditSession() {

    const params = useParams();
    const date = params.date
    const navigate = useNavigate();
    const [newDate, setDate] = useState(date);

    async function editSessionClicked(){
        const response = await axios.put('/api/newsession/' + date + '/edit', {newDate});
        alert("Session successfully updated!");
        console.log("response.data =", response.data); //test server api
        navigate("/");

    }

    async function cancelClicked(){
        navigate("/");
    }

    return(
        <>
        <h1>Edit Session</h1>
        <form>
            <label for="date">Date </label>
            <input type="date" 
            id="date"
            value={newDate}
            onChange={(e) => setDate(e.target.value)}
            /><br />
        </form>
        <button onClick={editSessionClicked}>Done</button>
        <button onClick={cancelClicked}>Cancel</button>
        </>
    );
}