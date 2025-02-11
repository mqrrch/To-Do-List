import { useEffect, useState } from "react";
import ToDolist from "./ToDoList";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthForm from "./AuthForm";
import './App.css'

function App() {
  // Set user states
  const [user, setUser] = useState(null);

  // Listen for changes in user auth
  useEffect(() => {
    // Register auth state listener
    const unsubscribe = onAuthStateChanged(auth, user => {
      // Update state with user or null if logged out
      setUser(user);
    });
    // Cleanup (remove the listener when component unmounts)
    return unsubscribe;
  }, []);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div id="app-bg" className="fixed top-0 left-0 w-full h-screen z-[-2] bg-slate-500"></div>
      {user ? <ToDolist user={user} /> : <AuthForm setUser={setUser} />}
    </div>
  );
};

export default App;
