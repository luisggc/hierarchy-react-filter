import React, { useReducer, useState } from "react";
import { Modal, Text, Tabs, Input, Tooltip, Box } from "@mantine/core";
import { InfoCircledIcon, MagnifyingGlassIcon } from "@modulz/radix-icons";
import HierachyTree from "./HierachyTree";
import HierarchyContext, { hierReducer } from "../api/HierarchyContext";
import { hierarchies } from "../api/data_example";

export default function HierarchyFilter({
  tabs,
  titleName,
  subTitleName,
  opened,
  onClose,
  onlySelection = true,
}) {
  const [data, dispatchHierarchies] = useReducer(hierReducer, { hierarchies, onlySelection });
  const rightSection = (
    <Tooltip label="We do not send spam" position="top" placement="end">
      <InfoCircledIcon />
    </Tooltip>
  );

  //const initial_hierarchies = data.hierarchies.filter((_) => _.parentid === 0);

  return (
    <HierarchyContext.Provider value={{ data, dispatchHierarchies }}>
      <Modal
        opened={opened}
        onClose={onClose}
        title={titleName}
        styles={{ modal: { width: "900px" } }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <Text>{subTitleName}</Text>
          </div>
          <Box mt={20}>
            <Input
              icon={<MagnifyingGlassIcon />}
              placeholder="Search your hierarchy"
              rightSection={rightSection}
              rightSectionWidth={70}
              styles={{ rightSection: { pointerEvents: "none" } }}
            />
          </Box>
          <Tabs mt={20}>
            {tabs.map((tab, index) => {
              const { label, icon, initialData } = tab;
              return (
                <Tabs.Tab key={index} label={label} icon={icon}>
                  {initialData ? <HierachyTree data={initialData} /> : "No data"}
                </Tabs.Tab>
              );
            })}
          </Tabs>
        </div>
      </Modal>
    </HierarchyContext.Provider>
  );
}
