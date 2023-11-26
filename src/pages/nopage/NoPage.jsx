import React from 'react'
import Layout from "../../components/Layout/layout";
import {  useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
const NoPage = () => {
 const navigate = useNavigate();

  return (
 <Layout>
 <div>
      <h1>Oops !!  You redirected to the wrong page </h1>
      <button onClick={() => {navigate('/')}} >Redirect to HomePage</button>
  </div>  
 </Layout>
  )
}

export default NoPage
