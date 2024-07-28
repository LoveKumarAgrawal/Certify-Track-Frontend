import { configureStore } from '@reduxjs/toolkit'
import studentReducer from '../redux/features/studentSlice'
import authReducer from '../redux/features/authSlice'
import teacherReducer from '../redux/features/teacherSlice'

export const store = configureStore({
    reducer: {
        student: studentReducer,
        user: authReducer,
        teacher: teacherReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch 