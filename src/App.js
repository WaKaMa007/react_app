// This is a simple React app that displays a "Welcome to My Static Site" message.

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [bgColor, setBgColor] = useState("purple");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const colors = ["purple", "blue", "green", "orange", "pink", "teal"];
  
  const changeColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  return (
    <div className={`App bg-${bgColor}`}>
      <header className="App-header">
        <h1>🚀 Welcome to My Static Site</h1>
        <p className="subtitle">Deployed with Terraform + AWS CI/CD Pipeline</p>
        
        <div className="info-box">
          <p className="time">🕒 {currentTime}</p>
          <p className="version">Version: 2.0 | Build Date: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="feature-section">
          <h2>Interactive Features</h2>
          
          <div className="button-group">
            <button 
              className="btn-primary"
              onClick={() => setCount(count + 1)}
            >
              Click Counter: {count}
            </button>
            
            <button 
              className="btn-secondary"
              onClick={changeColor}
            >
              🎨 Change Background Color
            </button>
            
            <button 
              className="btn-success"
              onClick={() => alert("Hello from React! 🎉")}
            >
              Say Hello 👋
            </button>
          </div>
        </div>

        <div className="status-box">
          <p>✅ Auto-deployed from GitHub</p>
          <p>🔄 Push changes to GitHub to see them live!</p>
        </div>

        <div className="tech-stack">
          <h3>Tech Stack</h3>
          <div className="badges">
            <span className="badge">React</span>
            <span className="badge">AWS S3</span>
            <span className="badge">CodePipeline</span>
            <span className="badge">CodeBuild</span>
            <span className="badge">Terraform</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

