import {  GET_COUNTRIES, 
          POST_ACTIVITIES, 
          FILTER_COUNTRIES_BY_ACTIVITY, 
          SORT_COUNTRIES, GET_ACTIVITIES, 
          FILTER_COUNTRIES_BY_CONTINENT, 
          REMOVE_FILTER} from '../actions/types.js';
const initialState = {
    countries: [],
    filteredCountries: [],
    filterByActivities: [],
    filterByContinent : [],
    activities: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload,
                filterByActivities: action.payload,
                filterByContinent: action.payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case FILTER_COUNTRIES_BY_ACTIVITY:
            return {
                ...state,
                filterByActivities: state.filteredCountries.filter(c => c.activities.map(a => a.name).includes(action.payload)),
                filteredCountries: state.filterByContinent.filter(c => state.filterByActivities.includes(c))
            }
        case FILTER_COUNTRIES_BY_CONTINENT:
            return {
                ...state,
                filterByContinent: state.countries.filter(c => c.continent === action.payload),
                filteredCountries: state.filterByContinent.filter(c => state.filterByActivities.includes(c))
            }
        case REMOVE_FILTER:
            if(action.payload === 'activity'){
                return {
                    ...state,
                    filterByActivities: state.countries,
                    filteredCountries: state.filterByContinent.filter(c => state.filterByActivities.includes(c))
                }
            }
            if(action.payload === 'continent'){
                return {
                    ...state,
                    filterByContinent: state.countries,
                    filteredCountries: state.filterByContinent.filter(c => state.filterByActivities.includes(c))
                }
            }
            break
        case SORT_COUNTRIES:
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
            return{
              ...state,
              filteredCountries: state.filterByContinent.filter(c => state.filterByActivities.includes(c))
            }
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