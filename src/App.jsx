import { useEffect, useState } from "react";
import ToDolist from "./comps/todos/ToDoList";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthForm from "./comps/AuthForm";
import './App.css'
import { useSelector } from "react-redux";

function App() {
  // Checks the loading state (2 loading because the first one is the name, the second is the state)
  const isLoading = useSelector(state => state.loading.loading)

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
      {isLoading && 
        <div id="loading" className="fixed top-0 left-0 w-full h-screen z-50 bg-slate-500 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      }
      {user ? <ToDolist user={user} /> : <AuthForm setUser={setUser} />}
    </div>
  );
};

export default App;
