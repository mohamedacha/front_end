import '../css_files/Footer.css' ;
import {ReactComponent as InstagramIcon} from '../svg/instagram.svg'
import {ReactComponent as TelegramIcon} from '../svg/telegram.svg'
import {ReactComponent as FacebookIcon} from '../svg/facebook.svg'

export default function Footer(){
    return(
        <footer>
            <div className="left-part">
                <p>about us</p>
                <p>our politics</p>
            </div>
            <div className="right-part">
                <div className="instagram-icon">
                <InstagramIcon height="28" width="28" fill='#133E87'/>
                </div>
                <div className="telegram-icon">
                <TelegramIcon height="25" width="25" fill='#133E87'/>
                </div>
                <div className="facebook-icon">
                <FacebookIcon height="28" width="28" fill='#133E87'/>
                </div>
            </div>
        </footer>
    )
}