import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/page1/LoginScreen";
import UserDataTable from "./components/page2/UserDataTable";

const  App = () => {

  return (
     <BrowserRouter>
     <Routes>
       <Route path="/" element={<LoginScreen />} />
       <Route path="table" element={<UserDataTable />} />
     </Routes>
     </BrowserRouter>
  )
}

export default App
