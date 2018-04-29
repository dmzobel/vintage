import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ALL_VINTAGES = 'GET_ALL_VINTAGES';

/**
 * ACTION CREATORS
 */
const getAllVintages = vintages => ({
  type: GET_ALL_VINTAGES,
  vintages
});

/**
 * THUNK CREATORS
 */
export const allVintagesThunk = () => dispatch => {
  return axios
    .get(`/api/vintages`)
    .then(res => dispatch(getAllVintages(res.data)))
    .catch(err => console.error(err));
};

/**
 * REDUCER
 */
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_VINTAGES:
      return action.vintages;

    default:
      return state;
  }
}
