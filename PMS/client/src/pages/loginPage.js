import LoginComp from "../components/loginComp";
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; 
export default function LoginPage() {
    return (
      <Provider store={store}>
          <LoginComp/>
          </Provider>
    )
  }