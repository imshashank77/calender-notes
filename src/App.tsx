import React from "react";
import { Provider } from "react-redux";
import Store from "./store";
import HoemPage from "./screens/homePage";
import "./App.css";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Provider store={Store}>
          <HoemPage />
        </Provider>
      </CookiesProvider>
    </div>
  );
}

export default App;
