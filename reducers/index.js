import {combineReducers} from 'redux';
import OperationReducer from "./OperationReducer";
import OperationFetchReducer from "./OperationFetchReducer";

export default combineReducers({
    operationForm:OperationReducer,
    operations:OperationFetchReducer
});