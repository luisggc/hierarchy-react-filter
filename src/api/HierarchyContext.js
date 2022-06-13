import React from "react";

const HierarchyContext = React.createContext();

export const hierReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NODES":
      console.log(state, action);
      return {
        ...state,
        [action.tree_name]: [...state[action.tree_name], ...action.nodes],
      };

    case "TOGGLE_SELECTION":
      const new_tree = state[action.tree_name].map((hirarchy) => {
        if (hirarchy.id !== action.id) return hirarchy;
        return {
          ...hirarchy,
          isSelected: hirarchy.isSelected ? !hirarchy.isSelected : true,
        };
      });
      console.log("element_to_toggle", new_tree);

      return {
        ...state,
        [action.tree_name]: [...new_tree],
      };
    default:
      return state;
  }
};

export default HierarchyContext;
