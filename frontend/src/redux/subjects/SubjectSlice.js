import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncEngineeringSubjects = createAsyncThunk(
    'subjects/fetchAsyncEngineeringSubjects',
    async (term) => {
        const response = await fetch(`/api/engineering/subdomains`)
        const subjects = await response.json()
        console.log(`fetched Engineering subjects: ${subjects}`)
        return subjects
    }
)

export const fetchAsyncArtsSubjects = createAsyncThunk(
    'subjects/fetchAsyncArtsSubjects',
    async (term) => {
        const response = await fetch(`/api/arts/subdomains`)
        const subjects = await response.json()
        console.log(`fetched Arts subjects: ${subjects}`)
        return subjects
    }
)

export const fetchAsyncCommerceSubjects = createAsyncThunk(
    'subjects/fetchAsyncCommerceSubjects',
    async (term) => {
        const response = await fetch(`/api/commerce/subdomains`)
        const subjects = await response.json()
        console.log(`fetched Commerce subjects: ${subjects}`)
        return subjects
    }
)

// TODO: Detail the subject
export const fetchAsyncSubjectDetail = createAsyncThunk(
    'subjects/fetchAsyncSubjectDetail',
    async (domain, subdomain, subject) => {
        const response = await fetch(`/api/${domain}/${subdomain}/${subject}`)
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

const subjectSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        // addSubjects now part of fetchAsyncSubjects
        // addSubjects: (state, action) => {
        //     state.subjects = action.payload;
        //     // {...state, payload} // old redux syntax // this is redux toolkit syntax
        // },
        removeSelectedSubject: (state) => {
            state.selectedSubject = {};
        }
    },
    extraReducers: {
        [fetchAsyncEngineeringSubjects.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfuly ", payload);
            return { ...state, engineering: payload };
        },
        [fetchAsyncEngineeringSubjects.rejected]: (state, { payload }) => {
            console.log("Fetched Rejected ", payload);
        },
        [fetchAsyncArtsSubjects.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfuly ", payload);
            return { ...state, arts: payload };
        },
        [fetchAsyncArtsSubjects.rejected]: (state, { payload }) => {
            console.log("Fetched Rejected ", payload);
        },
        [fetchAsyncCommerceSubjects.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfuly ", payload);
            return { ...state, commerce: payload };
        },
        [fetchAsyncCommerceSubjects.rejected]: (state, { payload }) => {
            console.log("Fetched Rejected ", payload);
        }
    }
});

export const {
    // addSubjects,
    removeSelectedSubject
} = subjectSlice.actions;


export const getAllEngineeringSubjects = (state) => state.subjects.engineering;
export const getAllArtsSubjects = (state) => state.subjects.arts;
export const getAllCommerceSubjects = (state) => state.subjects.commerce;
export const getSelectedSubject = (state) => state.subjects.selectedSubject;

export default subjectSlice.reducer;