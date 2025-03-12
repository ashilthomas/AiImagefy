import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [state, setState] = useState("login");
  const { showLogin, setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);
  
    
    

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload =
        state === "login" ? { email, password } : { name, email, password };
      const endpoint = state === "login" ? "/auth/login" : "/auth/register";
      const response = await axios.post(backendUrl + endpoint, payload);
      const { success, token, user } = response.data;
      console.log(token);
      
      
      
      
     

      if (success) {
        setToken(token); // ✅ Correct
        setUser(user?.name);   // ✅ Correct
        localStorage.setItem("token", token)
        setShowLogin(false);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Server error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-20 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500 "
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium capitalize">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>
        <p className="text-sm text-center mb-4">
          Welcome back! Please sign in to continue
        </p>

        {state !== "login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
            <img src={assets.profile_icon} width={25} alt="profile" />
            <input
              className="outline-none text-sm w-full"
              type="text"
              placeholder="Full Name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
          <img src={assets.email_icon} width={15} alt="email" />
          <input
            className="outline-none text-sm w-full"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
          <img src={assets.logo_icon} width={15} alt="password" />
          <input
            className="outline-none text-sm w-full"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer ml-2">
          Forgot password
        </p>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer hover:bg-blue-700 transition duration-200 disabled:opacity-60"
        >
          {loading ? "Processing...": state === "login"? "Login" : "Create Account"}
        </button>

        <p className="mt-5 text-center text-sm">{state === "login" ? "Don't have an Account?" : "Already have an Account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer font-medium"
            onClick={() => setState(state === "login" ? "signup" : "login")}
          >
            {state === "login" ? "Sign Up" : "Login"}
          </span>
        </p>

        <img
          src={assets.cross_icon}
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
          alt="close"
        />
      </motion.form>
    </div>
  );
}

export default Login;
