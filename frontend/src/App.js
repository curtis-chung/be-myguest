import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateSpotForm from "./components/CreateSpot";
import GetAllSpot from "./components/GetAllSpot";
import GetOneSpot from "./components/GetOneSpot";
import BottomNav from "./components/BottomNav";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <GetAllSpot />
            <BottomNav />
          </Route>
          <Route path="/spots/:spotId">
            <GetOneSpot />
            <BottomNav />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
