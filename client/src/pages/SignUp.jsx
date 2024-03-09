import { useState } from 'react';
import {Link} from 'react-router-dom';

const SignUp = () => {

  const [formData, SetFormData] = useState({});   
  const [error, SetError] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [success, SetSuccess] = useState(false);
  
  const handleFormData =(e)=>{
      SetFormData({...formData, [e.target.id]:e.target.value}
  )};
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      SetLoading(true);
      const response = await fetch('/api/auth/sign-up', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      SetLoading(false);
      
      if(data.success === false){
        SetError(true);
        SetSuccess(false);
        return;
      } 
      SetError(false);
      SetSuccess(true);
    }
    catch(error){
      SetError(true);
      SetLoading(false);
      SetSuccess(false);
    }
    
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center 
      font-semibold my-7'>
        Sign Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type='text' placeholder='Username'
        id='username' className='bg-slate-100 p-3
        rounded-lg' 
        onChange={handleFormData}/>

        <input type='text' placeholder='E-mail'
        id='email' className='bg-slate-100 p-3
        rounded-lg' 
        onChange={handleFormData}/>

        <input type='password' placeholder='Password'
        id='password' className='bg-slate-100 p-3
        rounded-lg' 
        onChange={handleFormData}/>

        <button disabled={loading} className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95
        disabled:opacity-60'>{loading? 'Loading...':'Sign-Up'}</button>
      </form> 
      
      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to={'/sign-in'}> 
        <span className='font-semibold text-blue-500'>Sign in</span>
        </Link>
      </div>

      {error? <p className='font-semibold 
      text-red-800 mt-5'>
      'Something went wrong!'</p> : success &&
      <p className='font-semibold 
      text-green-500 mt-5'>
      User Created Successfully!</p> }  
      
    </div>
  )
}

export default SignUp