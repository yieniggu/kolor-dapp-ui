import React, { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import Pages from "./pages";
import "./App.css";
import { store } from "./store/store";

function App() {
  return (
    <CookiesProvider>
      <Suspense>
        <Provider store={store}>
          <Pages />
        </Provider>
      </Suspense>
    </CookiesProvider>
  );
}

export default App;
