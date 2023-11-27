const initialState = [];

//action types
const SET_FEEDS = 'feeds/SET_FEEDS';

//action creators
export const setFeeds = (payload) => {
  return { type: SET_FEEDS, payload };
};

// reducer
const feeds = (state = initialState, action) => {
  switch (action.type) {
    case SET_FEEDS:
      return [...action.payload];

    default:
      return state;
  }
};

export default feeds;
