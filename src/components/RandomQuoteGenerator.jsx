import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

const RandomQuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const generateQuote = async () => {
    setLoading(true);
    const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": "mgwRkjhzp4OS61chCZzSlA==QXHtcbytbNPGTdEv",
      },
    });
    const data = await res.json();
    setQuote(data[0]);
    setLoading(false);
  };
  useEffect(() => {
    generateQuote();
  }, []);
  console.log(quote);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 2 }}
        transition={{ duration: 2 }}
        className="text-center p-4 md:p-10"
      >
        {loading ? (
          <p>loading...</p>
        ) : (
          <div>
            <p className="text-xl">{`"${
              quote ? quote.quote : "loading..."
            }"`}</p>
            <p className="text-lg italic text-gray-600 mt-1">-{quote.author}</p>
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
