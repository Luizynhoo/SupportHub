import { Routes, Route } from 'react-router-dom'

import Private from './Private'


import SingnIn from '../Pages/SingnIn';
import SingnUp from '../Pages/SingnUp';

import Dashboard from '../Pages/Dashboard';
import Profile from '../Pages/Profile'

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<SingnIn/>}/>
            <Route path='/register' element={<SingnUp/>}/>

            <Route  path='/dashboard' element={ <Private><Dashboard/></Private> }/>
            <Route  path='/profile' element={ <Private><Profile/></Private> }/>
        </Routes>
    )
}


export default RoutesApp;