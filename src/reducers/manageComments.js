const initialState = {};

const manageComments = (currentState = initialState, action) => {
  const newState = { ...currentState };
  switch (action.type) {
    case "SET_COMMENTS": {
      const newList = action.data;
      return newList;
    }
    case "DELETE_COMMENT": {
      const id = action.data.id;
      const comment = action.data.comment;
      const filteredList = newState[id].filter((_, i) => {
        return (
          newState[id][i].content !== comment.content ||
          newState[id][i].time !== comment.time
        );
      });
      newState[id] = filteredList;
      return newState;
    }
    case "ADD_COMMENT": {
      const newList = { ...currentState };
      newList[action.data.id].push({
        author: action.data.author,
        time: action.data.time,
        content: action.data.content,
      });
      console.log(newList);
      return newList;
    }
    default: {
      return { ...currentState };
    }
  }
};

export default manageComments;
