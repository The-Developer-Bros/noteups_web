import { configureStore } from '@reduxjs/toolkit';
import subjectsReducer from './subjects/SubjectSlice';

export const store = configureStore({
    reducer: {
        subjects: subjectsReducer,
    },
});
