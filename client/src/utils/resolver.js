const resolve = async (promise) => {
  const resolved = {
    data: null,
    error: null,
  };

  try {
    console.log("promise", promise);
    resolved.data = await promise;
  } catch (error) {
    console.log(error.response === undefined);
    if (error.response === undefined) {
      resolved.error = {
        message: "Networtk error. Please try again later",
      };
    } else if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */

      // console.log("error...", error.response);
      // console.log("error...", error.response.data.message);
      // console.log("error...", error.response.status);
      // console.log("error...", error.response.headers);
      resolved.error = {
        message: error.response.data.message,
        status: error.response.status,
        headers: error.response.headers,
      };
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */

      resolved.error = {
        message: "Request Error",
        status: 500,
        headers: null,
      };
    } else {
      // Something happened in setting up the request and triggered an Error
      resolved.error = {
        message: "Error",
        status: 500,
        headers: null,
      };
    }

    //   resolved.error =  error;
  }

  return resolved;
};

export default resolve;
