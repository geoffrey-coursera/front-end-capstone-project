import HeaderNav from 'Sections/HeaderNav';
import Footer from 'Sections/Footer';
import HomePage from 'Pages/HomePage';

import './App.css';

function App() {
    return <>
        <HeaderNav/>
        <main>
            <HomePage />
        </main>
        <Footer/>
    </>;
}

export default App;