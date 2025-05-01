import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn.js";
// import Forgot from "./Auth/Forgot";
import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutProperty from "./Layout/LayoutProperty";
import LayoutBooking from "./Layout/LayoutBooking";
import LayoutAgent from "./Layout/LayoutAgent";
import LayoutBuyers from "./Layout/LayoutBuyers";
import LayoutLease from "./Layout/LayoutLease";
import LayoutFinance from "./Layout/LayoutFinance";
import LayoutSeller from "./Layout/LayoutSeller";
import LayoutProject from "./Layout/LayoutProject";
import LayoutSite from "./Layout/LayoutSite";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Auth/AuthContext.js";
import ProtectedRoute from "./Auth/ProtectedRoute";
import PublicRoute from "./Auth/PublicRoute";
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <ToastContainer/>
      <Routes>
          
      <Route path="/SignIn" element={
      <PublicRoute>
        <SignIn />
      </PublicRoute>}
      />
         
        
           

              <Route path="/Property" element={
              <ProtectedRoute>
                <LayoutProperty />
              </ProtectedRoute>}/>

              {/* <Route path="/Forgot" element={
              <ProtectedRoute>
                <Forgot/>
              </ProtectedRoute>}/> */}

              <Route path="/" element={
              <ProtectedRoute>
                <LayoutDashboard />
              </ProtectedRoute>}/>

              <Route path="/Agent" element={
              <ProtectedRoute>
                <LayoutAgent />
              </ProtectedRoute>}/>

              <Route path="/Booking" element={
              <ProtectedRoute>
                <LayoutBooking />
              </ProtectedRoute>}/>

              <Route path="/Buyers" element={
              <ProtectedRoute>
                <LayoutBuyers />
              </ProtectedRoute>}/>

              <Route path="/Finance" element={
              <ProtectedRoute>
                <LayoutFinance />
              </ProtectedRoute>}/>

              <Route path="/Lease" element={
              <ProtectedRoute>
                <LayoutLease />
              </ProtectedRoute>}/>

              <Route path="/Project" element={
              <ProtectedRoute>
                <LayoutProject />
              </ProtectedRoute>}/>

              <Route path="/Seller" element={
              <ProtectedRoute>
                <LayoutSeller />
              </ProtectedRoute>}/>

              <Route path="/Site" element={
              <ProtectedRoute>
                <LayoutSite />
              </ProtectedRoute>}/>
            
        
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;