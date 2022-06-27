import { Box, Button, List, ListIcon, ListItem, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useGetCidQuery, useLazyGetCidQuery } from '../../app/bridgeApi'
import useMyToast from '../../hooks/useMyToast'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { IoSettings } from 'react-icons/io5'
import { v4 as uuid } from 'uuid';
import { converterBase2 } from 'byte-converter'
import { BezierSpinner } from '../Spinner/BezierSpinner'
import { selectFile } from '../../app/ipfsSlice'


export const IpfsCard = ({ ls }) => {

    const [isDownloading, setIsDownloading] = useState()

    const store = useSelector((state) => state.ipfsRedux)
    const dispatch = useDispatch()
    const toast = useMyToast()
    // use lazyQuery
    const [trigger, result, lastPromiseInfo] = useLazyGetCidQuery()

    const attrs = ['name', 'size', 'type']
    const spacing = 1
    const bg = useColorModeValue('bg-snow-muted font-bold', 'ring-1 ring-slate-900 bg-aqua-muted ')

    function onCardClick() {
        // TODO: uncheck files and remove from currentFiles array
        if (result.isSuccess) return;
        // Download the clicked file
        trigger({cid: ls.cid }, true)
    }


    useEffect(() => {
        if (result.isSuccess) {
            dispatch(selectFile({ cid: ls.cid, file: result.data }))
        } else if (result.isError) {
            toast('error', 'Failed to download file 😥', 'IpfsDownError')
        }
    }, [result, dispatch, ls])


    const fileSize = (ls['size'])
        ? converterBase2(ls['size'], 'B', 'MB').toFixed(3).toString() + ' MB'
        : 'unknown'

    const [hoverStyle, setHoverStyle] = useState(' bg-opacity-10 hover:cursor-pointer hover:bg-opacity-20 hover:scale-105')
    useEffect(() => {
        // Fix the card once it's downloaded
    if (store.selectedCid.includes(ls.cid)) {
        setHoverStyle(() => ' bg-opacity-20 scale-110')
    }
    },[ls, store])

    const hiddenStyle = result.isLoading ? ' opacity-20' : ''
    
    console.log("🚀 ~ file: IpfsCard.js ~ line 47 ~ IpfsCard ~ result", result)
    return (
        <>
            <Box
                className={`${bg} p-3 mb-3 rounded-xl shadow-xl transform-gpu transition duration-300 ease-in-out ${hoverStyle}`}
                onClick={onCardClick}

            >
                {result.isLoading &&
                    <div
                        className='fixed z-20 justify-center ml-11'
                    >
                        <BezierSpinner
                        // text={"DOWNLOADING..."} 
                        />
                    </div>
                }
                <div className={'flex flex-row z-10' + hiddenStyle}>

                    <List spacing={spacing}
                        className='mr-3'
                    >
                        {attrs.map((attr, i) => {
                            return (
                                <ListItem key={uuid()}>
                                    <ListIcon as={IoSettings} className='fill-aqua' />
                                    {attr + ':'}
                                </ListItem>
                            )
                        })
                        }
                    </List>
                    <List spacing={spacing}
                        className=''
                    >
                        {attrs.map((attr, i) => {
                            return (
                                <ListItem key={uuid()}>
                                    {(attr === 'size' ? fileSize : ls[attr]) || "unknown"}
                                </ListItem>
                            )
                        })
                        }
                    </List>
                </div>
            </Box>
        </>
    )
}
