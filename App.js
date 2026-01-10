// This is a simple React app that displays a "Welcome to My Static Site" message.

import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Welcome to My Static Site</h1>
        <p>Deployed with Terraform + AWS CI/CD</p>
        <button onClick={() => alert("Hello from React!")}>
          Click Me
        </button>
      </header>
    </div>
  );
}

export default App;