import { useState } from "react"
import { auth } from "../firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth"

export default function AuthForm({ setUser }){
    const [isLogin, setIsLogin] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")
        try {
            if (isLogin){
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                setUser(userCredential.user);
            } else{
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                setUser(userCredential.user);
            }
        } catch (err) {
            setError(err.message)
            // console.log(error.split('(')[1].split('/')[1].split(')')[0])
        }
    }

    return (
        <div id="auth-form-container" onSubmit={handleSubmit} className="flex flex-col justify-center bg-slate-700 p-5 text-white w-full h-full max-w-[460px] max-h-[540px] md:rounded-xl">
            <h2 className="text-center text-2xl">{isLogin ? "Log In" : "Sign Up"}</h2>
            <form id="auth-form" onSubmit={handleSubmit} className="flex flex-col mt-4 gap-2">
                <div id="email-auth-container" className="flex flex-col">
                    <label htmlFor="email-auth">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)}
                    name="email-auth" id="email-auth"
                    className="text-black pl-1"
                    required></input>
                </div>

                <div id="password-auth-container" className="flex flex-col">
                    <label htmlFor="password-auth">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)}
                    name="password-auth" id="password-auth"
                    className="text-black pl-1"
                    required></input>
                </div>

                <button type="submit" id="auth-submit-btn" className="text-sm mt-2 p-1 md:p-[6px] lg:p-2 xl:p-[10px] bg-blue-500 rounded">{isLogin ? "Log In" : "Sign Up"}</button>

                <p id="auth-switch-text" className="self-center text-center mt-4">
                    {
                        isLogin ? (
                            <>
                                Dont have an account? Click 
                                <a className="cursor-pointer text-blue-400 select-none" onClick={() => setIsLogin(false)}> here </a>
                                to sign up
                            </>
                        )
                        : (
                            <>
                                Already have an account? Click
                                <a className="cursor-pointer text-blue-400 select-none" onClick={() => setIsLogin(true)}> here </a>
                                to log in
                            </>
                        )
                    }
                </p>
                <div id="auth-login-methods-container" className="mt-3 text-center flex flex-col justify-center items-center">
                    <p>Login with:</p>
                    <div id="auth-login-methods-logos" className="flex gap-4">
                        <button type="button" className="mt-2 flex justify-center items-center border-2 border-white rounded p-1 gap-2 hover:bg-gray-500 transition-colors select-none"
                        onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
                            <div className="w-7 md:w-8 lg:w-9 xl:w-10 2xl:w-11">
                                <img src='/To-Do-List/google.png' className="block w-full h-auto"></img>
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}