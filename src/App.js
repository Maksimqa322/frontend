import React, { useState } from "react";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputValue }),
      });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(`Success: ${result.message}`);
      } else {
        setResponseMessage(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Data Sender</h1>
      <input
        type="text"
        placeholder="Enter data"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />
      <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
        Send
      </button>
      {responseMessage && <p style={{ marginTop: "20px" }}>{responseMessage}</p>}
    </div>
  );
};

export default App;
