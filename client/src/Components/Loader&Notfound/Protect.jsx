import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const Protect = () => {
    const { isAuthenticated ,loading} = useSelector(state => state.user);
    useEffect(() => {

    }, [isAuthenticated])
    if (isAuthenticated && !loading ) {
        return <Outlet/>
    }
    if(isAuthenticated===false && loading ===false){
      return <Navigate to='/login' />

    }


  
   
}

export default Protect