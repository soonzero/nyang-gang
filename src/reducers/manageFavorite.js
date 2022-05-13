const initialState = {
  hospital: [],
  shelter: [],
  pharmacy: [],
};

const manageFavorite = (currentState = initialState, action) => {
  const newState = { ...currentState };
  switch (action.type) {
    case "SET": {
      newState.hospital = [...action.data.hospital];
      newState.shelter = [...action.data.shelter];
      newState.pharmacy = [...action.data.pharmacy];
      return newState;
    }
    case "DELETE": {
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
