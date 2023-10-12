const useSetRequest = (setLoginData ) => {
  // create a function that will get the user input values
  const setRequest = (value, key) => {
    setLoginData((previously) => {
      return {
        ...previously,
        [key]: value,
      };
    });
  };

  return {
    setRequest,
  };
};

export default useSetRequest