import { useEffect, useRef, useState } from "react";
import "./styles.css";

const otpLength = 5;

export default function App() {
  const [inputArr, setInputArr] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);
  const handleChange = (value, index) => {
    if (isNaN(value)) {
      return;
    }
    const trim = value.trim();
    const newArr = [...inputArr];
    newArr[index] = trim;
    setInputArr(newArr);
    trim && ref.current[index + 1]?.focus();
  };

  useEffect(() => {
    ref.current[0]?.focus();
  }, []);

  const remove = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      ref.current[index - 1]?.focus();
    }
  };

  return (
    <div className="App">
      <h1>OTP INPUT BOX</h1>
      <div className="input-box">
        {inputArr.map((input, id) => (
          <input
            key={id}
            type="text"
            maxLength={1}
            value={input}
            ref={(input) => (ref.current[id] = input)}
            onKeyDown={(e) => remove(e, id)}
            onChange={(e) => handleChange(e.target.value, id)}
          />
        ))}
      </div>
    </div>
  );
}
