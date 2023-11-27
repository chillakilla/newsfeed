//action types
const OPENINPUTMODAL = 'OPENINPUTMODAL';
const CLOSEINPUTMODAL = 'CLOSEINPUTMODAL';
//action creator
export const closeInputModal = () => {
  return { type: CLOSEINPUTMODAL };
};

export const openInputmodal = () => {
  return { type: OPENINPUTMODAL };
};

const initialState = { isUseInput: false };

// reducer
const modal = (state = initialState, action) => {
  switch (action.type) {
    case CLOSEINPUTMODAL:
      return { ...state, isUseInput: false };

    case OPENINPUTMODAL:
      return { ...state, isUseInput: true };

    default:
      return state;
  }
};

export default modal;
