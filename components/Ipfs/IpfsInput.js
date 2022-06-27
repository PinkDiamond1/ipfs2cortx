import { useState, useEffect } from 'react'
import { Box, Button, Input, InputGroup, InputLeftElement, Table, Text, Image } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import useMyToast from '../../hooks/useMyToast'
import all from 'it-all'
import { getFile, setCid } from '../../app/ipfsSlice'

export default function IpfsInput() {
  const store = useSelector((state) => state.ipfsRedux)
  const toast = useMyToast()
  const dispatch = useDispatch()

  function handleInput(event) {
    event.preventDefault()
    const currentCid = event.target.value
    console.log('🚀 ~ file: cidInput.js ~ line 14 ~ handleInput ~ currentCid', currentCid)
    // TODO: check for valid CID
    if (currentCid.length > 11) {
      // const currentCid = 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'
      dispatch(setCid({ cid: currentCid, toast }))
    }
  }

  return (
    <>
      <Box className="m-3 sticky top-28 z-50">
        {store.currentCid && <div
          className="min-w-fit mr-3 align-text-bottom mb-3 font-semibold"
        >
          Paste your IPFS CID:
        </div>}
        <div>
          <InputGroup h="7">
            <InputLeftElement
              h="7"
              className=''
            >
              <Image alt="ipfsSmallBox" src="/ipfs-logo.svg" h={41} />
            </InputLeftElement>
            <Input h="7" rounded='xl' fontWeight='semibold' onChange={handleInput} placeholder={store.currentCid ||"<myCID>"} size='xs' variant='filled'></Input>
          </InputGroup>
        </div>
      </Box>
    </>
  )
}
