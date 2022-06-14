import React, { useContext, useRef } from "react";
import { ChevronRightIcon } from "@modulz/radix-icons";
import { Checkbox, Text, Box } from "@mantine/core";
import HierarchyContext from "../api/HierarchyContext";

const HierarchyItem = ({ id, check = false, indentation = 0 }) => {
  const { data, dispatchHierarchies } = useContext(HierarchyContext);
  const checkRef = useRef();
  // HierarchyItem properties
  const { text, childrenFetched, isSelected, isOpened } = data.hierarchies.filter(
    (_) => _.id === id
  )[0];

  if (id === 1) {
    //console.log(data);
  }

  const children = data.hierarchies.filter((_) => _.parentid === id);
  const hasChildren = !childrenFetched && children.length;
  const showIcon = isOpened === undefined || children === undefined || hasChildren;

  // Clicked on the whole hierarchy item
  const makeActive = async (e) => {
    console.log("Clicked on the whole hierarchy item");

    e.preventDefault();

    // Clicked only on the Checkbox
    if (e.target && e.target.contains(checkRef.current)) {
      console.log("Clicked only on the Checkbox")
      dispatchHierarchies({
        type: "TOGGLE_SELECTION",
        tree_name: "hierarchies",
        id,
      });
    } else {
      dispatchHierarchies({
        type: "TOGGLE_OPEN",
        tree_name: "hierarchies",
        id,
      });
    }
    await getChildren();
  };

  const onCheckClick = () => {
    console.log("onCheckClick");
  };

  const getChildren = async () => {
    return await setTimeout(() => {
      dispatchHierarchies({
        type: "ADD_NODES",
        tree_name: "hierarchies",
        nodes: [
          {
            id: Math.round(10000 * Math.random()),
            text: "category" + Math.round(100000 * Math.random()),
            parentid: id,
          },
          {
            id: Math.round(10000 * Math.random()),
            text: "category" + Math.round(10000 * Math.random()),
            parentid: id,
          },
        ],
      });
    }, 1000);
  };

  return (
    <div>
      <div style={{ ...styles.hierarchyItem, marginLeft: indentation * 20 }} onClick={makeActive}>
        <Box mr={5}>
          <ChevronRightIcon style={styles.iconChevron(showIcon, isOpened)} />
        </Box>
        <Box sx={styles.hierarchyItemBox}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox ref={checkRef} checked={isSelected} onChange={() => {}}  readOnly />
            <Text ml={5}>{text}</Text>
          </div>
          <Text weight={300} mr={3}>
            {id}
          </Text>
        </Box>
      </div>

      {hasChildren && isOpened
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
  iconChevron: (hasChildren, isSelected) => ({
    transform: isSelected ? "rotate(90deg)" : "",
    visibility: hasChildren ? "visible" : "hidden",
    transitionDuration: "0.5s",
  }),
};

export default HierarchyItem;
