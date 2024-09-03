import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Pet from "./components/Pet";
import Donation from "./components/Donation";
import FirstPage from "./components/FirstPage";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header title="Animales" />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <FirstPage />
                </>
              } />
                <Route path="/login" element={
                <>
                <Login />
                </>
              } />
                <Route path="/register" element={
                <>
                <Register />
                </>
              } />
                <Route path="/donations" element={
                <>
                <Donation />
                </>
              } />
                <Route path="/pets" element={
                <>
                <Pet />
                </>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
