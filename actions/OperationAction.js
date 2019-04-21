import {OPERATIONS_UPDATE, OPERATIONS_CREATE, OPERATIONS_FETCH_SUCCESS} from "./types";
import firebase from 'firebase';

export const operationUpdate=({prop,value})=>{
    return{
        type:OPERATIONS_UPDATE,
        payload:{prop,value}
    }
};

export const operationCreate=({dateTime,amountIncome,amountOutcome,profit})=>{
    return(dispatch)=> {
        dispatch({type: OPERATIONS_CREATE});
        firebase.database().ref('operations/')
            .push({dateTime, amountIncome, amountOutcome,profit})
    }
};

export const operationFetch=()=>{
    return (dispatch)=>{
        firebase.database().ref('operations/')
            .on('value',snapshot=>{
                dispatch({type:OPERATIONS_FETCH_SUCCESS,payload:snapshot.val()});
            });
    };
};