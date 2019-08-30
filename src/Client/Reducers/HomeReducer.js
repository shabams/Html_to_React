import { GET_ESTIMATION } from '../Actions/Type';

const initialState = {
	get_estimation_price: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ESTIMATION:
    	return {
    		...state,
    		get_estimation_price: action.payload
    	};
    default:
      return state;
  }
}

