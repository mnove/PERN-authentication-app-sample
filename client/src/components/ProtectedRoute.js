import React from "react";
import { Route, Redirect } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component,  ...rest  }) => {


  const isAuth = useSelector(state => state.auth.isAuthenticated);
  console.log(isAuth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
// // mapping store state to props
// const mapStateToProps = (state) => {
//   return {
//     authData: state.auth,
//   };
// };


// connect react components to Redux store
// export default connect(mapStateToProps, null)(ProtectedRoute);
export default ProtectedRoute;