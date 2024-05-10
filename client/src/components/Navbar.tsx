import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutTask } from '../redux/taskSlice';
import { logout } from '../redux/userSlice';

const Navbar = () => {
    // Retrieve user ID from Redux state
    const userId = useSelector((state: any) => state?.user?.currentUser?._id)
    // State to manage the open/close state of the mobile menu
    const [open, setOpen] = useState(false);
    // Hook to navigate between routes
    const navigate = useNavigate();
    // Dispatch function to trigger Redux actions
    const dispatch = useDispatch();

    // Function to handle toggling of mobile menu
    const handleHamberger = () => {
        setOpen(open => !open);
    }

    // Function to handle logout
    const handleLogout = () => {
        // Dispatch logout actions
        dispatch(logoutTask());
        dispatch(logout());
        // Navigate to login page
        navigate("/login");
        // Close mobile menu
        setOpen(false);
    }

    return (
        <div className="bg-[rgb(9,132,253)] flex items-center justify-between  py-[10px] px-[20px]">
            {/* Logo */}
            <div className="flex items-center text-[20px] font-[700] text-[#fff] cursor-pointer">
                <span className="text-[rgb(255,214,0)]">Task</span>-मैनेजर
            </div>
            {/* Desktop menu */}
            <div className="flex gap-[17px] text-[17px] text-[#fff] font-[500] max-sm:hidden">
                {/* Home link */}
                <span className="cursor-pointer hover:text-yellow-400" onClick={() => { navigate("/"); setOpen(false) }}>Home</span>
                {/* About Us link */}
                <span className="cursor-pointer hover:text-yellow-400" onClick={() => { navigate("/about-us"); setOpen(false) }}>About Us</span>
                {/* Conditional rendering of Logout/Login links based on user authentication */}
                {userId && <span className="cursor-pointer hover:text-yellow-400" onClick={handleLogout}>Logout</span>}
                {!userId && <span className="cursor-pointer hover:text-yellow-400" onClick={() => { navigate("/login"); setOpen(false) }}>Login</span>}
            </div >
            {/* Hamburger icon for mobile menu */}
            <DensityMediumIcon className="!hidden !text-[#fff] !cursor-pointer max-sm:!block" onClick={handleHamberger} />
            {/* Mobile menu */}
            {
                open &&
                <div className='bg-[rgb(9,132,253)] w-full fixed top-0 left-0 right-0 z-[100]'>
                    {/* Close icon */}
                    <CloseRoundedIcon className='!text-yellow-400 !cursor-pointer fixed top-[-2] right-1 !w-[9%] !h-[7%]' onClick={handleHamberger} />
                    {/* Mobile menu items */}
                    <div className=" flex items-center flex-col gap-[17px] text-[17px] py-[7vh] text-[#fff] font-[500]">
                        {/* Home link */}
                        <span className="cursor-pointer hover:text-yellow-400" onClick={() => { navigate("/"); setOpen(false) }}>Home</span>
                        {/* About Us link */}
                        <span className="cursor-pointer hover:text-yellow-400" onClick={() => { navigate("/about-us"); setOpen(false) }}>About Us</span>
                        {/* Conditional rendering of Logout/Login links based on user authentication */}
                        {userId && <span className="cursor-pointer hover:text-yellow-400" onClick={handleLogout}>Logout</span>}
                        {!userId && <span className="cursor-pointer hover:text-yellow-400" onClick={() => { navigate("/login"); setOpen(false) }}>Login</span>}
                    </div>
                </div>
            }
        </div >
    )
}

export default Navbar;
