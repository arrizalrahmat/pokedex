import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {GetMembersResponse, MembersStateType} from './type';

const initialState: MembersStateType = {
  members: [],
  isLoading: false,
  error: null,
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getMembers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Failed to fetch members';
      }),
});

export default membersSlice.reducer;

export const getMembers = createAsyncThunk(
  'members/getMembers',
  async () => {
    try {
      const url = 'https://randomuser.me/api/?results=5';
      const response = await fetch(url);
      const data =
        (await response.json()) as GetMembersResponse;
      return data.results;
    } catch (error) {
      throw new Error('Failed to fetch members');
    }
  },
);
