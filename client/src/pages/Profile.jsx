import { useSelector } from "react-redux"

const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user);  
  return (    
    <div className='dark:h-screen dark:bg-slate-700'>
      <div className='h-screen p-3 max-w-lg mx-auto '>

        <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-5 ">
          <img src={currentUser.profilePicture} alt="Profile" className="h-24 w-24 self-center rounded-full cursor-pointer object-cover mt-1" />
          
          <input defaultValue={currentUser.username} type='text' placeholder='Username'
          id='username' className='bg-slate-100 p-3
          rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-110' />          
          
          <input defaultValue={currentUser.email} type='text' placeholder='email'
          id='email' className='bg-slate-100 p-3
          rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-110' />
          
          <input  type='text' placeholder='password'
          id='password' className='bg-slate-100 p-3
          rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-110' />

          <button className='border-4 border-solid border-black  
          bg-slate-700 text-white p-3
            rounded-lg uppercase hover:opacity-75 font-semibold
            disabled:opacity-60 dark:border-white'>Update
          </button>

          <div className="flex justify-between mt-1">
          
            <span className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete Account</span>
          
            <span className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign-out</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile