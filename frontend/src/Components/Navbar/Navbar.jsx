import React,{ useState,useContext,useRef,useEffect} from 'react';
import logo from "../Assets/logo.png";
import cart_icon from '../Assets/cart_icon.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from "../Assets/nav_dropdown_icon.png";

const Navbar = ()=>{

    const [menu,setMenu] = useState("shop");

    const {getTotalCartItems} = useContext(ShopContext);

    const menuRef = useRef();

    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open')
    }

    const comeToHome = ()=>{
        setMenu("shop");
    }


    return(
        <div className="navbar">
          <Link to="/" style={{textDecoration:"none"}}>   
            <div className='nav-logo' onClick={comeToHome}>
                <img src={logo} alt="logo-icon" />
                <p>SHOPIFY</p>
            </div>
            </Link>
            <img className='navbar-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="drop-down" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={()=> setMenu("shop")}><Link to="/" > Shop </Link> {menu ==="shop" ? <hr/> : <></>}</li>
                <li onClick={()=> setMenu("men")}> <Link to="/men"> Men</Link>{menu ==="men" ? <hr/> : <></>}</li>
                <li onClick={()=> setMenu("women")}><Link to="/women"> Women</Link>{menu ==="women" ? <hr/> : <></>}</li>
                <li onClick={()=> setMenu("kids")}><Link to="/kids"> Kids</Link>{menu ==="kids" ? <hr/> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem('auth-token')?
                <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                :<Link to="/login"><button>Login</button> </Link> }
               
                <Link to="/cart"><img src={cart_icon} alt="cart_icon" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>

        </div>
    )
}

export default Navbar;