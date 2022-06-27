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

        // TODO: use State and condition on selected Cid
    const hiddenStyle = result.isLoading ? ' opacity-20' : ''
    const hoverStyle = result.data
    ? ' hover:cursor-not-allowed bg-opacity-20 scale-105'
    : ' hover:cursor-pointer hover:bg-opacity-20 hover:scale-105'
    
    console.log("🚀 ~ file: IpfsCard.js ~ line 47 ~ IpfsCard ~ result", result)
    return (
        <>
            <Box
                className={`${bg} p-3 rounded-xl shadow-xl bg-opacity-10 transform-gpu transition duration-300 ease-in-out ${hoverStyle}`}
                onClick={onCardClick}

            >
                {!true &&
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
