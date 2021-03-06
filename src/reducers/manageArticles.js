const initialState = [];

const manageArticles = (currentState = initialState, action) => {
  const newState = [...currentState];
  switch (action.type) {
    case "SET_ARTICLES": {
      const newList = [];
      newList.push(...action.data);
      return newList;
    }
    case "APPROVE_ARTICLE":
    case "REJECT_ARTICLE": {
      const filteredList = newState.filter(
        (_, i) => newState[i].id != action.data.id
      );
      return filteredList;
    }
    case "DELETE_ARTICLE": {
      const filteredList = newState.filter(
        (_, i) => newState[i].id !== action.data
      );
      return filteredList;
    }
    default: {
      return [...currentState];
    }
  }
};

export default manageArticles;
