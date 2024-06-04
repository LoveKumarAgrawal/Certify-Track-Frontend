// import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

// export const fetchStudents = createAsyncThunk('students/getAllStudents', async (thunkApi) => {
//     const response = await fetch('http://localhost:3001/student', { method: "GET" });
//     const data = await response.json();
//     return data;
// })

// interface UsersState {
//     entities: any;
//     loading: 'idle' | 'pending' | 'succeeded' | 'failed';
// }

// const initialState = {
//     entities: [],
//     loading: 'idle',
// } as UsersState

// const studentsAdapter = createEntityAdapter()


// const studentsDetail = createSlice({
//     name: "students",
//     initialState: studentsAdapter.getInitialState(),
//     reducers: {
//         getData: (state) => {
//             state.entities;
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchStudents.fulfilled, (state, action) => {
//             studentsAdapter.upsertMany(state, action.payload.students)
//         })
//     }
// })

// export const {
//     selectById: selectUserById,
//     selectIds: selectUserIds,
//     selectEntities: selectUserEntities,
//     selectAll: selectAllUsers,
//     selectTotal: selectTotalUsers,
// } = studentsAdapter.getSelectors((state: any) => state.entities)

// export default studentsDetail.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchStudents = createAsyncThunk('student/getAllStudent', async () => {
    const response = await fetch('http://localhost:3001/student', { method: "GET" });
    const data = await response.json();
    return data;
})


const initialState = {
    data: [],
} as any

const studentsDetail = createSlice({
    name: "students",
    initialState,
    reducers: {
        addStudentRecord: (state, action) => {
            state.data.push(action.payload);
        },
        deleteStudentRecord: (state, action) => {
            state.data = state.data.filter((student) => student._id !== action.payload)
        },
        updateStudentRecord: (state, action) => {
            const updatedStudentIndex = state.data.findIndex(student => student._id === action.payload._id);
            if (updatedStudentIndex !== -1) {
                state.data[updatedStudentIndex] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const { addStudentRecord, deleteStudentRecord, updateStudentRecord } = studentsDetail.actions;

export default studentsDetail.reducer
