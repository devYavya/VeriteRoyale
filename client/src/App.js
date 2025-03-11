import React from 'react';
import './App.css';
import Preloader from './component/screen/Preloader';
import NavBar from './component/screen/Navbar';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Home from './component/screen/Home';
import Fragrances from './component/screen/Fragrances';
import Login from './component/User/Login';
import Regster from './component/User/Regster';
import HomeMain from './component/screen/HomeMain';
import OurWorld from './component/screen/OurWorld';
import NewArrivals from './component/screen/NewArrivals';
import Dashboard from './component/Admin/Dashboard';
import Product from './component/Admin/Product';
import ViewProduct from './component/Admin/ViewProduct';
import ViewUsers from './component/Admin/ViewUsers';
import AdminLogin from './component/Admin/AdminLogin';
// import Sidenav from './component/Admin/Sidebar';
import Cart from './component/screen/Cart';
import PurchaseOrder from './component/Admin/PurchaseOrder';
import Checkout from './component/screen/Checkout';
import Stories from './component/screen/Stories';
import ViewFeedback from './component/Admin/ViewFeedback';
import Services from './component/screen/Services';
import CustomeProduct from './component/Admin/Customeproduct';
import Edit from './component/Admin/Edit';
import ResetPassword from './component/screen/reset-password';
import NotFound from './component/NotFound';

function App() {
  return (
    <>
      <Preloader />
      <BrowserRouter>
        <RouteWrapper />
      </BrowserRouter>
    </>
  );
}

function RouteWrapper() {
  const user = localStorage.getItem("token")
  // const admin = localStorage.getItem("Admintoken")
  const location = useLocation(); // Get the current route location
  const hideNavBarRoutes = ['/Login', '/Regster','/Dashboard','/Product','/AdminLogin','/ViewProduct','/ViewUsers','/PurchaseOrder','/ViewFeedback','/Customeproduct','/Checkout','/edit','/reset-password'];
  // const hideSidenav = ['/Login', '/Regster','/OurWorld','/NewArrivals','/HomeMain','/AdminLogin','/Fragrances'];

  const shouldHideNavBar = hideNavBarRoutes.some(route => location.pathname.startsWith(route));
  // const shouldHideSidenav = hideSidenav.some(route=>location.pathname.startsWith(route));
  
  return (
    <>
        {!shouldHideNavBar && <NavBar />}
        {/* {!shouldHideSidenav && <Sidenav/>} */}
      <Routes>
        <Route path="*" element={<NotFound />} />
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regster" element={<Regster />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {user && <Route path="/HomeMain" element={<HomeMain/>}/>}
        <Route path="/OurWorld" element={<OurWorld/>}/>
        <Route path="/NewArrivals" element={<NewArrivals/>}/>
        <Route path="/Fragrances" element={<Fragrances />} />
        <Route path="/Checkout" element={<Checkout/>}/>
        <Route path="/Stories" element={<Stories/>}/>
        <Route path="/Services" element={<Services/>}/>

        {user && <Route path="/cart" element={<Cart/>}/>}        
        <Route path="/AdminLogin" element={<AdminLogin/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Product" element={<Product/>}/>
         <Route path="/ViewProduct" element={<ViewProduct/>}/>
        <Route path="/ViewUsers" element={<ViewUsers/>}/>
        <Route path="/PurchaseOrder" element={<PurchaseOrder/>}/>
        <Route path="/ViewFeedback" element={<ViewFeedback/>}/>
        <Route path="/Customeproduct" element={<CustomeProduct/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        
        
        {/* <Route path='/' element={<Navigate replace to = "/"/>}></Route> */}
      </Routes>
    </>
  );
}

export default App;

// function App() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <>
//       // Contains all the routes which starts from '/'
//       <Route path='/' element={<AuthLayout />}>
//         <Route index element={<Landing/>}></Route> // initial page or starting page
//         <Route path='/login' element={<LoginPage/>}></Route>
//         <Route path='/signin' element={<SigninPage/>}></Route>
//       </Route>
	
//       // Contains all the routes which starts from '/home'
//       // All the routes of user like profile cart view product etc
//       <Route path='/home' element={<HomeMaster/>}>
//         <Route index element={<HomePage/>}/>
//       </Route>
//       // Contains all the routes which starts from '/admin'
//       // All the routes of admin
//       <Route path='/admin' element={<AdminMaster/>}>
//         <Route index element={<AdminHomePage/>}/> // page to show for '/admin' path or first page of the admin
//         // All admin routes like product list, user list, view product, create & update product
// 	<Route path='/admin/ebooks' element={<BookListPage/>}/>
//         <Route path='/admin/ebooks/addBook' element={<AddBookPage title={"Add Book"} isUpdate={false}/>}/>
//         <Route path='/admin/ebooks/updateBook/:id' element={<AddBookPage title={"Update Book"} isUpdate={true}/>}/>
//         <Route path='/admin/category' element={<BookCategoryPage/>}/>
//         <Route path='/admin/users' element={<UserListPage/>}/>
//         <Route path='/admin/purchasereport' element={<PurchaseReport/>}/>
//       </Route>
//       </>
//     )
//   )

//   return <RouterProvider router={router}/>;
// }