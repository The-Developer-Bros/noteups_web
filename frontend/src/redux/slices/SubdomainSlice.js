import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backendClient } from "../../common/clients";

export const fetchAsyncEngineeringSubdomains = createAsyncThunk(
  "subdomains/fetchAsyncEngineeringSubdomains",
  async (term) => {
    // const response = await fetch(`/productApi/engineering/subdomains`);
    // const subdomains = await response.json();
    const response = await backendClient.get(
      "/productApi/engineering/subdomains"
    );
    const subdomains = response.data;

    console.log("fetched Engineering subdomains:", subdomains);
    subdomains.folders = subdomains.folders.filter((subdomain) =>
      subdomain.name.includes(term)
    );
    return subdomains;
  }
);

export const fetchAsyncArtsSubdomains = createAsyncThunk(
  "subdomains/fetchAsyncArtsSubdomains",
  async (term) => {
    // const response = await fetch(`/productApi/arts/subdomains`);
    // const subdomains = await response.json();
    const response = await backendClient.get("/productApi/arts/subdomains");
    const subdomains = response.data;

    console.log("fetched Arts subdomains:", subdomains);
    subdomains.folders = subdomains.folders.filter((subdomain) =>
      subdomain.name.includes(term)
    );
    return subdomains;
  }
);

export const fetchAsyncCommerceSubdomains = createAsyncThunk(
  "subdomains/fetchAsyncCommerceSubdomains",
  async (term) => {
    // const response = await fetch(`/productApi/commerce/subdomains`);
    // const subdomains = await response.json();

    const response = await backendClient.get("/productApi/commerce/subdomains");
    const subdomains = response.data;

    console.log("fetched Commerce subdomains:", subdomains);
    subdomains.folders = subdomains.folders.filter((subdomain) =>
      subdomain.name.includes(term)
    );
    return subdomains;
  }
);

// TODO: Detail the subdomain
export const fetchAsyncSubjectPDFs = createAsyncThunk(
  "subdomains/fetchAsyncSubjectPDFs",
  async ({ domain, subdomain, subject }) => {
    // params can't be separated
    // const response = await fetch(
    //   `/productApi/pdfs/${domain}/${subdomain}/${subject}`
    // );
    // const pdfs = await response.json();

    const response = await backendClient.get(
      `/productApi/pdfs/${domain}/${subdomain}/${subject}`
    );
    const pdfs = response.data;

    console.log("fetched PDFs:", pdfs);
    return pdfs;
  }
);

