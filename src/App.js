import React, { useState } from "react";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async () => {
    try {
      // Логируем отправку данных
      console.log("Sending data:", inputValue);

      const response = await fetch("http://192.168.1.65:3001/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      // Логируем ответ сервера
      console.log("Response status:", response.status, response.statusText);

      if (response.ok) {
        const text = await response.text();
        console.log("Response data:", text); // Логируем успешный ответ
        setResponseMessage(`Success: ${text}`);
      } else {
        // Логируем ошибку, если ответ не OK
        console.error("Server error:", response.statusText);
        setResponseMessage(`Error: ${response.statusText}`);
      }
    } catch (error) {
      // Логируем ошибку, если что-то пошло не так
      console.error("Fetch error:", error);
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
      {responseMessage && (
        <p style={{ marginTop: "20px" }}>{responseMessage}</p>
      )}
    </div>
  );
};

export default App;
