import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import {signOut, updateUserFailure, updateUserStart, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } from "../redux/user/userSlice";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, SetImage] = useState(undefined);
  const {currentUser, loading, error} = useSelector((state)=>state.user);  
  const [imagePercent, SetImagePercent] = useState(0);
  const [imageError, SetImageError] = useState(false);
  const [formData, SetFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(image) {
      handleImageUpload(image);
    }
  } ,[image]);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        SetImagePercent(progress)
        },
        (error)=>{
        SetImageError(true);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL) => {
              SetFormData({...formData, profilePicture: downloadURL});
          }
        )
      }
    )
  }
  const handleSubmit = async (e) => {
    try
      {
        dispatch(updateUserStart());
        e.preventDefault();
        const response = await fetch(`/api/user/update/${currentUser._id}`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        if (data.success === false){
          dispatch(updateUserFailure(data));
          return;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      }
    catch(err){
      dispatch(updateUserFailure(err));
    }
  }
  const handleChange = (e) => {
    SetFormData({...formData, [e.target.id]:e.target.value})
  };

  const handleDeleteAccount = async () => {
    try{
      dispatch(deleteUserStart());
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method:'DELETE',
      });
      const data = await response.json();
      if (data.success === false){
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess());
      
    }
    catch(err){
      dispatch(deleteUserFailure(err));
    }
  }
  const handleSignOut = async () => {
    try{
      await fetch(`/api/auth/sign-out`)
      dispatch(signOut());
    }
    catch(err){
      console.log(err);
    }
  }


  return (    
    <div className=' dark:bg-slate-700'>
      <div className='p-3 max-w-lg mx-auto '>

        <h1 className="text-3xl font-bold text-center my-7 dark:text-white">Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
          
          <input accept="image/*" hidden type="file" ref={fileRef} onChange={(e) => SetImage(e.target.files[0])}/>

          <img src={formData.profilePicture || currentUser.profilePicture} alt="Profile" className="h-24 w-24 self-center rounded-full cursor-pointer object-cover mt-1 " onClick={()=>fileRef.current.click()} />
          
          <p className='text-sm self-center'>
            {imageError ? (
              <span className='text-red-700'>
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) :imagePercent === 100 ? <span className='text-green-700'>Image uploaded successfully</span> : imagePercent >0 && imagePercent < 100 ? <span className='text-green-700 '>{`Uploading ${imagePercent} %`}</span> : '' }
          </p>

          <input defaultValue={currentUser.username} type='text' placeholder='Username'
          id='username' className='bg-slate-100 p-3
          rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-110'  onChange={handleChange} />          
          
          <input defaultValue={currentUser.email} type='text' placeholder='email'
          id='email' className='bg-slate-100 p-3
          rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-110'  onChange={handleChange}/>
          
          <input  type='text' placeholder='password'
          id='password' className='bg-slate-100 p-3
          rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-110'  onChange={handleChange}/>

          <button className='border-4 border-solid border-black  
          bg-slate-700 text-white p-3
          rounded-lg uppercase hover:opacity-85 font-semibold
          disabled:opacity-60 dark:border-white'>{loading? 'UPdating...':'UPDATE'}
          </button>

          <div className="flex justify-between mt-1">
          
            <span onClick={handleDeleteAccount} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-5 mb-5 cursor-pointer">Delete Account</span>
          
            <span onClick={handleSignOut} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-5 mb-5 cursor-pointer">Sign-out</span>
          </div>

          </form>
          
          <p className="text-red-500" >{error && 'Something went wrong'}</p>
          <p className="text-green-500 self-center" >{updateSuccess && 'User Updated'}</p>
      </div>
    </div>
  )
}

export default Profile