import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { auth } from "./firebase/firebase-config";
import signInWithGoogle from "./firebase/signIn";
import Todos from "./components/Todos.jsx";

const cookies = new Cookies();

function App() {
  const [authState, setAuthState] = useState(
    false || cookies.get("auth") === "true"
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthState(true);
        cookies.set("auth", "true", { path: "/" });
        user.getIdToken().then((userToken) => {
          setToken(userToken);
          cookies.set("token", userToken, { path: "/" });
        });
      } else {
        setAuthState(false);
        cookies.remove("auth", { path: "/" });
        cookies.remove("token", { path: "/" });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setAuthState(false);
        cookies.remove("auth", { path: "/" });
        cookies.remove("token", { path: "/" });
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  return (
    <div>
      {authState ? (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleGoogleLogin}>Log in</button>
        </div>
      )}
      <Todos token={token} />
    </div>
  );
}

export default App;
