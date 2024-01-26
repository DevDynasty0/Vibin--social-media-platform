
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
// import Routes from "./routes/Routes";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Routes from "./routes/Routes.jsx";
// import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <ChakraProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </ChakraProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);

