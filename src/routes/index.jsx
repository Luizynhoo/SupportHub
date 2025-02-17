import { Routes, Route } from 'react-router-dom'

import SingnIn from '../Pages/SingnIn';
import SingnUp from '../Pages/SingnUp';

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<SingnIn/>}/>
            <Route path='/register' element={<SingnUp/>}/>
        </Routes>
    )
}


export default RoutesApp;