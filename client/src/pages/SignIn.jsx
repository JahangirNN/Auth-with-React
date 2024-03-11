import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signInStart,signInSuccess, singInFailure } from '../redux/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const SignIn = () => {

  const [formData, SetFormData] = useState({});   
  const {error, loading} = useSelector((state)=> state.user);
  const [passwordType, SetPasswordType] = useState('password');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormData =(e)=>{
      SetFormData({...formData, [e.target.id]:e.target.value}
  )};
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const response = await fetch('/api/auth/sign-in', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if(data.success === false){
        dispatch(singInFailure(data.message));
        return;
      } 
      dispatch(signInSuccess(data));
      navigate('/');
    }
    catch(error){
      dispatch(singInFailure(error));
    }
    
  }

  let str = ''
  return (
    <div className=' p-3 max-w-lg mx-auto '>

      <h1 className='text-3xl text-center 
      font-semibold my-7'>
        Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>

        <input type='text' placeholder='E-mail'
        id='email' className='bg-slate-100 p-3
        rounded-lg' required
        onChange={handleFormData}/>

        
        <div className='relative'>
          <input type={passwordType} placeholder='Password'
          id='password' className='py-3 px-4 block w-full bg-slate-100  p-3
          rounded-lg' required
          onChange={handleFormData}/>

          <button onClick={() => {
            if(passwordType == 'password'){
              SetPasswordType('text')
            }
            else {
              SetPasswordType('password')
            }
          }} type="button"  className="absolute top-1 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
            <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
            <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
            <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"/>
            <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"/>
          </svg>
         </button>
        </div>
        
        <button disabled={loading} className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95
        disabled:opacity-60'>{loading? 'Loading...':'Sign-In'}</button>
      </form> 
      
      <div className='flex gap-2 mt-5'>
        <p>Dont have an Account?</p>
        <Link to={'/sign-up'}> 
        <span className='font-semibold text-blue-500'>Sign Up</span>
        </Link>
      </div>

      <p className='font-semibold 
      text-red-800 mt-5'>
      {error ?  error || 'Something went wrong!':''}</p>   
      
    </div>
  )
}

export default SignIn;