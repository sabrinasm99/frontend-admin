const initialState = {
    title: "Purple Mart",
    menu1: 'GROCERY',
    menu2: 'MOMS & KIDS',
    menu3: 'HEALTHY & BEAUTY',
    menu4: 'STATIONERY',
    menu5: 'PET SUPPLIES',
    menu6: 'TOOLS & HOME IMPROVEMENT',
    menu7: 'WASHING SUPPLIES',
    menu8: 'TOILETRIES',
    name: 'Duthy Duthella'
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
  