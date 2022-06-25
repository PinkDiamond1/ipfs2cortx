import { createSlice } from '@reduxjs/toolkit'
import { ipfsGetFile } from '../lib/ipfsUtil'

export const ipfsReduxSlice = createSlice({
  name: 'ipfsRedux',
  initialState: {
    ipfsDaemon: null,
    currentFile: null,
    CID: '',
    name: '',
    size: '',
    deployed: false,
  },
  reducers: {
    setIpfsDaemon: (state, action) => {
      // Set the ipfs daemon
      const { node, toast } = action.payload
      state.ipfsDaemon = node
      if (node.isOnline()) {
        toast('success', ' IPFS node online 🎉', 'scsIN')
      }
    },
    setCid: (state, action) => {
      // Get the name, size and download the file.
      const { CID, toast } = action.payload
      state.CID = CID
      // let response
      // try {
      //     // let response = ipfsGetFile(state.ipfsDaemon, CID)
      //     response = state.ipfsDaemon.object.ls(state.CID)
      // }
      // catch (err) { console.log(err) }
      // console.log(response)
    },
    getFile: (state) => {
      // Download the file from the given CID.
      let response = state.ipfsDaemon.get(state.CID)
      console.log(response)
      // TODO: Unpack and assign
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

export const { setIpfsDaemon, setCid, getFile, deployFile, resetFile } = ipfsReduxSlice.actions

export default ipfsReduxSlice.reducer
