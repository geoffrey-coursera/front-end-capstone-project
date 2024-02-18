export const bindActions = (types, dispatch) => Object.fromEntries(
    types.map(type => [type, payload => dispatch({ type, payload })])
);