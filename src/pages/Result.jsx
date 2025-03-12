import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Result() {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoaded] = useState(false);
  const [input, setInput] = useState("");
  const { generateImage } = useContext(AppContext);
  const navigate = useNavigate()
  const {credit,loadCreditData}=useContext(AppContext)

  const onSubmitHandler = async (e) => {
    if(credit==0){
        loadCreditData()
        navigate("/buyCredit")

    }
    e.preventDefault();
    setLoaded(true);
    if (input) {
      
      const newImage = await generateImage(input);
      
    
      if (newImage) {
        setIsImageLoaded(true);
        setImage(newImage);
      }

      
    }
    setLoaded(false);
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      action=""
      className="flex flex-col min-h-[90h] justify-center items-center"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div>
        <div className="relative ">
          <img src={image} alt="" className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 bg-blue-500 h-1 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            } `}
          />
        </div>
        {}
        <p className={!loading ? "hidden" : ""}>Loading.....</p>
      </div>
      {!isImageLoaded && (
        <div
          className="flex w-full max-w-xl bg-neutral-500 text-white
        text-sm rounded-full mt-10"
        >
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color "
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-white"
          >
            Generate
          </button>
        </div>
      )}
      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
            download
            href={image}
          >
            DownLoad
          </a>
        </div>
      )}
    </motion.form>
  );
}

export default Result;
