import {    GET_COUNTRIES, 
            GET_COUNTRY_DETAIL,
            REMOVE_DETAIL,  
            POST_ACTIVITIES, 
            FILTER_COUNTRIES_BY_ACTIVITY, 
            SORT_COUNTRIES, GET_ACTIVITIES, 
            FILTER_COUNTRIES_BY_CONTINENT, 
            REMOVE_FILTER,
            SEARCH_COUNTRY,
            DELETE_ACTIVITY,
            REMOVE_ACTIVITY,
            UPDATE_ACTIVITY,
            REMOVE_SEARCH,
            CHANGE_PAGE,
            ERROR} from '../actions/types.js';


const initialState = {
    countries: [], //todos los paises, no se modifica, solo se ordena
    filteredCountries: [], //paises filtrados por actividad y continente
    displayedCountries: [], //paises que se muestran en la pagina
    countryDetail: {}, //pais seleccionado
    activities: [], //nombre de todas las actividades
    activityFilter: [], //paises filtrados por actividad
    continentFilter: [], //paises filtrados por continente
    currentActivity: '', //actividad filtrada actual
    currentContinent: '', //continente filtrado actual
    currentPage: 1, //pagina actual
    loading: true, //carga inicial
    filter: true, //para saber si se esta filtrando o no
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
                    displayedCountries: action.payload,
                    activityFilter: action.payload,
                    continentFilter: action.payload,
                    loading: false,
                    error: false
                }
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload,
                loading: false,
                error: false
            }
        case REMOVE_DETAIL:
            return {
                ...state,
                countryDetail: {},
                loading: true,
                error: false
            }
        case CHANGE_PAGE:
            return {
                ...state,
                currentPage: action.payload
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
                    displayedCountries: state.filteredCountries.filter(c => c.name.toLowerCase().includes(action.payload.toLowerCase())),
                    currentPage: 1,
                    error: false
                }
        case REMOVE_SEARCH:
            return {
                ...state,
                filteredCountries: state.activityFilter.includes(state.continentFilter)
            }
        case FILTER_COUNTRIES_BY_ACTIVITY:
            return {
                ...state,
                activityFilter: state.countries.filter(c => c.activities.map(a => a.name).includes(action.payload)),
                filteredCountries: state.continentFilter.filter(c => c.activities.map(a => a.name).includes(action.payload)),
                displayedCountries: state.continentFilter.filter(c => c.activities.map(a => a.name).includes(action.payload)),
                currentActivity: action.payload,
                currentPage: 1,
                filter: false,
                error: false
            }
        case FILTER_COUNTRIES_BY_CONTINENT:
            return {
                ...state,
                loading: false,
                continentFilter: state.countries.filter(c => c.continent === action.payload),
                filteredCountries: state.activityFilter.filter(c => c.continent === action.payload),
                displayedCountries: state.activityFilter.filter(c => c.continent === action.payload),
                currentContinent: action.payload,
                currentPage: 1,
                filter: false,
                error: false
            }
        case REMOVE_FILTER:
            console.log('remove filter')
            if (action.payload === 'activity') {
                if (state.currentContinent === '') {
                    return {
                        ...state,
                        activityFilter: state.countries,
                        filteredCountries: state.countries,
                        displayedCountries: state.countries,
                        currentActivity: '',
                        currentPage: 1,
                        filter: true,
                        error: false
                    }
                } else {
                    return {
                        ...state,
                        activityFilter: state.countries,
                        filteredCountries: state.continentFilter,
                        displayedCountries: state.continentFilter,
                        currentActivity: '',
                        currentPage: 1,
                        filter: false,
                        error: false
                    }
                }
            }else if (action.payload === 'continent') {
                if (state.currentActivity === '') {
                    return {
                        ...state,
                        continentFilter: state.countries,
                        filteredCountries: state.countries,
                        displayedCountries: state.countries,
                        currentContinent: '',
                        currentPage: 1,
                        filter: true,
                        error: false
                    }
                }else{
                    return {
                        ...state,
                        continentFilter: state.countries,
                        filteredCountries: state.activityFilter,
                        displayedCountries: state.activityFilter,
                        currentContinent: '',
                        currentPage: 1,
                        filter: false,
                        error: false
                    }
                }
            }else{
                return {
                    ...state,
                    filteredCountries: state.countries,
                    displayedCountries: state.countries,
                    activityFilter: state.countries,
                    continentFilter: state.countries,
                    search: state.countries,
                    currentActivity: '',
                    currentContinent: '',
                    currentPage: 1,
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
                displayedCountries: sort(state.displayedCountries, action.payload),
                currentPage: 1,
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
        case REMOVE_ACTIVITY:
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