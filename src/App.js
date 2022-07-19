import "./App.css";
import HierarchyFilter from "./components/HierarchyFilter";
import { ListBulletIcon, GlobeIcon, StarIcon } from "@modulz/radix-icons";
import { hierarchies } from "./api/data_example";
import { Button, Group } from "@mantine/core";
import { useState } from "react";

function App() {
  const [opened, setOpened] = useState(true);

  return (
    <div className="App">
      <HierarchyFilter
        titleName="Select Hierarchy"
        subTitleName="Select the MOST ACCURATE hierarchy to identify where the event occurred"
        tabs={[
          {
            label: "Hierarchy",
            icon: <ListBulletIcon />,
            initialData: hierarchies,
            getSonsofNode: (node) => node.children,
            searchNodesbyLabel: (node, search) =>
              node.label.toLowerCase().includes(search.toLowerCase()),
            onlySelection: true,
          },
          {
            label: "Location",
            icon: <GlobeIcon />,
            titleName: "Select Location",
            subTitleName: "Select the MOST ACCURATE location to identify where the event occurred",
          },
          {
            label: "Favorites",
            icon: <StarIcon />,
            titleName: "Select Favorites",
            subTitleName: "Select your favorite data",
          },
        ]}
        opened={opened}
        onClose={() => setOpened(false)}
      />

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </div>
  );
}

export default App;
