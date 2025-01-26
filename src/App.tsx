import {AppContextProvider} from '@app/contexts'

import {Outlet} from 'react-router-dom'

import {Layout} from '@app/components'

import {FC} from 'react'



const Index: FC = () => <AppContextProvider><Layout><Outlet/></Layout></AppContextProvider>

export default Index