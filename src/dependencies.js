import * as availableTimes from './availableTimes';
import { createContext, useContext } from 'react';

export { Dependencies, useDependencies }

const dependencies = {
    dateNow: () => new Date(),
    availableTimes
}

const context = createContext(dependencies);

const Dependencies = context.Provider;

const useDependencies = () => useContext(context);