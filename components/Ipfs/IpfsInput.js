import { useState, useEffect } from 'react'
import { Box, Button, Input, InputGroup, InputLeftElement, Table, Text } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../../app/counterSlice'
import Image from 'next/image'
import { getFile, setCid } from '../../app/ipfsSlice'
import useMyToast from '../../hooks/useMyToast'

export default function IpfsInput() {
  const ipfsState = useSelector((state) => state.ipfsRedux)
  const dispatch = useDispatch()
  const toast = useMyToast()

  function handleInput(event) {
    event.preventDefault()
    const currentCid = event.target.value
    console.log('🚀 ~ file: cidInput.js ~ line 14 ~ handleInput ~ currentCid', currentCid)
    // TODO: check for valid CID
    if (currentCid.length > 11) {
      dispatch(setCid({ CID: currentCid, toast }))
    }
  }

  async function handleGetFile() {
    // //  Get the file from IPFS
    // // let response = ipfsState.ipfsDaemon.get(state.CID)
    // let response = await ipfsState.ipfsDaemon.ls('QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF')
    // // let response = await ipfsState.ipfsDaemon.ls('QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A')
    // console.log(response[0])
    //  Get the file from IPFS
    // let response = ipfsState.ipfsDaemon.get(state.CID)
    // const response = await ipfs.ls('QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF')
    // // let response = await ipfsState.ipfsDaemon.ls('QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A')
    // console.log(response)
    const cid = 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'

    for await (const file of ipfsState.ipfsDaemon.ls(cid)) {
      console.log(file)
    }
  }

  return (
    <>
      <Box className="flex m-3">
        <div className="min-w-fit mr-3 align-text-bottom">IPFS CID here:</div>
        <div>
          <InputGroup h="7">
            <InputLeftElement h="7">
              <Image layout="fill" alt="ipfsSmallBox" src="/ipfs-logo.svg" />
            </InputLeftElement>
            <Input h="7" onChange={handleInput} placeholder="<myCID>"></Input>
          </InputGroup>
        </div>
      </Box>
      <Box>{ipfsState.Cid || ''}</Box>
      <Button onClick={handleGetFile}>Get File</Button>
    </>
  )
}
