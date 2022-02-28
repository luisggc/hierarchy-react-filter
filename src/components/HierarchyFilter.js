import React, { useReducer, useState } from "react";
import { Modal, Button, Group, Text, Tabs, Input, Tooltip, Box } from "@mantine/core";
import {
  InfoCircledIcon,
  MagnifyingGlassIcon,
  ListBulletIcon,
  GlobeIcon,
  StarIcon,
} from "@modulz/radix-icons";
import HierachyTree from "./HierachyTree";
import HierarchyContext, { hierReducer } from "../api/HierarchyContext";
import { hierarchies } from "../api/data_example";

export default function HierarchyFilter({
  titleName = "Select Hierarchy",
  subTitleName = "Select the MOST ACCURATE location to identify where the event occurred",
}) {
  const [opened, setOpened] = useState(true);
  const [data, dispatchHierarchies] = useReducer(hierReducer, { hierarchies });
  const rightSection = (
    <Tooltip label="We do not send spam" position="top" placement="end">
      <InfoCircledIcon />
    </Tooltip>
  );

  const initial_hierarchies = data.hierarchies.filter((_) => _.parentid === 0);

  return (
    <HierarchyContext.Provider value={{ data, dispatchHierarchies }}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
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
            <Tabs.Tab label="Hierarchy" icon={<ListBulletIcon />}>
              <HierachyTree data={initial_hierarchies} />
            </Tabs.Tab>
            <Tabs.Tab label="Location" icon={<GlobeIcon />}>
              Messages tab content
            </Tabs.Tab>
            <Tabs.Tab label="Favorites" icon={<StarIcon />}>
              Settings tab content
            </Tabs.Tab>
          </Tabs>
        </div>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </HierarchyContext.Provider>
  );
}
