import { Box } from '@chakra-ui/react'
import Header from '../components/Header'
import { IpfsComponent } from '../components/Ipfs/IpfsComponent'


export default function HomeWrapper({ children }) {
  return (
    <div
      className="flex flex-col h-screen justify-between"
    >
      <Header />
      <main
        className='mb-auto'
      >{children}</main>

      <footer className="text-left bg-gray-900 text-white text-xs">
        <IpfsComponent />
        <div className="text-center p-4" style={{ 'background-color': 'rgba(0, 0, 0, 0.2)' }}>
          © 2022 planetary Copyright:
          <a className="text-whitehite" href="https://github.com/3lLobo"> 3lLobo</a>
        </div>
      </footer>
    </div>
  )
}
