import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        signIn: (state, action) => {

            localStorage.setItem('token', action.payload.token);
            return action.payload;
        },
        signOut: (state, action) => {
            
            console.log('signout!')
            localStorage.removeItem('token');
            return null;
        }
    }
})

// Action creators are generated for each case reducer function
export const { signIn, signOut } = userSlice.actions;

export const selectUser = (state) => {
    
    if ('user' in state) {

        return state.user;
    }
    return null;
};

export default userSlice.reducer;