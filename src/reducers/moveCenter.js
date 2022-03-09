const initialState = {
  lat: null,
  lon: null,
};

const moveCenter = (currentState = initialState, action) => {
  const newState = { ...currentState };
  switch (action.type) {
    case "MOVE": {
      newState.lat = action.data.lat;
      newState.lon = action.data.lon;
      return newState;
    }
    default: {
      return {
        ...currentState,
      };
    }
  }
};

export default moveCenter;
