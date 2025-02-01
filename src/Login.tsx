import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

const Login = () => {
    // Initialize Firebase authentication and navigation
    const auth = getAuth();
    const navigate = useNavigate();
    
    // State variables for managing authentication state, email, password, and error messages
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle sign-in with Google
    const signInWithGoogle = async () => {
        setAuthing(true);
        
        // Use Firebase to sign in with Google
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            });
    }

    // Function to handle sign-in with email and password
    const signInWithEmail = async () => {
        setAuthing(true);
        setError('');

        // Use Firebase to sign in with email and password
        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    }

    return (
        <div className='w-full h-screen flex bg-[url(/src/assets/bg-login.svg)] bg-cover bg-center'>
            <div className='w-full h-full flex flex-col p-[30px] justify-center'>
                <div className='w-full flex flex-col max-w-[600px] mx-auto'>
                    {/* Header section with title and welcome message */}
                    <div className='w-full flex flex-col mb-[150px] text-white text-center '>
                        <h3 className='text-[51.05px] font-bold mb-7 '>Audio</h3>
                        <p className='text-lg mb-4 text-[14px] font-bold'>It's modular and designed to last</p>
                    </div>

                    {/* Input fields for email and password */}
                    <div className="w-full flex flex-col mb-6 ">
                        {/* Input com ícone */}
                        <div className="relative mb-5">
                            <AiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full h-[50px] text-black pl-12 py-2 px-4 bg-white border-b border-gray-500 focus:outline-none focus:border-white rounded-[10px]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative mb-2">
                            <AiOutlineLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full h-[50px] text-black pl-12 py-2 px-4 bg-white border-b border-gray-500 focus:outline-none focus:border-white rounded-[10px]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center">
                            <p className="font-bold text-[14px] text-white">Forgot Password</p>
                        </div>
                    </div>
                    
                    {/* Display error message if there is one */}
                    {error && <div className='text-red-500 mb-4'>{error}</div>}

                    {/* Button to log in with email and password */}
                    <div className='w-full flex flex-col mb-4'>
                        <button
                            className='w-full bg-[#0ACF83] text-white my-2 font-semibold rounded-[10px] p-4 text-center flex items-center justify-center cursor-pointer'
                            onClick={signInWithEmail}
                            disabled={authing}>
                            Sign in
                        </button>
                    </div>
                    
                    <div
                        onClick={signInWithGoogle}
                        className="flex text-white gap-3 mt-3 justify-center mb-[96px]">

                        <FcGoogle size={26} />
                        <p className="font-bold text-lg">Sign in with Google</p>
                    
                    </div>
                </div>

                {/* Link to sign up page */}
                <div className='w-full flex items-center justify-center mt-10'>
                    <p className='text-sm font-normal text-gray-400'>Didn’t have any account? <span className='font-semibold text-white cursor-pointer underline'><a href='/signup' className='text-[#0ACF83]'>Sign Up here</a></span></p>
                </div>
            </div>
        </div>
    );
}

export default Login;