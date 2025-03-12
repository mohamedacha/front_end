import '../css_files/Header.css';
import {ReactComponent as AccountIcon} from '../svg/account.svg'

export default function Header() {
    return (
        <header>
            <div className='logo'>
                SOFRODIS
            </div>
            <nav>
                <a href="home">home</a>
                <a href="service">services</a>
                <a href="product">products</a>
                <a href="my orders">orders</a>
            </nav>
            <div className="account">
                <AccountIcon width='25' height="25" fill='white'/>
            </div>
        </header>
    )
}