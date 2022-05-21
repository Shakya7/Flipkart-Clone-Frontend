import './App.css';
import "./ItemsPage.css";
import { Navbar } from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ItemsPage from './components/ItemsPage';
import CartPage from './components/CartPage';
import { SingleItemPage } from './components/SingleItemPage';
import { GlobalProvider } from './components/GlobalContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProfilePage from './components/ProfilePage';
import OrdersPage from './components/OrdersPage';
import { ResetPass } from './components/ResetPassword';
import { PageNotFoundError } from './components/error-UI/PageNotFoundError';
import { _500ServerError } from './components/error-UI/_500ServerError';


function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navbar/>}>
              <Route index element={<ItemsPage/>}/>
              <Route path=":id" element={<SingleItemPage/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="resetPassword/:token" element={<ResetPass/>}/>
              <Route path="signup" element={<SignUp/>}/>
              <Route path='cart' element={<CartPage/>}/>
              <Route path="profile" element={<ProfilePage/>}>
                <Route path="addresses" element={<ProfilePage/>}/>
                <Route path="wishlist" element={<ProfilePage/>}/>
              </Route>
              <Route path="orders" element={<OrdersPage/>}/>
              <Route path="*" element={<PageNotFoundError/>}/>
            </Route>
            <Route path="*" element={<_500ServerError/>} />
          </Routes>
        </div>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
