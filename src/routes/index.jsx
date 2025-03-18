import { Routes, Route } from 'react-router-dom'

import Private from './Private'


import SingnIn from '../Pages/SingnIn';
import SingnUp from '../Pages/SingnUp';

import Dashboard from '../Pages/Dashboard';

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<SingnIn/>}/>
            <Route path='/register' element={<SingnUp/>}/>

            <Route  path='/dashboard' element={ <Private><Dashboard/></Private> }/>
        </Routes>
    )
}


export default RoutesApp;