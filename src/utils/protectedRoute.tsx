import React,{ReactNode,Component, ReactChild, ReactChildren, ComponentType} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import rootReducers, { RootState } from 'store/store';


const ProtectedRoute= ( children: any , component: ComponentType, ...rest: any[] ) => {
  const user = useSelector((state: RootState) => {
    return state.auth.user;
  });
  
  
  //useSelector((state)  => state.auth.user)
  
  return user
    ? (<Route {...rest} component={component} />)
    : (<Redirect to={'/login'} />)
}

export default ProtectedRoute