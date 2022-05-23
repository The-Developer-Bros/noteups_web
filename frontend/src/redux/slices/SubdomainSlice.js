import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncEngineeringSubdomains = createAsyncThunk(
    'subdomains/fetchAsyncEngineeringSubdomains',
    async (term) => {
        const response = await fetch(`/productApi/engineering/subdomains`)
        const subdomains = await response.json()
        console.log(`fetched Engineering subdomains: ${subdomains}`)
        subdomains.folders = subdomains.folders.filter(subdomain => subdomain.name.includes(term))
        return subdomains
    }
)

export const fetchAsyncArtsSubdomains = createAsyncThunk(
    'subdomains/fetchAsyncArtsSubdomains',
    async (term) => {
        const response = await fetch(`/productApi/arts/subdomains`)
        const subdomains = await response.json()
        console.log(`fetched Arts subdomains: ${subdomains}`)
        subdomains.folders = subdomains.folders.filter(subdomain => subdomain.name.includes(term))
        return subdomains
    }
)

export const fetchAsyncCommerceSubdomains = createAsyncThunk(
    'subdomains/fetchAsyncCommerceSubdomains',
    async (term) => {
        const response = await fetch(`/productApi/commerce/subdomains`)
        const subdomains = await response.json()
        console.log(`fetched Commerce subdomains: ${subdomains}`)
        subdomains.folders = subdomains.folders.filter(subdomain => subdomain.name.includes(term))
        return subdomains
    }
)

// TODO: Detail the subdomain
export const fetchAsyncSubjectDetail = createAsyncThunk(
    'subdomains/fetchAsyncSubjectDetail',
    async (domain, subdomain, subject) => {
        const response = await fetch(`/productApi/${domain}/${subdomain}/${subject}`)
        const detail = await response.json()
        console.log(`fetched ${domain} ${subdomain} ${subject} detail: ${detail}`)
        return detail
    }
)

const initialState = {
    engineering: {},
    arts: {},
    commerce: {},
    selectedSubject: {},
}

const subdomainSlice = createSlice({
    name: 'subdomains',
    initialState,
    reducers: {
        // addSubdomains now part of fetchAsyncSubdomains
        // addSubdomains: (state, action) => {
        //     state.subdomains = action.payload;
        //     // {...state, payload} // old redux syntax // this is redux toolkit syntax
        // },
        removeSelectedSubject: (state) => {
            state.selectedSubject = {};
        }
    },
    extraReducers: {
        [fetchAsyncEngineeringSubdomains.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfuly ", payload);
            return { ...state, engineering: payload };
        },
        [fetchAsyncEngineeringSubdomains.rejected]: (state, { payload }) => {
            console.log("Fetched Rejected ", payload);
        },
        [fetchAsyncArtsSubdomains.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfuly ", payload);
            return { ...state, arts: payload };
        },
        [fetchAsyncArtsSubdomains.rejected]: (state, { payload }) => {
            console.log("Fetched Rejected ", payload);
        },
        [fetchAsyncCommerceSubdomains.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfuly ", payload);
            return { ...state, commerce: payload };
        },
        [fetchAsyncCommerceSubdomains.rejected]: (state, { payload }) => {
            console.log("Fetched Rejected ", payload);
        }
    }
});

export const {
    // addSubdomains,
    removeSelectedSubject
} = subdomainSlice.actions;


export const getAllEngineeringSubdomains = (state) => state.subdomains.engineering;
export const getAllArtsSubdomains = (state) => state.subdomains.arts;
export const getAllCommerceSubdomains = (state) => state.subdomains.commerce;
export const getSelectedSubject = (state) => state.subdomains.selectedSubject;

export default subdomainSlice.reducer;