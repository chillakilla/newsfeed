const initialState = { field: 'CVS', compare: '!=', value: '전체' };

//action types
const GET_ALL = 'fetch/GET_ALL';
const GET_GS = 'fetch/GET_GS';
const GET_CU = 'fetch/GET_CU';
const GET_SEVEN = 'fetch/GET_SEVEN';
const GET_EMART = 'fetch/GET_EMART';
const GET_MINISTOP = 'fetch/GET_MINISTOP';
const GET_BY_USER = 'fetch/GET_BY_USER';

//action creators
export const getAll = () => {
  return { type: GET_ALL };
};
export const getGS = () => {
  return { type: GET_GS };
};

export const getCU = () => {
  return { type: GET_CU };
};
export const getSeven = () => {
  return { type: GET_SEVEN };
};
export const getEmart = () => {
  return { type: GET_EMART };
};
export const getMinistop = () => {
  return { type: GET_MINISTOP };
};
export const getByUser = (uid) => {
  return { type: GET_BY_USER, payload: uid };
};

// reducer
const filterConfig = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return { field: 'CVS', compare: '!=', value: '전체' };

    case GET_GS:
      return {
        field: 'CVS',
        compare: '==',
        value: 'GS'
      };

    case GET_SEVEN:
      return {
        field: 'CVS',
        compare: '==',
        value: '세븐일레븐'
      };
    case GET_CU:
      return {
        field: 'CVS',
        compare: '==',
        value: 'CU'
      };
    case GET_EMART:
      return {
        field: 'CVS',
        compare: '==',
        value: '이마트24'
      };
    case GET_MINISTOP:
      return {
        field: 'CVS',
        compare: '==',
        value: '미니스탑'
      };
    case GET_BY_USER:
      const userId = action.payload;
      return {
        field: 'user',
        compare: '==',
        value: userId
      };

    default:
      return state;
  }
};

export default filterConfig;
