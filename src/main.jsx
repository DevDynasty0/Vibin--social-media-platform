import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
// import Routes from "./routes/Routes";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Routes from "./routes/Routes.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { store } from "./redux/store.js";
import './scrollbar.css'

// import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <ChakraProvider>
          <RouterProvider router={Routes}></RouterProvider>
        </ChakraProvider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
