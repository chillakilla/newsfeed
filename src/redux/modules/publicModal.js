//action types
const CLOSEMODAL = 'CLOSEMODAL';
const SHOWMODAL = 'SHOWMODAL';

//action creator
export const closePublicModal = () => {
  return { type: CLOSEMODAL };
};

export const showPublicModal = (payload) => {
  return { type: SHOWMODAL, payload };
};

const initialState = { isUse: false, title: '제목', message: '메세지', btnMsg: '', btnFn: '', btnMsg2: '', btnFn2: '' };

//reducer
const publicModal = (state = initialState, action) => {
  switch (action.type) {
    case CLOSEMODAL:
      return { ...state, isUse: false };

    case SHOWMODAL:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default publicModal;
