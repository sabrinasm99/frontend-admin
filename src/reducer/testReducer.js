const initialState = {
    title: "Purple Mart"
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'CHANGE_NAME':
        return {
          ...state,
          name:action.payload
        };
      default:
        return state;
    }
  };
  