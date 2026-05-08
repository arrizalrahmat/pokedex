import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  pokemons: [],
  previous: null,
  next: null,
  offset: 0,
  isLoading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setOffSet: (state, action) => {
      state.offset = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getPokemons.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemons = action.payload.details;
        state.previous = action.payload.data.previous;
        state.next = action.payload.data.next;
        state.offset = action.payload.data.offset;
      })
      .addCase(getPokemons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }),
});

export default pokemonSlice.reducer;

export const {setOffSet} = pokemonSlice.actions;

export const getPokemons = createAsyncThunk(
  'pokemon/getPokemons',
  async payload => {
    try {
      const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
      const response = await fetch(payload?.url || baseUrl);
      const data = await response.json();

      const details = await Promise.all(
        data.results.map(async e => {
          const res = await fetch(e.url);
          const detail = await res.json();
          return {
            ...e,
            detail,
          };
        }),
      );

      return {details, data};
    } catch (error) {
      throw new Error(error);
    }
  },
);
