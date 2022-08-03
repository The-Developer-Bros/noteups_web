import { backendClient } from "../../common/clients";
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

export const listSubdomainsActionCreater = (domain) => async (dispatch) => {
  dispatch({
    type: SUBDOMAIN_LIST_REQUEST,
  });

  try {
    let subdomains = {};
    switch (domain) {
      case "engineering":
        const engineeringSubdomains = await backendClient.get(
          `/productApi/engineering/subdomains`
        );
        subdomains = engineeringSubdomains.data.folders;
        break;
      case "arts":
        const artsSubdomains = await backendClient.get(
          `/productApi/arts/subdomains`
        );
        subdomains = artsSubdomains.data.folders;
        break;
      case "commerce":
        const commerceSubdomains = await backendClient.get(
          `/productApi/commerce/subdomains`
        );
        subdomains = commerceSubdomains.data.folders;
        break;
      default:
        throw new Error("Invalid domain");
    }
    dispatch({ type: SUBDOMAIN_LIST_SUCCESS, payload: subdomains });
  } catch (error) {
    dispatch({ type: SUBDOMAIN_LIST_FAIL, payload: error.message });
  }
};

export const detailsSubdomainActionCreator =
  (domain, subdomain) => async (dispatch) => {
    dispatch({
      type: SUBDOMAIN_DETAILS_REQUEST,
      payload: { domain, subdomain },
    });

    try {
      const { data } = await backendClient.get(
        `/productApi/${domain}/${subdomain}/details.json`
      );
      dispatch({ type: SUBDOMAIN_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUBDOMAIN_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listSubjectsActionCreator =
  (domain, subdomain) => async (dispatch) => {
    dispatch({ type: SUBJECT_LIST_REQUEST, payload: { domain, subdomain } });

    let response = {};
    let subjects = {};
    let subdomains = {};
    console.log(`domain: ${domain} and subdomain: ${subdomain}`);

    try {
      if (subdomain !== "all") {
        response = await backendClient.get(
          `/productApi/${domain}/${subdomain}/subjects`
        );
        subjects = response.data.folders;
        dispatch({ type: SUBJECT_LIST_SUCCESS, payload: subjects });
      } else {
        response = await backendClient.get(`/productApi/${domain}/subdomains`);
        subdomains = response.data.folders;
        console.log(`subdomains:`, subdomains);

        // for (subdomain of subdomains) {
        //     response = await backendClient.get(`/productApi/${domain}/${subdomain.path.split('/')[2]}/subjects`)

        // if (response.data.folders.length > 0) {
        //     console.log(`response.data.folders:`, response.data.folders);
        //     subjects = Object.assign({}, subjects, response.data.folders);
        // }

        // Use promises to get all subjects
        // }

        const subjectsPromises = subdomains.map(async (subdomain) => {
          response = await backendClient.get(
            `/productApi/${domain}/${subdomain.path.split("/")[2]}/subjects`
          );
          return response.data.folders;
        });

        // Open all subjects
        subjects = await Promise.all(subjectsPromises);
        subjects = subjects.flat();

        console.log(`final subjects:`, subjects);
        dispatch({ type: SUBJECT_LIST_SUCCESS, payload: subjects });
      }
    } catch (error) {
      dispatch({ type: SUBJECT_LIST_FAIL, payload: error.message });
    }
  };

export const detailsSubjectActionCreator =
  (domain, subdomain, subject) => async (dispatch) => {
    dispatch({
      type: SUBJECT_DETAILS_REQUEST,
      payload: { domain, subdomain, subject },
    });

    try {
      const { data } = await backendClient.get(
        `/productApi/${domain}/${subdomain}/${subject}/details.json`
      );
      dispatch({ type: SUBJECT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUBJECT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
