import React, { useContext, useState } from "react";
import { ChevronRightIcon } from "@modulz/radix-icons";
import { Checkbox, Text, Box } from "@mantine/core";
import HierarchyContext from "../api/HierarchyContext";

const HierarchyItem = ({ id, text, check = false, indentation = 0 }) => {
  const [isSelect, setIsSelect] = useState(check);
  const [children, setchildren] = useState();
  console.log(children);
  const hasChildren = children && children.length;
  const showIcon = children === undefined || hasChildren;

  const { data, dispatchHierarchies } = useContext(HierarchyContext);
  const makeActive = () => {
    setIsSelect((state) => !state);
    getChildren();
  };

  const getChildren = () => {
    setTimeout(() => {
      setchildren(data.hierarchies.filter((_) => _.parentid === id));
    }, 1000);
  };

  console.log("232", data.hierarchies);

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
