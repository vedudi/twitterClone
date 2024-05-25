import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "./../../fireBase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("your account is created");
          navigate("/home");
        })
        .catch((err) => toast.error("there is a problem of" + " " + err.code));
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("account loged in");
          navigate("/home");
        })
        .catch((err) => {
          if (err.code === "auth/invalid-credential") {
            setIsError(true);
          }
          toast.error("there is a problem of" + " " + err.code);
        });
    }
  };
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => toast.info("check your mail box"))
      .catch((err) => toast.error("something went wrong:" + err.code));
  };
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("your account is logged in successfully");
        navigate("/home");
      })
      .catch((err) => toast.error("there is a problem of" + " " + err.code));
  };
  return (
    <div className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logo.webp" alt="" />
        </div>
        <h1 className="text-lg font-bold text-center"> log in twitter</h1>
        <button
          onClick={handleGoogle}
          className="bg-white text-black hover:bg-gray-300 transition flex items-center gap-3 py-2 px-10 rounded-full whitespace-nowrap"
        >
          <img className="h-[20px]" src="/google-logo.svg" alt="" />
          Log in with Google
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
            required
          />
          <label className="mt-5">password</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
            required
          />
          <button className="mt-10  bg-white text-black rounded-full hover:bg-gray-300 transition  font-bold ">
            {isSignUp ? "sign up" : "Login"}
          </button>
        </form>
        <p className="mt-5">
          <span className="text-gray-500 cursor-pointer">
            {isSignUp ? " if you have an account" : " if you have not account"}
          </span>
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="ms-2 text-blue-500 cursor-pointer"
          >
            {isSignUp ? "log in" : "SignUp"}
          </span>
        </p>
        {isError && (
          <button onClick={handleReset} className="text-red-500">
            Did you forget your password?
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
