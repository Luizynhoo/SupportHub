import { Routes, Route } from 'react-router-dom'

import Private from './Private'


import SingnIn from '../Pages/SingnIn';
import SingnUp from '../Pages/SingnUp';

import Dashboard from '../Pages/Dashboard';
import Profile from '../Pages/Profile'
import Customers from '../Pages/Customers';
import New from '../Pages/New';

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<SingnIn/>}/>
            <Route path='/register' element={<SingnUp/>}/>

            <Route path='/Customers' element={<Private><Customers/></Private>}/>
            <Route  path='/Dashboard' element={ <Private><Dashboard/></Private> }/>
            <Route  path='/Profile' element={ <Private><Profile/></Private> }/>

            //"subpags"
            <Route path='/Dashboard/New' element={<Private><New/></Private>}/>
        </Routes>
    )
}


export default RoutesApp;