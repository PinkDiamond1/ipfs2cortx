// import IpfsComponent from "../components/Ipfs/ipfs";

import HomeWrapper from '../components/layout'
import { useEffect, useState } from 'react'
import { IpfsBox } from '../components/Ipfs/IpfsBox'
import { S3Box } from '../components/Aws/S3box'
// import { S3React } from '../components/Aws/S3React'
import IpfsInput from '../components/Ipfs/IpfsInput'
import IpfsLs from '../components/Ipfs/IpfsLs'

import { useSelector, useDispatch } from 'react-redux'
import useMyToast from '../hooks/useMyToast'

export default function Home() {
  const store = useSelector((state) => state.ipfsRedux)
  const toast = useMyToast()

  return (
    <HomeWrapper>
      <div className="flex mr-11 ">
        <IpfsBox>
          <IpfsInput />
          {store.cid && <IpfsLs />}
        </IpfsBox>
        <S3Box>{/* <S3React></S3React> */}</S3Box>
      </div>
    </HomeWrapper>
  )
}
