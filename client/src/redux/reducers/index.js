import {  GET_COUNTRIES, 
          POST_ACTIVITIES, 
          FILTER_COUNTRIES_BY_ACTIVITY, 
          SORT_COUNTRIES, GET_ACTIVITIES, 
          FILTER_COUNTRIES_BY_CONTINENT, 
          REMOVE_FILTER,
          SEARCH_COUNTRY} from '../actions/types.js';
const initialState = {
    countries: [],
    filteredCountries: [],
    activities: []
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload,
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case SEARCH_COUNTRY:
                return {
                    ...state,
                    filteredCountries: state.countries.filter(c => c.name.toLowerCase().includes(action.payload.toLowerCase()))
                }
        case FILTER_COUNTRIES_BY_ACTIVITY:
            return {
                ...state,
                filteredCountries: state.filterByContinent.filter(c => c.activities.map(a => a.name).includes(action.payload))
            }
        case FILTER_COUNTRIES_BY_CONTINENT:
            return {
                ...state,
                filteredCountries: state.countries.filter(c => c.continent === action.payload),
            }
        case REMOVE_FILTER:
                return {
                    ...state,
                    filteredCountries: state.countries
                }
        case SORT_COUNTRIES:
            console.log('Ordenando por', action.payload)
            switch (action.payload) {
                
                case 'A-Z':
                    return {
                        ...state,
                        filteredCountries: state.filteredCountries.sort((a, b) => {
                            if (a.name > b.name) {
                                return 1;
                            }
                            if (a.name < b.name) {
                                return -1;
                            }
                            return 0;
                        })
                    }
                    
                case 'Z-A':
                    return {
                        ...state,
                        filteredCountries: state.filteredCountries.sort((a, b) => {
                            if (a.name > b.name) {
                                return -1;
                            }
                            if (a.name < b.name) {
                                return 1;
                            }
                            return 0;
                        })
                    }
                case 'morePopulation':
                    return {
                        ...state,
                        filteredCountries: state.filteredCountries.sort((a, b) => {
                            if (a.population > b.population) {
                                return -1;
                            }
                            if (a.population < b.population) {
                                return 1;
                            }
                            return 0;
                        })
                    }
                case 'lessPopulation':
                    return {
                        ...state,
                        filteredCountries: state.filteredCountries.sort((a, b) => {
                            if (a.population > b.population) {
                                return 1;
                            }
                            if (a.population < b.population) {
                                return -1;
                            }
                            return 0;
                        })
                    }
                default:
                    break;
            }
            break
        case POST_ACTIVITIES:
            return {
                ...state,
            }         
        default:
            break;
    }
    return state
}

export default rootReducer