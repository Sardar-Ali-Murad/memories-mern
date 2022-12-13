import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Landing,Posts,Error,ProtectedRoute} from  "./components/index.js"
import Register from './components/Register.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/posts" element={
            <ProtectedRoute>
                <Posts/>
            </ProtectedRoute>
          }/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
