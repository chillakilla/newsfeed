//action type
const CURRENTEMAIL = 'CURRENTEMAIL';

//action creator
export const current_Email = (payload) => {
  return { type: CURRENTEMAIL, payload };
};

const initialState = '';

// reducer
const currentEmail = (state = initialState, action) => {
  switch (action.type) {
    case CURRENTEMAIL:
      return (state = action.payload);

    default:
      return state;
  }
};

//5.export reducer
export default currentEmail;
