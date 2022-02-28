import { useState } from "react";
import { Modal, Button, Group, Text, Tabs, Input, Tooltip } from "@mantine/core";
import {
  InfoCircledIcon,
  MagnifyingGlassIcon,
  ListBulletIcon,
  GlobeIcon,
  StarIcon,
} from "@modulz/radix-icons";

export default function HierarchyFilter({
  titleName = "Select Hierarchy",
  subTitleName = "Select the MOST ACCURATE location to identify where the event occurred",
}) {
  const [opened, setOpened] = useState(true);

  const rightSection = (
    <Tooltip label="We do not send spam" position="top" placement="end">
      <InfoCircledIcon />
    </Tooltip>
  );

  return (
    <>
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
          <div style={{ marginTop: "20px" }}>
            <Input
              icon={<MagnifyingGlassIcon />}
              placeholder="Search your hierarchy"
              rightSection={rightSection}
              rightSectionWidth={70}
              styles={{ rightSection: { pointerEvents: "none" } }}
            />
          </div>
          <Tabs style={{ marginTop: "20px" }}>
            <Tabs.Tab label="Hierarchy" icon={<ListBulletIcon />}>
              Gallery tab content
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
    </>
  );
}
