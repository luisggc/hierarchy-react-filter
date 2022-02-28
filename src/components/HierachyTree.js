import React from "react";
import HierarchyItem from "./HierarchyItem";

export default function HierachyTree({ data, indentation = 0 }) {
  console.log(data);
  return (
    <div>
      {data.map((h, k) => (
        <HierarchyItem  {...h} key={h.id}/>
      ))}
    </div>
  );
}
