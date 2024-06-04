
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchTeachers = createAsyncThunk('teacher/getAllTeacher', async () => {
    const response = await fetch('http://localhost:3001/teacher', { method: "GET" });
    const data = await response.json();
    return data;
})


const initialState = {
    data: [],
} as any

const teachersDetail = createSlice({
    name: "teachers",
    initialState,
    reducers: {
        addTeacherRecord: (state, action) => {
            state.data.push(action.payload);
        },
        deleteTeacherRecord: (state, action) => {
            state.data = state.data.filter((teacher) => teacher._id !== action.payload)
        },
        updateTeacherRecord: (state, action) => {
            const updatedTeacherIndex = state.data.findIndex(teacher => teacher._id === action.payload._id);
            if (updatedTeacherIndex !== -1) {
                state.data[updatedTeacherIndex] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTeachers.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const { addTeacherRecord, deleteTeacherRecord, updateTeacherRecord } = teachersDetail.actions;

export default teachersDetail.reducer
