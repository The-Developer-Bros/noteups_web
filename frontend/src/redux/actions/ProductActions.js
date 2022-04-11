import axios from "axios";
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/ProductConstants";

export const listProducts = (domain) => async (dispatch) => {

    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    try {
        let subdomains = {};
        switch (domain) {
            case "engineering":
                const engineeringSubdomains = await axios.get(`/api/engineering/subdomains`);
                subdomains = engineeringSubdomains.data.folders;
                break;
            case "arts":
                const artsSubdomains = await axios.get(`/api/arts/subdomains`);
                subdomains = artsSubdomains.data.folders;
                break;
            case "commerce":
                const commerceSubdomains = await axios.get(`/api/commerce/subdomains`);
                subdomains = commerceSubdomains.data.folders;
                break;
            default:
                throw new Error("Invalid domain");
        }
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: subdomains });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }

}

export const detailsProduct = (domain, subdomain, subject) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: { domain, subdomain, subject } });

    try {
        const { data } = await axios.get(`/api/${domain}/${subdomain}/${subject}/details.json`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}