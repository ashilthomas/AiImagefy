import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
 


  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const loadCreditData = async () => {
    try {
        const { data } = await axios.get(`${backendUrl}/auth/credits`, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
      if (data.success) {
        setCredit(data.credits);
        setUser(data.user.name);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      loadCreditData();
    }
  }, [token]);

  const generateImage =async(prompt)=>{
    try {
        const response = await axios.post(backendUrl + "/image/generate-image",{prompt},{
            headers: {
                Authorization: `Bearer ${token}`, 
              },

        })
        if(response.data.success){
            loadCreditData()
            return response.data.resultImage
        }else{
            toast(response.data.message)
            loadCreditData()
          
        }
    } catch (error) {
        toast.error(error.message)
        
    }

  }
const logout =()=>{
    localStorage.removeItem("token")
    setToken('')
    setUser(null)
}
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    setToken,
    token,
    setCredit,
    credit,
    loadCreditData,
    logout,
    generateImage
  };

  return (
  
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
   
  );
};

export default AppContextProvider;
