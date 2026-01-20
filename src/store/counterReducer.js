import { createAsyncThunk } from "@reduxjs/toolkit";

import createSlice from "../rtk-nut/createSlice";

// 模拟异步操作，比如从服务器获取数据
export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount) => {
    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

const counterReducer = createSlice({
  name: "counter",
  initialState: { value: 0, loading: false },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  // 处理异步action的状态
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

// 返回的increment 这些其实都是actionCreators
// 返回的是 {type:'counter/increment',payload: undefined} 这样的action对象
export const { increment, decrement, incrementByAmount } =
  counterReducer.actions;

export default counterReducer.reducer;
