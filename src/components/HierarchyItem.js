import React, { useContext, useState } from "react";
import { ChevronRightIcon } from "@modulz/radix-icons";
import { Checkbox, Text, Box } from "@mantine/core";
import HierarchyContext from "../api/HierarchyContext";

const HierarchyItem = ({ id, check = false, indentation = 0 }) => {
  const { data, dispatchHierarchies } = useContext(HierarchyContext);

  const [isSelect, setIsSelect] = useState(check);
  //const [children, setchildren] = useState();

  const { text, childrenFetched } = data.hierarchies.filter((_) => _.id === id)[0]


  const children = data.hierarchies.filter((_) => _.parentid === id)

  console.log(children);
  const hasChildren = !childrenFetched && children.length;
  const showIcon = children === undefined || hasChildren;

  const makeActive = () => {
    setIsSelect((state) => !state);
    dispatchHierarchies({
      type: "TOGGLE_SELECTION",
      tree_name: "hierarchies",
      id,
    });
    getChildren();
  };

  const getChildren = () => {
    setTimeout(() => {
      dispatchHierarchies({
        type: "ADD_NODES",
        tree_name: "hierarchies",
        nodes: [
          {
            id: Math.round(1000 * Math.random()),
            text: "category" + Math.round(1000 * Math.random()),
            parentid: id,
          },
          {
            id: Math.round(1000 * Math.random()),
            text: "category" + Math.round(1000 * Math.random()),
            parentid: id,
          },
        ],
      });
      //setchildren(data.hierarchies.filter((_) => _.parentid === id));
      
    }, 1000);
  };

  console.log("232", data);

  return (
    <div>
      <div style={{ ...styles.hierarchyItem, marginLeft: indentation * 20 }} onClick={makeActive}>
        <Box mr={5}>
          <ChevronRightIcon style={styles.iconChevron(showIcon, isSelect)} />
        </Box>
        <Box sx={styles.hierarchyItemBox}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox checked={isSelect} readOnly />
            <Text ml={5}>{text}</Text>
          </div>
          <Text weight={300} mr={3}>
            {id}
          </Text>
        </Box>
      </div>

      {hasChildren && isSelect
        ? children.map((child) => (
            <HierarchyItem key={child.id} {...child} indentation={indentation + 1} />
          ))
        : null}
    </div>
  );
};

const styles = {
  hierarchyItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
    cursor: "pointer",
    userSelect: "none",
  },

  hierarchyItemBox: (theme) => ({
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    padding: "10px 5px",
    border: `1px solid ${theme.colors.gray[3]}`,
    borderRadius: 4,
    "&:hover": {
      backgroundColor: theme.colors.gray[0],
    },
  }),
  iconChevron: (hasChildren, isSelect) => ({
    transform: isSelect ? "rotate(90deg)" : "",
    visibility: hasChildren ? "visible" : "hidden",
    transitionDuration: "0.5s",
  }),
};

export default HierarchyItem;
