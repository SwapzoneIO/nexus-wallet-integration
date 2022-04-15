import exchangeInfo from './exchangeInfo';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = NEXUS;

export default combineReducers({
  exchangeInfo,
});

