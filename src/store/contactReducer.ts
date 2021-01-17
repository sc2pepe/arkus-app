const initialState: AppState = {
    contacts: [],
    contact: null,
    action: null,
    error: null,
    success: false,
    loading: false
};

const RootReducer = (state: AppState = initialState, action: any): AppState => {
    switch (action.type) {
        case '@@contact/LIST_START':
            return {
                ...state,
                contacts: [],
                error: null
            };
        case '@@contact/SAVE_START':
        case '@@contact/GET_START':
            return {
                ...state,
                loading: true,
                success: null,
                error: null
            };
        case '@@contact/LIST_SUCCESS':
            return {
                ...state,
                contacts: action.contacts,
                loading: false
            };
        case '@@contact/LIST_FAIL':
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case '@@contact/SAVE_SUCCESS':
            return {
                ...state,
                success: true,
                loading: false
            };
        case '@@contact/SAVE_FAIL':
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case '@@contact/GET_SUCCESS':
            return {
                ...state,
                contact: action.contact,
                loading: false
            };
        case '@@contact/GET_FAIL':
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case '@@contact/DELETE_SUCCESS':
            return {
                ...state,
                success: true,
                loading: false
            };
        case '@@contact/DELETE_FAIL':
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case '@@contact/CLEAR_SUCCESS_ERROR':
            return {
                ...state,
                success: null,
                error: null
            };
        default:
            return state;
    }
};

export default RootReducer;