import { GET_COUNTRIES } from "../actions/types.js";


const initialState = {
    allCountries: [],
    filteredCountries: [],
}




const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            
            return {
                ...state,
                allCountries: action.payload
            }
    
        default:
            break;
    }
}

export default rootReducer;