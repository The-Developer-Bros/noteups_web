import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncEngineeringSubdomains = createAsyncThunk(
  "subdomains/fetchAsyncEngineeringSubdomains",
  async (term) => {
    const response = await fetch(`/productApi/engineering/subdomains`);
    const subdomains = await response.json();
    console.log(`fetched Engineering subdomains: ${subdomains}`);
    subdomains.folders = subdomains.folders.filter((subdomain) =>
      subdomain.name.includes(term)
    );
    return subdomains;
  }
);

export const fetchAsyncArtsSubdomains = createAsyncThunk(
  "subdomains/fetchAsyncArtsSubdomains",
  async (term) => {
    const response = await fetch(`/productApi/arts/subdomains`);
    const subdomains = await response.json();
    console.log(`fetched Arts subdomains: ${subdomains}`);
    subdomains.folders = subdomains.folders.filter((subdomain) =>
      subdomain.name.includes(term)
    );
    return subdomains;
  }
);

export const fetchAsyncCommerceSubdomains = createAsyncThunk(
  "subdomains/fetchAsyncCommerceSubdomains",
  async (term) => {
    const response = await fetch(`/productApi/commerce/subdomains`);
    const subdomains = await response.json();
    console.log(`fetched Commerce subdomains: ${subdomains}`);
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
    const response = await fetch(
      `/productApi/pdfs/${domain}/${subdomain}/${subject}`
    );
    const pdfs = await response.json();
    console.log(`fetched ${domain} ${subdomain} ${subject} pdfs: ${pdfs}`);
    return pdfs;
  }
);

export const fetchAsyncSubjectDetails = createAsyncThunk(
  "subdomains/fetchAsyncSubjectDetails",
  async ({ domain, subdomain, subject }) => {
    // params can't be separated
    const response = await fetch(
      `/productApi/details/${domain}/${subdomain}/${subject}`
    );

    const details = await response.json();
    const subjectMetaDataSecureUrl = await fetch(details.secure_url);
    const subjectMetaData = await subjectMetaDataSecureUrl.json();

    // concatenate details and subjectMetaData
    const subjectDetailsWithMetaData = {
      ...details,
      subject_meta_data: subjectMetaData,
    };

    console.log(
      `fetched ${domain} ${subdomain} ${subject} details: ${subjectDetailsWithMetaData}`
    );
    return subjectDetailsWithMetaData;
  }
);

export const fetchAsyncSubjectsImages = createAsyncThunk(
  "subdomains/fetchAsyncSubjectsImages",
  async ({ domain, subdomain, subject }) => {
    // params can't be separated
    const response = await fetch(
      `/productApi/images/${domain}/${subdomain}/${subject}`
    );
    // response is array of jsons
    console.log("response", response);
    const images = await response.json();
    console.log(`fetched ${domain} ${subdomain} ${subject} images: ${images}`);
    return images;
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
    [fetchAsyncSubjectPDFs.fulfilled]: (state, { payload }) => {
      console.log("Fetch of SubjectPDFs Successful ", payload);
      return { ...state, selectedSubjectPDFs: payload };
    },
    [fetchAsyncSubjectPDFs.rejected]: (state, { payload }) => {
      console.log("Fetch of SubjectPDFs Rejected ", payload);
      return { ...state, selectedSubjectPDFs: {} };
    },
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
