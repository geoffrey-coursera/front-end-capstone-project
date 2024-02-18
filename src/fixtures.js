import { Dependencies } from './dependencies';
import { MemoryRouter } from 'react-router-dom';

export { DefaultFixture as default, Fixture, dependencies };

const dependencies = {
    dateNow: () => new Date(2000, 0, 1, 12),
    availableTimes: {
        fetchTimes: () => Promise.resolve(['17:00', '19:00', '22:00']),
        submitReservation: () => Promise.resolve(true),
        getISODate: () => '2000-01-01'
    }
};

const Fixture = (override = x => x, initialEntries = ['/']) => ({ children }) => (
    <MemoryRouter initialEntries={initialEntries}>
        <Dependencies value={override(dependencies)}>
            {children}
        </Dependencies>
    </MemoryRouter>
);

const DefaultFixture = Fixture();