export const fetchAsyncSubjectDetails = createAsyncThunk(
  "subdomains/fetchAsyncSubjectDetails",
  async ({ domain, subdomain, subject }) => {
    try {
      // params can't be separated
      // const response = await fetch(
      //   `${process.env.REACT_APP_BACKEND_URL}/productApi/details/${domain}/${subdomain}/${subject}`
      // );

      // const details = await response.json();
      const response = await backendClient.get(
        `/productApi/details/${domain}/${subdomain}/${subject}`
      );
      const details = response.data;

      const subjectMetaDataSecureUrl = await fetch(details.secure_url);
      const subjectMetaData = await subjectMetaDataSecureUrl.json();

      // concatenate details and subjectMetaData
      const subjectDetailsWithMetaData = {
        ...details,
        subject_meta_data: subjectMetaData,
      };

      console.log(
        "fetched subject details with meta data:",
        subjectDetailsWithMetaData
      );
      return subjectDetailsWithMetaData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAsyncSubjectsImages = createAsyncThunk(
  "subdomains/fetchAsyncSubjectsImages",
  async ({ domain, subdomain, subject }) => {
    try {
      // params can't be separated
      // const response = await fetch(
      //   `${process.env.REACT_APP_BACKEND_URL}/productApi/images/${domain}/${subdomain}/${subject}`
      // );
      // // response is array of jsons
      // console.log("response", response);
      // const images = await response.json();
      
      const response = await backendClient.get(
        `/productApi/images/${domain}/${subdomain}/${subject}`
      );
      const images = response.data;

      console.log("fetched images:", images);
      return images;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  engineering: {},
  arts: {},
  commerce: {},
  selectedSubjectPDFs: {},
  selectedSubjectDetails: {},
  selectedSubjectImages: [],
};

const subdomainSlice = createSlice({
  name: "subdomains",
  initialState,
  reducers: {
    // addSubdomains now part of fetchAsyncSubdomains
    // addSubdomains: (state, action) => {
    //     state.subdomains = action.payload;
    //     // {...state, payload} // old redux syntax // this is redux toolkit syntax
    // },
    removeSelectedSubjectPDFs: (state) => {
      state.selectedSubjectPDFs = {};
    },
    removeSelectedSubjectDetails: (state) => {
      state.selectedSubjectDetails = {};
    },
  },
  extraReducers: {
    // Categories and Listings
    [fetchAsyncEngineeringSubdomains.fulfilled]: (state, { payload }) => {
      console.log("Fetch of EngineeringSubdomains Successful ", payload);
      return { ...state, engineering: payload };
    },
    [fetchAsyncEngineeringSubdomains.rejected]: (state, { payload }) => {
      console.log("Fetch of EngineeringSubdomains Rejected ", payload);
    },
    [fetchAsyncArtsSubdomains.fulfilled]: (state, { payload }) => {
      console.log("Fetch of ArtsSubdomains Successful ", payload);
      return { ...state, arts: payload };
    },
    [fetchAsyncArtsSubdomains.rejected]: (state, { payload }) => {
      console.log("Fetch of ArtsSubdomains Rejected ", payload);
    },
    [fetchAsyncCommerceSubdomains.fulfilled]: (state, { payload }) => {
      console.log("Fetch of CommerceSubdomains Successful ", payload);
      return { ...state, commerce: payload };
    },
    [fetchAsyncCommerceSubdomains.rejected]: (state, { payload }) => {
      console.log("Fetch of CommerceSubdomains Rejected ", payload);
    },
    // Details
    [fetchAsyncSubjectDetails.fulfilled]: (state, { payload }) => {
      console.log("Fetch of SubjectDetails Successful ", payload);
      return { ...state, selectedSubjectDetails: payload };
    },
    [fetchAsyncSubjectDetails.rejected]: (state, { payload }) => {
      console.log("Fetch of SubjectDetails Rejected ", payload);
      return { ...state, selectedSubjectDetails: {} };
    },
    [fetchAsyncSubjectsImages.fulfilled]: (state, { payload }) => {
      console.log("Fetch of SubjectsImages Successful ", payload);
      return { ...state, selectedSubjectImages: payload };
    },
    [fetchAsyncSubjectsImages.rejected]: (state, { payload }) => {
      console.log("Fetch of SubjectsImages Rejected ", payload);
      return { ...state, selectedSubjectImages: [] };
    },
    [fetchAsyncSubjectPDFs.fulfilled]: (state, { payload }) => {
      console.log("Fetch of SubjectPDFs Successful ", payload);
      return { ...state, selectedSubjectPDFs: payload };
    },
    [fetchAsyncSubjectPDFs.rejected]: (state, { payload }) => {
      console.log("Fetch of SubjectPDFs Rejected ", payload);
      return { ...state, selectedSubjectPDFs: {} };
    },
  },
});

export const {
  // addSubdomains,
  removeSelectedSubjectPDFs,
  removeSelectedSubjectDetails,
} = subdomainSlice.actions;

export const getAllEngineeringSubdomains = (state) =>
  state.subdomains.engineering;
export const getAllArtsSubdomains = (state) => state.subdomains.arts;
export const getAllCommerceSubdomains = (state) => state.subdomains.commerce;
export const getSelectedSubjectPDFs = (state) =>
  state.subdomains.selectedSubjectPDFs;
export const getSelectedSubjectDetails = (state) =>
  state.subdomains.selectedSubjectDetails;

export const getSelectedSubjectImages = (state) =>
  state.subdomains.selectedSubjectImages;

export default subdomainSlice.reducer;
