import { Link } from 'react-router-dom';
import '../css_files/Header.css';
import {ReactComponent as AccountIcon} from '../svg/account.svg'

export default function Header() {
    return (
        <header>
            <Link to="" className='logo'>SOFRODIS</Link>
                
            <nav>
                <Link to="/">home</Link>
                <Link to="/services">services</Link>
                <Link to="/products">products</Link>
                <Link to="/orders">orders</Link>
            </nav>
            <Link to="/users/show" className="account">
                <AccountIcon width='25' height="25" fill='white'/>
            </Link>
        </header>
    )
}