import sessions from '../sample-sessions';
import axios from 'axios';
import { use } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function History() {


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