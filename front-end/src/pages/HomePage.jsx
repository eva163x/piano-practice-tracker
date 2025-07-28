import {useNavigate} from 'react-router-dom';
import axios from 'axios';
export default function HomePage() {

    const navigate = useNavigate();

    // navigates to /history/2025-07-27/edit
    async function newSessionClicked() {
        const response = await axios.post('/api/newsession');
        const newSessionData= response.data
        navigate('newsession/edit');

    }
    return(
        <>
        <h1>This is my homepage</h1>
        <button onClick={newSessionClicked}>New Session</button>
        </>

    );
}