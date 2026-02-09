import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import MainLayout from './layouts/MainLayout'
import Users from './pages/Users'
import Roles from './pages/Roles'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
        </Route>
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
