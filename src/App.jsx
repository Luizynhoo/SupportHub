import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes';
import { ToastContainer } from 'react-toastify';

import AuthProvider from './contexts/auth'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000} />
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
