import {
    SUBDOMAIN_LIST_REQUEST,
    SUBDOMAIN_LIST_SUCCESS,
    SUBDOMAIN_LIST_FAIL,
    SUBDOMAIN_DETAILS_RESET,
    SUBDOMAIN_DETAILS_REQUEST,
    SUBDOMAIN_DETAILS_SUCCESS,
    SUBDOMAIN_DETAILS_FAIL,
    SUBJECT_LIST_REQUEST,
    SUBJECT_LIST_SUCCESS,
    SUBJECT_LIST_FAIL,
    SUBJECT_DETAILS_RESET,
    SUBJECT_DETAILS_REQUEST,
    SUBJECT_DETAILS_SUCCESS,
    SUBJECT_DETAILS_FAIL,
} from "../constants/ProductConstants";

export const subdomainListReducer = (state = { loading: true, subdomains: {} }, action) => {
    switch (action.type) {
        case SUBDOMAIN_LIST_REQUEST:
            return { loading: true };
        case SUBDOMAIN_LIST_SUCCESS:
            return { loading: false, subdomains: action.payload };
        case SUBDOMAIN_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const subdomainDetailsReducer = (state = { loading: true, subdomain: {} }, action) => {
    switch (action.type) {
        case SUBDOMAIN_DETAILS_REQUEST:
            return { loading: true };
        case SUBDOMAIN_DETAILS_SUCCESS:
            return { loading: false, subdomain: action.payload };
        case SUBDOMAIN_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const subjectListReducer = (state = { loading: true, subjects: {} }, action) => {
    switch (action.type) {
        case SUBJECT_LIST_REQUEST:
            return { loading: true };
        case SUBJECT_LIST_SUCCESS:
            return { loading: false, subjects: action.payload };
        case SUBJECT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const subjectDetailsReducer = (state = { loading: true, subject: {} }, action) => {
    switch (action.type) {
        case SUBJECT_DETAILS_REQUEST:
            return { loading: true };
        case SUBJECT_DETAILS_SUCCESS:
            return { loading: false, subject: action.payload };
        case SUBJECT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
