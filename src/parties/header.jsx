import '../css_files/Header.css' ;

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
                account
            </div>
        </header>
    )
}