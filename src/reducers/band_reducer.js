export default (state=[], action) => {
    switch (action.type) {
    case 'ADD_BAND':
      return [...state, action.payload];
    default:
      return state;
    }
}
