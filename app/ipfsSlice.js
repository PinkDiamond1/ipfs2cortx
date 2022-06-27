import { createSlice } from '@reduxjs/toolkit'
import { all } from 'it-all'

export const ipfsReduxSlice = createSlice({
  name: 'ipfsRedux',
  initialState: {
    // ipfsDaemon: null,
    cid: null,
    selectedCid: new Array, 
    selectedFiles: new Array,
    deployed: false,
  },
  reducers: {
    // setIpfsDaemon: (state, action) => {
    //   // Set the ipfs daemon
    //   const { node, toast } = action.payload
    //   state.ipfsDaemon = node
    //   if (node.isOnline()) {
    //     toast('success', ' IPFS node online 🎉', 'scsIN')
    //   }
    // },
    setCid: (state, action) => {
      // Get the file information from the current cid.
      const { cid, toast } = action.payload
      console.log("🚀 ~ file: ipfsSlice.js ~ line 26 ~ cid", cid)
      state.cid = cid
    },
    selectFile: (state, action) => {
      const { cid, file} = action.payload
      // TODO: check if cid is already in list or make a dict.
      state.selectedCid.push(cid)
      console.log("🚀 ~ file: ipfsSlice.js ~ line 31 ~ selectedCid", state.selectedCid.length)
      state.selectedFiles.push(file)
      
    },
    deployFile: (state) => {
      // Deploy the file to CORTX
      if (true) {
        state.deployed = true
      }
    },
    resetFile: (state) => {
      state = state.initialState
    },
  },
})

export const { setIpfsDaemon, setCid, selectFile, deployFile, resetFile } = ipfsReduxSlice.actions

export default ipfsReduxSlice.reducer
