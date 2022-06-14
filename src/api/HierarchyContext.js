import React from "react";

const HierarchyContext = React.createContext();

export const hierReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NODES":
      return {
        ...state,
        [action.tree_name]: [...state[action.tree_name], ...action.nodes],
      };

    case "TOGGLE_OPEN":
      const new_opened = state[action.tree_name].map((hierarchy) => {
        if (hierarchy.id === action.id) {
          return {
            ...hierarchy,
            isOpened: hierarchy.isOpened ? !hierarchy.isOpened : true,
          };
        }
        //Implement logic to close children when parent is closed recursive
        if (hierarchy.isOpened && hierarchy.parentid === action.id) {
          return {
            ...hierarchy,
            isOpened: false,
          };
        }
        return hierarchy;
      });

      return {
        ...state,
        [action.tree_name]: [...new_opened],
      };

    case "TOGGLE_SELECTION":
      const new_tree = state[action.tree_name].map((hierarchy) => {
        if (hierarchy.id !== action.id) {
          if (!state.onlySelection) return hierarchy;
          return {
            ...hierarchy,
            isSelected: false,
          };
        }
        return {
          ...hierarchy,
          isSelected: hierarchy.isSelected ? !hierarchy.isSelected : true,
        };
      });

      return {
        ...state,
        [action.tree_name]: [...new_tree],
      };

    default:
      return state;
  }
};

export default HierarchyContext;
