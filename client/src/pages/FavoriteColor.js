import React, { useState, useEffect, Fragment } from "react";

// redux
import { connect } from "react-redux";
import { getFavoriteColor } from "../redux/index";

// loading skeletons
import Skeleton from "react-loading-skeleton";

const FavoriteColor = ({ colorData, getFavoriteColor }) => {
  useEffect(() => {
    getFavoriteColor();
  }, []);

  const contentToRender = () => {
    if (colorData.loading) {
      return (
        <Fragment>
          <div style={{ maxWidth: 300 }}>
            <Skeleton count={2} height={60} />
          </div>
        </Fragment>
      );
    } else if (colorData.error) {
      return (
        <Fragment>
          <h2>{colorData.error}</h2>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
        <h2>Your favorite color is: </h2>
          <h2>{colorData.favoriteColor.message}</h2>
        </Fragment>
      );
    }
  };
  return (
    <div>
      
      {contentToRender()}
    </div>
  );
};

// REDUX //

// mapping store state to props
const mapStateToProps = (state) => {
  return {
    colorData: state.color,
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    getFavoriteColor: () => dispatch(getFavoriteColor()),
  };
};

// connect react components to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteColor);
