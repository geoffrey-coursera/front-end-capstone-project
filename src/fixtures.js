import { Dependencies } from './dependencies';
import { MemoryRouter } from 'react-router-dom';

export { DefaultFixture as default, dependencies };

const dependencies = {
    dateNow: () => new Date(2000, 0, 1, 12),
    availableTimes: {
        fetchTimes: () => Promise.resolve(['17:00', '19:00', '22:00']),
        submitReservation: () => Promise.resolve(true),
        getISODate: () => '2000-01-01'
    }
};

const id = x => x;

const Fixture = override => ({ children }) => (
    <MemoryRouter>
        <Dependencies value={override(dependencies)}>
            {children}
        </Dependencies>
    </MemoryRouter>
);

const DefaultFixture = Fixture(id);