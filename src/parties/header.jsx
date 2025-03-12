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
                <a href="service">service</a>
                <a href="product">product</a>
                <a href="my orders">my orders</a>
            </nav>
            <div className="account">
                <AccountIcon width='25' height="25" fill='white'/>
            </div>
        </header>
    )
}