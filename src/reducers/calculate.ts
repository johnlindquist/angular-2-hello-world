export const ADD = 'ADD';
export const RESET = 'RESET';

export const calculate = (state = 0, {type, payload})=> {
    switch(type){
        case ADD:
            return state + parseInt(payload);
        
        case RESET:
            return 0;
        
        default:
            return state;
    }
};
