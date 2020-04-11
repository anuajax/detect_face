import React from 'react';
import './Nav.css'
const Navigation = ({ onRouteChange, isLoggedIn}) => {
if(isLoggedIn){
    return(
        <nav>
            <ul>
                <li onClick={() => onRouteChange('signout')} className="f3">SignOut</li>
            </ul>
        </nav>
    );
    
}
else{
    return(
    <nav>
            <ul>
                <li onClick={() => onRouteChange('signin')} className="f3">SignIn</li>
                <li onClick={() => onRouteChange('register')} className="f3">Register</li>
            </ul>
        </nav>
    );
}
}
export default Navigation;