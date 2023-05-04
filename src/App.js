import { Route, Routes } from "react-router-dom";
import { Principal } from "./components/Pages/Principal/Principal";
import { NotFound } from "./components/Pages/NotFound/NotFound";
import { ApiRick } from "./components/Pages/ApiRick/ApiRick";
import { Home } from "./components/Pages/Home/Home";
import { FooterHome } from "./components/Layouts/FooterHome/FooterHome";
import { HeaderHome } from "./components/Layouts/HeaderHome/HeaderHome";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <div className='container'>
      <Home />
        <Routes>
          <Route path="/" element={<Principal />}></Route>
          <Route path="/Principal" element={<Principal />}></Route>
          <Route path="/ApiRick" element={<ApiRick/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes> 
        <FooterHome></FooterHome>
      </div>
  );
}

export default App;
