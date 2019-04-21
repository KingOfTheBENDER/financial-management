import {OPERATIONS_CREATE, OPERATIONS_UPDATE} from "../actions/types";


const INITIAL_STATE={
    dataTime:'',
    amountIncome:0,
    amountOutcome:0,
    profit:0
};

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case OPERATIONS_UPDATE:
            return {...state,[action.payload.prop]:action.payload.value};
        case OPERATIONS_CREATE:
            return INITIAL_STATE;
        default:
            return state;
    }
};


