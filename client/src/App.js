import "./App.css";
import React, {useEffect} from "react";


import Nav from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FavoriteColor from "./pages/FavoriteColor";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import  ProtectedRoute  from "./components/ProtectedRoute";

// redux
import { connect } from "react-redux";
import { verifyUserLogin } from "./redux/index";

function App(props) {

  useEffect(() => {
    props.checkAuthStatus(); // checking authentication status of user on each reload
    console.log("reached here")
  }, []);


  return (
    
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <ProtectedRoute
              path="/favorite-color"
              component={FavoriteColor}
              exact
            />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </BrowserRouter>
      </div>
  );
}
// REDUX //

// mapping store state to props
const mapStateToProps = (state) => {
  return {
    authData: state.auth,
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthStatus: () => dispatch(verifyUserLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);




