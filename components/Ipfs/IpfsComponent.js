// This components requires a local IPFS node running on port 5001.
import { useState, useEffect } from 'react'
import { create } from 'ipfs-http-client'
import { create as create4Browser } from 'ipfs-core'
import { Box, Button, Input, InputGroup, InputLeftElement, Table, Text } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
// import { setIpfsDaemon } from '../../app/ipfsSlice'
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

      // TODO:Check if node is offline or ID has changed
      if (ipfs) return

      let node
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        console.log('Running on localhost!')
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
        const nodeIsOnline = await node.isOnline()

        setIpfs(node)
        setId(nodeId.id.string)
        setVersion(nodeVersion.version)
        setIsOnline(nodeIsOnline)

        // dispatch(setIpfsDaemon({ node, toast }))
        window.ipfsDaemon = node
        toast('success', ' IPFS node online 🎉', 'scsIN')
      }
    }
    init()
  }, [ipfs, dispatch, toast])

  const boxStyle = 'flex m-3 space-x-2  font-bold text-snow '

  if (!ipfs) {
    return <div className={boxStyle}>Connecting to IPFS...</div>
  }


  return (
    <div>
      <Box className="flex">
        <Box className={boxStyle}>
          <p data-test="status">IFPS:</p>
          <p data-test="statusv">{isOnline ? '🟢' : '😡'}</p>
        </Box>
        <Box className={boxStyle}>
          <p data-test="version">Version:</p>
          <p data-test="versionv">{version}</p>
        </Box>
        <Box className={boxStyle}>
          <p data-test="id">ID:</p>
          <p data-test="idv">{id || '🏴‍☠️'}</p>
        </Box>
      </Box>
    </div>
  )
}
