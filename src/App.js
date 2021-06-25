import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div>
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={Dashboard}></Route>
      </div>
      <ToastContainer />
    </BrowserRouter>
    </div>
  );
}

export default App;
