import './Burger.scss';

export { Burger as default };

const Burger = ({ open, toggle }) => (
    <button
        className="burger"
        data-open={open}
        aria-label="navigation menu toggle"
        onClick={toggle}
    >
        <div aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
        </div>  
    </button>
);