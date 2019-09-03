import { combineReducers } from 'redux';
import ScheduleReducer from './ScheduleReducer';
import HomeReducer from './HomeReducer';
import BookingReducer from './BookingReducer';
import AdminReducer from './AdminReducer';

export default combineReducers({
	schedule: ScheduleReducer,
	home: HomeReducer,
	booking: BookingReducer,
	admin:AdminReducer
});