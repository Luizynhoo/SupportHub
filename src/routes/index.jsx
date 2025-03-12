import { Routes, Route } from 'react-router-dom'

import SingnIn from '../Pages/SingnIn';
import SingnUp from '../Pages/SingnUp';

import Dashboard from '../Pages/Dashboard';

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<SingnIn/>}/>
            <Route path='/register' element={<SingnUp/>}/>

            <Route  path='/dashboard' element={<Dashboard/>}  />
        </Routes>
    )
}


export default RoutesApp;