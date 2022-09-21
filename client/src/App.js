import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { UserContext } from ".";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import PageWrapper from "./pages/PageWrapper";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import UserData from "./pages/UserData";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AllData from "./pages/AllData";

function App() {
  return (
    <div className="app-wrapper">
      <UserContext.Provider
        value={{
          users: [
            // {
            //   name: "SampleUser",
            //   email: "email@address.com",
            //   password: "password",
            //   balance: 0,
            //   transactions: [],
            // },
          ],
        }}
      >
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route
              path="/deposit"
              element={<PageWrapper pageComponent={<Deposit />} />}
            />
            <Route
              path="/withdraw"
              element={<PageWrapper pageComponent={<Withdraw />} />}
            />
            <Route
              path="/data"
              element={<PageWrapper pageComponent={<UserData />} />}
            />
            <Route path="/alldata" element={<AllData />} />
          </Routes>
        </Router>
      </UserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
