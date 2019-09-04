import { combineReducers } from 'redux';
import ScheduleReducer from './ScheduleReducer';
import HomeReducer from './HomeReducer';
import BookingReducer from './BookingReducer';
import AdminReducer from './AdminReducer';
import CleanerReducer from './CleanerReducer';

export default combineReducers({
	schedule: ScheduleReducer,
	home: HomeReducer,
	booking: BookingReducer,
	admin:AdminReducer,
	cleaner: CleanerReducer
});