import {Link} from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
    return(
        <nav>
            <ul>
                <li>
                    <Link to='/'> Home </Link>
                </li>
                <li>
                    <Link to='/history'>History</Link>
                </li>
                <li>
                    <Link to='/newsession'> New Session </Link>
                </li>
            </ul>
        </nav>
    )
}