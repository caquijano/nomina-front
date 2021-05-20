import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootswatch/dist/flatly/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouter from "./Router/PrivateRouter";
import PublicRouter from "./Router/PublicRouter";
import {ContextSidebarProvider}from "./context/ContextSidebar";
ReactDOM.render(
  <>
    <BrowserRouter>
      {!window.localStorage.getItem("loggedUser") ? (
        <PublicRouter/>
      ) : (
        <ContextSidebarProvider>
          <PrivateRouter/>
        </ContextSidebarProvider>
        
      )}
      <ToastContainer />
    </BrowserRouter>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
