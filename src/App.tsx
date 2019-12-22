import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GetPlaces from "./components/GetPlaces";
import { Router, Route, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import GetTypeReferenceData from "./GetTypeReferenceData";
const App: React.FC = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Route path="/" component={GetPlaces} />
        <Route
          path="/get_type_reference_data/:id"
          component={GetTypeReferenceData}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
