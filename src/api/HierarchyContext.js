import React from "react";

const HierarchyContext = React.createContext();

export const hierReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NODES":
      return {
        ...state,
        data: [
          ...state.hierarchies,
          ...action.nodes
        ]
      }
    default:
      return state;
  }
};

export default HierarchyContext;
