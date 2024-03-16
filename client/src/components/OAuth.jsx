import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const response = await fetch('api/auth/google', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo:result.user.photoURL,
                })
                
            });
            const data = await response.json();
            dispatch(signInSuccess(data));  
            navigate('/');            
        }
        catch(error){
            console.log('Could not login with google', error);

        }
    }

    return (
    
    <button type='button' onClick={handleGoogleClick} className='border-4 border-solid border-black 
    rounded-lg 
    outline-offset-3 outline-gray-800 bg-red-600  p-3 uppercase text-white dark:border-white font-semibold hover:opacity-85'>Continue With Google</button>
  )
}

export default OAuth