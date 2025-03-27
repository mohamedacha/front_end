import { Link } from 'react-router-dom';
import '../css_files/Header.css';
import { ReactComponent as AccountIcon } from '../svg/account.svg'
import { useContext } from 'react';
import { AppContext } from '../App';

export default function Header() {
    const { profail , token } = useContext(AppContext)
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
                    <div className="header_img_container">
                        <img src= {profail} alt="kk" />
                    </div>
                </Link>
            ) : (
                <Link to="/users/login" className="account">
                    <AccountIcon width='25' height="25" fill='white' />
                </Link>
            )}
        </header>
    )
}