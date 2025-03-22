import { Link } from 'react-router-dom';
import '../css_files/Header.css';
import { ReactComponent as AccountIcon } from '../svg/account.svg'
import { useContext } from 'react';
import { AppContext } from '../App';

export default function Header() {
    const { token } = useContext(AppContext)

    return (
        <header>
            <Link to="" className='logo'>SOFRODIS</Link>
            
            <nav>
                <Link to="/">home</Link>
                <Link to="/services">services</Link>
                <Link to="/products">products</Link>
                {token && (
                    <Link to="/orders">orders</Link>
                )}
            </nav>
            {token ? (
                <Link to="/users/show" className="account">
                    <AccountIcon width='25' height="25" fill='white' />
                </Link>
            ) : (
                <Link to="/users/login" className="account">
                    <AccountIcon width='25' height="25" fill='white' />
                </Link>
            )}
        </header>
    )
}