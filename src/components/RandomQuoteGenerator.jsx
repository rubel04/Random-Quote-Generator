import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { LuCopyCheck, LuCopyPlus } from "react-icons/lu";

const RandomQuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCopy, setIsCopy] = useState(false);
  const generateQuote = async () => {
    setLoading(true);
    const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": import.meta.env.VITE_KEY,
      },
    });
    const data = await res.json();
    setQuote(data[0]);
    setLoading(false);
    setIsCopy(false)
  };
  useEffect(() => {
    generateQuote();
  }, []);

  const copyQuote = () => {
    if (quote.quote) {
      navigator.clipboard.writeText(`"${quote.quote}"`);
      setIsCopy(!isCopy);
    //   alert("quote copy");
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 2 }}
        transition={{ duration: 2 }}
        className="text-center p-4 md:p-10 flex flex-col justify-center"
      >
        {loading ? (
          <div className="flex w-full md:w-1/2 flex-col justify-end m-auto gap-8">
            <div className="skeleton h-4 w-full"></div>
            <div className="flex justify-end">
              <div className="skeleton h-4 w-1/2"></div>
            </div>
          </div>
        ) : (
          <div
            className={`w-full md:w-1/2 m-auto bg-gray-50 ${
              isCopy && "bg-gray-200"
            } p-4 rounded relative`}
          >
            <p className="text-xl">{`"${
              quote ? quote.quote : "loading..."
            }"`}</p>
            <p className="text-lg italic text-gray-600 mt-1">-{quote.author}</p>

            <p
              onClick={copyQuote}
              className="absolute bottom-0 right-0 text-gray-600 text-xl cursor-pointer"
            >
              {
                isCopy?  <p className="flex items-center gap-1"><span className="text-base font-medium">Copied</span><LuCopyCheck /></p> :<LuCopyPlus />
              }
            </p>
          </div>
        )}
        <h1 className="text-3xl font-bold mt-6">
          Click to Generate a New Quote
        </h1>
      </motion.div>
      <button
        onClick={generateQuote}
        className="bg-[#4caf50] text-white px-4 py-2 block m-auto rounded cursor-pointer"
      >
        New Quote
      </button>
    </div>
  );
};

export default RandomQuoteGenerator;
