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
    activities: [],
    loading: true,
    activityFilter: [],
    continentFilter: [],
}

const sort = (list, by) => {
    if (by === 'A-Z') {
        return list.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        })
    }
    if (by === 'Z-A') {
        return list.sort((a, b) => {
            if (a.name < b.name) {
                return 1;
            }
            if (a.name > b.name) {
                return -1;
            }
            return 0;
        })
    }
    if (by === 'morePopulation') {
        return list.sort((a, b) => {
            if (a.population < b.population) {
                return 1;
            }
            if (a.population > b.population) {
                return -1;
            }
            return 0;
        })
    }
    if (by === 'lessPopulation') {
        return list.sort((a, b) => {
            if (a.population > b.population) {
                return 1;
            }
            if (a.population < b.population) {
                return -1;
            }
            return 0;
        })
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload,
                activityFilter: action.payload,
                continentFilter: action.payload,
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
                activityFilter: state.countries.filter(c => c.activities.map(a => a.name).includes(action.payload)),
                filteredCountries: state.continentFilter.filter(c => c.activities.map(a => a.name).includes(action.payload))
            }
        case FILTER_COUNTRIES_BY_CONTINENT:
            return {
                ...state,
                loading: false,
                continentFilter: state.countries.filter(c => c.continent === action.payload),
                filteredCountries: state.activityFilter.filter(c => c.continent === action.payload)
            }
        case REMOVE_FILTER:
                return {
                    ...state,
                    filteredCountries: state.countries
                }
        case SORT_COUNTRIES:
            console.log('Ordenando por', action.payload)
            return {
                ...state,
                filteredCountries: sort(state.filteredCountries, action.payload),
                countries: sort(state.countries, action.payload),
                activityFilter: sort(state.activityFilter, action.payload),
                continentFilter: sort(state.continentFilter, action.payload)
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