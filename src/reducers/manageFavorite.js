const initialState = {
  hospital: [],
  shelter: [],
  pharmacy: [],
};

const manageFavorite = (currentState = initialState, action) => {
  const newState = { ...currentState };
  switch (action.type) {
    case "SET_FAVORITES": {
      if (action.data.hospital) {
        newState.hospital = [...action.data.hospital];
      }
      if (action.data.pharmacy) {
        newState.pharmacy = [...action.data.pharmacy];
      }
      if (action.data.shelter) {
        newState.shelter = [...action.data.shelter];
      }
      return newState;
    }
    case "DELETE_FAVORITE": {
      const content = action.data.content;
      const type = action.data.type;
      const filteredList = newState[type].filter((_, i) => {
        return (
          newState[type][i].name !== content.name &&
          newState[type][i].address !== content.address
        );
      });
      newState[type] = filteredList;
      return newState;
    }
    default: {
      return { ...currentState };
    }
  }
};

export default manageFavorite;
