import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
  const { user, isSignedIn } = useUser();
  console.log("user", user)
  return (
    <header className='bg-blue-400 backdrop-blur-md shadow-lg border-b border-gray-700'>
      <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center'>
        {/* Logo and App Title */}
        <div className="flex items-center">
          <Link to={'/home'} className="flex items-center">
            <img src='/vite.svg' alt='Logo' className='h-10 w-10 mr-2 rounded-full sm:h-14 sm:w-14' />
      
          </Link>
        </div>

        {/* App Title (Mobile Version) */}
        <div className='flex items-center justify-center flex-grow sm:hidden'>
          <h1 className='text-3xl text-white font-semibold'>Employee Data</h1>
        </div>
         {/* App Title (Desktop Version) */}
         <div className='flex items-center justify-center flex-grow hidden sm:flex'>
          <h1 className='text-3xl text-white font-semibold'>Employee Data</h1>
        </div>

        {/* User Info and User Button */}
        {isSignedIn && (
          <div className='flex gap-2 items-center'>
            <Link to={'/home'} className='hidden md:block'>
              <h1 className='text-xl text-white'>{user.firstName}</h1>
            </Link>
            <UserButton />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header