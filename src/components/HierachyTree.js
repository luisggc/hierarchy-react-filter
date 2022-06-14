import React from "react";
import HierarchyItem from "./HierarchyItem";

export default function HierachyTree({ data, indentation = 0 }) {
  return (
    <div>
      {data.map((h, k) => (
        <HierarchyItem  {...h} key={h.id}/>
      ))}
    </div>
  );
}
