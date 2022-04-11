import { configureStore } from '@reduxjs/toolkit';
import subjectsReducer from './slices/SubjectSlice';

export const store = configureStore({
    reducer: {
        subjects: subjectsReducer,
    },
});
