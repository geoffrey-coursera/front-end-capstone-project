import Nav from 'Components/Nav';
import LogoFooter from 'assets/logo-vertical-white.png';

import './Footer.scss';

export { Footer as default };

const Footer = () => (
    <footer>
        <img
            height="160"
            src={LogoFooter}
            alt="Little Lemon Restaurant"
        />
        <div>
            <section>
                <h2>Navigation</h2>
                <Nav />
            </section>
            <section>
                <h2>Contact</h2>
                <ul>
                    <li>932 W Fulton Market, Chicago,<br />IL 60607-1323</li>
                    <li>+1 892-250-3721</li>
                    <li><a href="mailto:contact@littlelemon.com">contact@littlelemon.com</a></li>
                </ul>
            </section>
            <section>
                <h2>Social media</h2>
                <ul className="social-media">
                    <li>{instagramIcon}</li>
                    <li>{facebookIcon}</li>
                    <li>{twitterIcon}</li>
                </ul>
            </section>
        </div>
    </footer>
);

const instagramIcon = <svg height="30" viewBox="0 0 24 24" title="Instagram">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
</svg>;

const facebookIcon = <svg height="30" viewBox="0 0 24 24" title="Facebook">
    <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"></path>
</svg>;

const twitterIcon = <svg height="30" viewBox="0 0 24 24" title="Twitter">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
</svg>