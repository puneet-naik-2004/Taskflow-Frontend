// import {BrowserRouter,Routes,Route} from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";



// function App() {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Login/>}/>
//       <Route path="/register" element={<Register/>}/>
//       <Route path="/dashboard" element={<Dashboard/>}/>
//     </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;