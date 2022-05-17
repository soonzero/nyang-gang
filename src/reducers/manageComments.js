const initialState = [];

const manageComments = (currentState = initialState, action) => {
  const newState = [...currentState];
  switch (action.type) {
    case "SET_COMMENTS": {
      const newList = [];
      newList.push(...action.data);
      return newList;
    }
    case "DELETE_COMMENT": {
      const newList = [];
      const filteredList = newState.filter(
        (_, i) =>
          newState[i].content !== action.data.content &&
          newState[i].time !== action.data.time
      );
      newList.push(...filteredList);
      return newList;
    }
    case "ADD_COMMENT": {
      const newList = [...currentState];
      newList.push(action.data);
      return newList;
    }
    default: {
      return [...currentState];
    }
  }
};

export default manageComments;
