import {    GET_COUNTRIES, 
            POST_ACTIVITIES, 
            FILTER_COUNTRIES_BY_ACTIVITY, 
            SORT_COUNTRIES, GET_ACTIVITIES, 
            FILTER_COUNTRIES_BY_CONTINENT, 
            REMOVE_FILTER,
            SEARCH_COUNTRY,
            DELETE_ACTIVITY,
            UPDATE_ACTIVITY,
            ERROR} from '../actions/types.js';


const initialState = {
    countries: [], //todos los paises, no se modifica, solo se ordena
    filteredCountries: [], //paises filtrados por actividad y continente
    activities: [], //nombre de todas las actividades
    loading: true, //carga inicial
    filter: true, //para saber si se esta filtrando o no
    activityFilter: [], //paises filtrados por actividad
    continentFilter: [], //paises filtrados por continente
    currentActivity: '', //actividad filtrada actual
    currentContinent: '', //continente filtrado actual
    error: false,
    defaultActivityImage: 'https://images.unsplash.com/photo-1523867904486-8153c8afb94f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2NDA3MzkxNQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
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
    if (by === 'disorder'){
        return list.sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        })
    }


}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            
        if (state.filter === false) {
            return {
                    ...state,
                    countries: action.payload,
                    loading: false,
                    error: false
                }
            }else{
                return {
                    ...state,
                    countries: action.payload,
                    filteredCountries: action.payload,
                    activityFilter: action.payload,
                    continentFilter: action.payload,
                    loading: false,
                    error: false
                }
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
                error: false
            }
        case SEARCH_COUNTRY:
                return {
                    ...state,
                    filteredCountries: state.countries.filter(c => c.name.toLowerCase().includes(action.payload.toLowerCase())),
                    error: false
                }
        case FILTER_COUNTRIES_BY_ACTIVITY:
            return {
                ...state,
                activityFilter: state.countries.filter(c => c.activities.map(a => a.name).includes(action.payload)),
                filteredCountries: state.continentFilter.filter(c => c.activities.map(a => a.name).includes(action.payload)),
                currentActivity: action.payload,
                filter: false,
                error: false
            }
        case FILTER_COUNTRIES_BY_CONTINENT:
            return {
                ...state,
                loading: false,
                continentFilter: state.countries.filter(c => c.continent === action.payload),
                filteredCountries: state.activityFilter.filter(c => c.continent === action.payload),
                currentContinent: action.payload,
                filter: false,
                error: false
            }
        case REMOVE_FILTER:
            console.log('remove filter')
            if (action.payload === 'activity') {
                return {
                    ...state,
                    activityFilter: state.countries,
                    filteredCountries: state.continentFilter,
                    currentActivity: '',
                    filter: true,
                    error: false
                }
            }else if (action.payload === 'continent') {
                return {
                    ...state,
                    continentFilter: state.countries,
                    filteredCountries: state.activityFilter,
                    currentContinent: '',
                    filter: true,
                    error: false
                }
            }else{
                return {
                    ...state,
                    filteredCountries: state.countries,
                    activityFilter: state.countries,
                    continentFilter: state.countries,
                    currentActivity: '',
                    currentContinent: '',
                    filter: true,
                    error: false
                }
            }
        case SORT_COUNTRIES:
            console.log('Ordenando por', action.payload)
            return {
                ...state,
                filteredCountries: sort(state.filteredCountries, action.payload),
                countries: sort(state.countries, action.payload),
                activityFilter: sort(state.activityFilter, action.payload),
                continentFilter: sort(state.continentFilter, action.payload),
                error: false
            }
        case POST_ACTIVITIES:
            return {
                ...state,
                error: false
            }
        case UPDATE_ACTIVITY:
            return {
                ...state,
                error: false
            }
        case DELETE_ACTIVITY:
            return {
                ...state,
                error: false
            }
        case ERROR:
            return{
                ...state,
                error: action.payload
            }         
        default:
            break;

    }
    return state
}

export default rootReducer