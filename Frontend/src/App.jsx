
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/AuthenticationPages/LoginPage';
import SignUpPage from './Pages/AuthenticationPages/SignUpPage';

function App() {
  

  return (
    <>
    <BrowserRouter>
    <header>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </header>
   </BrowserRouter>
    </>
  )
}

export default App
