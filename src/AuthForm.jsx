import { useState } from "react"
import { auth } from "./firebase"
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
            console.log(error.split('(')[1].split('/')[1].split(')')[0])
        }
    }

    return (
        <div id="auth-form" onSubmit={handleSubmit} className="flex flex-col justify-center bg-slate-700 p-5 text-white w-full h-full">
            <h2 className="text-center text-2xl">{isLogin ? "Log In" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col mt-4 gap-2">
                <div className="flex flex-col">
                    <label htmlFor="email-auth">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)}
                    name="email-auth" id="email-auth"
                    className="text-black"
                    required></input>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password-auth">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)}
                    name="password-auth" id="password-auth"
                    className="text-black"
                    required></input>
                    {
                        error && 
                        <p className="text-[12px] text-red-600 mt-[1px] font-[500]">Incorrect email or password</p>
                    }
                </div>

                <button type="submit" className="text-sm mt-2 p-1 bg-blue-500 rounded">{isLogin ? "Log In" : "Sign Up"}</button>
                <p className="self-center text-[11px] text-center mt-4 max-w-[260px]">
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
                <div className="mt-3 text-center flex flex-col items-center">
                    <p>Login with:</p>
                    <div>
                        <button className="mt-2 bg-white flex p-1 rounded-full"
                        onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
                            <i className="fa-brands fa-google text-black"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}