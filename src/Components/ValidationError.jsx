import './ValidationError.scss';

export { ValidationError as default };

const ValidationError = ({ children }) => (
    <div className="validation-error">{children}</div>
);