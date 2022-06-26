// This components requires a local IPFS node running on port 5001.
import { useState, useEffect } from 'react'
import { create } from 'ipfs-http-client'
import { create as create4Browser } from 'ipfs-core'
import { Box, Button, Input, InputGroup, InputLeftElement, Table, Text } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { setIpfsDaemon } from '../../app/ipfsSlice'
import useMyToast from '../../hooks/useMyToast'

export function IpfsComponent(props) {
  const [id, setId] = useState(null)
  const [ipfs, setIpfs] = useState(null)
  const [version, setVersion] = useState(null)
  const [isOnline, setIsOnline] = useState(false)

  const dispatch = useDispatch()
  const toast = useMyToast()

  useEffect(() => {
    const init = async () => {
      if (ipfs) return

      let node
      if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        console.log("Running on localhost!")
        node = await create({
          url: 'http://localhost:5001/api/v0',
          // url: 'http://127.0.0.1:45005/api/v0',
        })
      } else {
        node = await create4Browser()
      }
      if (node) {

        const nodeId = await node.id()
        const nodeVersion = await node.version()
        const nodeIsOnline = node.isOnline()

        setIpfs(node)
        setId(nodeId.id)
        setVersion(nodeVersion.version)
        setIsOnline(nodeIsOnline)

        dispatch(setIpfsDaemon({ node, toast }))
      }
    }

    init()
  }, [ipfs])

  // Checks if a new file has been selected. If yes the old link should dissapear
  const [newFile, setNewFile] = useState(true)
  useEffect(() => {
    setNewFile(() => false)
  }, [props.state])

  if (!ipfs) {
    return <div className="f5 ma0 pb2 aqua fw4 montserrat">Connecting to IPFS...</div>
  }

  console.log(id)
  return (
    <div>
      <Box className="flex">
        <Box className="m-3">
          <h4 data-test="id">ID:</h4>
          <h4 data-test="version">Version:</h4>
          <h4 data-test="status">Status:</h4>
        </Box>
        <Box className="m-3">
          <h4 data-test="id">{id.string}</h4>
          <h4 data-test="version">{version}</h4>
          <h4 data-test="status">{isOnline ? 'Online' : 'Offline'}</h4>
        </Box>
      </Box>
    </div>
  )
}
