import React from "react";
import Graph from "./Graph";
import Data from "./data/Data";

export default function Home() {
  return (
    <div>
      <Graph data={Data} />
    </div>
  );
}
