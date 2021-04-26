const resolve = async (promise) => {
  const resolved = {
    data: null,
    error: null,
  };

  try {
    console.log("promise", promise);
    resolved.data = await promise;
  } catch (error) {
    console.log(error.response);
    console.log(error.response === undefined);
    if (error.response === undefined) {
      console.error("Network/Server error.");
      resolved.error = {
        message: "Network error. Please try again later.",
      };
    } else if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */

      console.log("error...", error.response);
      // console.log("error...", error.response.data.message);
      // console.log("error...", error.response.status);
      // console.log("error...", error.response.headers);

      // if there is an error message in the response then assign it to errorMessage
      // otherwise send generic error message with error status text
      let errorMessage = null;
      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else {
        console.log();
        errorMessage = `Request Error /// Status Text: ${error.response.statusText}`;
      }

      // assign to resolve.error the object that contains key error properties
      resolved.error = {
        message: errorMessage,
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
