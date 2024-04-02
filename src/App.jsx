import React from 'react'
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/cart/Cart'
import Dashboard from './pages/admin/dashboard/Dashboard'
import NoPage from './pages/nopage/NoPage'
import MyState from './context/data/myState'
import Login from './pages/registration/Login'
import SignUp from './pages/registration/SignUp'
import ProductInfo from './pages/productInfo/ProductInfo'
import AddProduct from './pages/admin/page/AddProduct'
import UpdateProduct from './pages/admin/page/UpdateProduct'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Allproducts from './pages/allproducts/AllProducts'

function App() {
  return (
    <MyState>
      <BrowserRouter>
    <Routes>
        <Route path = "/" element={<Home ></Home>}></Route>
        <Route path="/allproducts" element={<Allproducts></Allproducts>} />
        
        <Route path = "/cart" element={<Cart></Cart>}></Route>
        <Route path = "/dashboard" element={
          <ProtectedRoutesForAdmin>
             <Dashboard></Dashboard>
          </ProtectedRoutesForAdmin>}></Route> 
        <Route path = "/login" element={<Login></Login>}></Route> 
        <Route path = "/signup" element={<SignUp></SignUp>}></Route> 
        <Route path = "/productinfo/:id" element={<ProductInfo></ProductInfo>}></Route> 
        <Route path = "/addproduct" element={
        <ProtectedRoutesForAdmin>
          <AddProduct></AddProduct>
        </ProtectedRoutesForAdmin>}></Route> 
        <Route path = "/updateproduct" element={
        <ProtectedRoutesForAdmin>
       <UpdateProduct></UpdateProduct>
      </ProtectedRoutesForAdmin>}></Route> 
        <Route path = "/*" element={<NoPage></NoPage>}></Route>
    </Routes>
    <ToastContainer></ToastContainer>
    </BrowserRouter>
    </MyState>
  )
}

export default App

//for user
export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('user')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}

//for admin
export const ProtectedRoutesForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  console.log(admin.user.email)
  if (admin.user.email === 'admindeep@gmail.com') {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}
