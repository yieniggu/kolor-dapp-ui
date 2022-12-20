import React, { Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import "./App.css";
import { AppRouter } from "./routers/AppRouter";
import { store } from "./store/store";

function App() {
  return (
    <CookiesProvider>
      <Suspense>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </Suspense>
    </CookiesProvider>
  );
}

export default App;
