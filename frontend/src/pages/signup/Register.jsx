import React, { useState } from 'react'
import "../login/Login.css"
import { useAuth } from '../../context/AuthContext'
import { Button } from '@headlessui/react'
import AppleLogo from "../../assets/login/AppleLogo.png"
import FacebookLogo from "../../assets/login/FacebookLogo.png"
import GoogleLogo from "../../assets/login/GoogleLogo.png"
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAddUserMutation } from '../../redux/features/users/userSlice'
import { useSnackbar } from '../../context/SnackbarContext'

const Register = () => {
    const { registerUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [addUser, { isLoading, error }] = useAddUserMutation();
    const showSnackbar = useSnackbar();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async () => {

        try {
            const res = await registerUser(email, password);
            const userData = {
            displayName: username,
            email: res.user.email,
            photoURL: null,
            };
            console.log(res);
            showSnackbar(`Welcome ${username}`, 'success');
            await addUser(userData).unwrap();
            navigate('/');
            } catch (error) {
            console.log(error)
            }
    }

    const handleGoogleAuth = async () => {
        try {
            await signInWithGoogle()
                .then(async (res) => {
                    var userData = {
                        displayName: res.user.displayName,
                        email: res.user.email,
                        photoURL: res.user.photoURL
                    }
                    showSnackbar(`Signed Up Successfully: ${userData.displayName}`, 'success')
                    await addUser(userData).unwrap();
                    navigate("/");

                })

        } catch (error) {
            showSnackbar(`Error: ${error}`, 'error')
        }
    }


    return (
        <div className='login'>
            <div className='login-wrapper w-20 flex flex-col items-start'>

                {/* Sign in Header*/}

                <h1 className='login-signin-text font-medium text-xl md:text-3xl py-5'>Sign up</h1>

                {/* Email */}

                <div className='pt-5 login-input'>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="hs-leading-icon"
                        name="hs-leading-icon"
                        className="input bg-[#F0EFFF] h-14 text-[#A7A3FF] placeholder-[#A7A3FF] py-3 px-4 ps-5 block rounded-md text-poppins font-normal disabled:opacity-50 disabled:pointer-events-none outline-none"
                        placeholder="Enter Email" />
                </div>

                {/* User name */}

                <div className='pt-5 login-input'>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        id="hs-leading-icon"
                        name="hs-leading-icon"
                        className="input bg-[#F0EFFF] h-14 text-[#A7A3FF] placeholder-[#A7A3FF] py-3 px-4 ps-5 block rounded-md text-poppins font-normal disabled:opacity-50 disabled:pointer-events-none outline-none"
                        placeholder="Create User name" />
                </div>

                {/* Password */}
                <div className="login-input pt-5">
                    <div className="relative login-password-input">

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={`${showPassword ? 'text' : 'password'}`}
                            id="hs-trailing-icon"
                            name="hs-trailing-icon"
                            className="passsword-input h-14 bg-[#F0EFFF] text-[#A7A3FF] placeholder-[#A7A3FF] py-3 px-4 ps-5 block text-poppins font-normal rounded-md disabled:opacity-50 disabled:pointer-events-none outline-none"
                            placeholder="Password" />

                        <div onClick={() => { setShowPassword(!showPassword) }} className="absolute inset-y-0 end-0 flex items-center z-20 pe-4">

                            {
                                showPassword ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0 text-[#A7A3FF] hover:cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0 text-[#A7A3FF] hover:cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>

                            }

                        </div>
                    </div>
                </div>

                {/* Confirm Password */}

                <div className="login-input pt-5">
                    <div className="relative login-password-input">

                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type={`${showConfirmPassword ? 'text' : 'password'}`}
                            id="hs-trailing-icon"
                            name="hs-trailing-icon"
                            className="passsword-input h-14 bg-[#F0EFFF] text-[#A7A3FF] placeholder-[#A7A3FF] py-3 px-4 ps-5 block text-poppins font-normal rounded-md disabled:opacity-50 disabled:pointer-events-none outline-none"
                            placeholder="Confirm Password" />

                        <div onClick={() => { setShowConfirmPassword(!showConfirmPassword) }} className="absolute inset-y-0 end-0 flex items-center z-20 pe-4">

                            {
                                showPassword ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0 text-[#A7A3FF] hover:cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0 text-[#A7A3FF] hover:cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>

                            }

                        </div>
                    </div>
                </div>

                <div className="login-button text-center pt-10">
                    <Button onClick={handleSubmit} className="w-full h-14 flex justify-center items-center gap-2 rounded-md bg-[#4D47C3] py-1.5 px-3 font-medium text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-[#3833a0] focus:outline-1 focus:outline-white">
                        <p>Register</p>
                    </Button>
                </div>

                {/* O Auth Login Section */}

                <div className='w-full py-10 flex flex-col items-center justify-center'>
                    <p className='font-medium text-[#B5B5B5] text-xs md:text-sm'>or continue with</p>

                    {/* Large Devices */}

                    {/* <div className='o-auth-login-large flex flex-col items-center justify-center'>
                        <button onClick={() => { console.log('Sign In with Apple') }} className='pt-4'>
                            <img src={SignInApple} alt="O Auth Login" className='w-60 object-cover' />
                        </button>
                        <button className='pt-4'>
                            <img src={SignInGoogle} alt="O Auth Login" className='w-60 object-cover' />
                        </button>
                        <button className='pt-4'>
                            <img src={SignInFacebook} alt="O Auth Login" className='w-60 object-cover' />
                        </button>
                    </div> */}

                    {/* Mobile Devices */}

                    <div className='items-center justify-center pt-5'>
                        <button className=' '>
                            <img src={AppleLogo} alt="O Auth Login" />
                        </button>
                        <button onClick={handleGoogleAuth} className='pl-8 '>
                            <img src={GoogleLogo} alt="O Auth Login" />
                        </button>
                        <button className='pl-8 '>
                            <img src={FacebookLogo} alt="O Auth Login" />
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Register