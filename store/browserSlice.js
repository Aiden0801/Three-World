import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
const initialState = {
   curBrowser: 0,
   curUrl: '',
   data: [
      {
         name: '',
         url: '',
      },
      {
         name: '',
         url: '',
      },
      {
         name: '',
         url: '',
      },
      {
         name: '',
         url: '',
      },
   ],
   command: {
      type: 0,
      handling: 0,
   },
}

export const browserSlice = createSlice({
   name: 'browser',
   initialState,
   reducers: {
      setURL(state, action) {
         state.curUrl = action.payload
      },
      setBrowser(state, action) {
         state.curBrowser = action.payload
      },
      setDataByIndex(state, action) {
         state.data[action.payload.index] = action.payload.data
         // state.data = action.payload;
      },
      setCommand(state, action) {
         state.command = action.payload
      },
      extraReducers: {
         [HYDRATE]: (state, action) => {
            return {
               ...state,
               ...action.payload.browser,
            }
         },
      },
   },
})
export const { setURL, setBrowser, setDataByIndex, setCommand } =
   browserSlice.actions
export const getCurrentURL = (state) => state.browser.curUrl
export const getCurrentBrowser = (state) => state.browser.curBrowser
export const getCurrentBrowserData = (state) => {
   return {
      index: state.browser.curBrowser,
      data: state.browser.data[state.browser.curBrowser],
   }
}
export const getDataByIndex = (id) => (state) => {
   return state.browser.data[id]
}
export const getCommand = (state) => state.browser.command

export default browserSlice.reducer
