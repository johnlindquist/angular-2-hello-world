export const ADD = 'ADD';
export const RESET = 'RESET';

export const calculate = (state = 0, {type, payload})=> {
    console.log(type, payload, state);
    switch(type){
        case ADD:
            return state + parseInt(payload);
        
        case RESET:
            return 0;
        
        default:
            return state;
    }
};
