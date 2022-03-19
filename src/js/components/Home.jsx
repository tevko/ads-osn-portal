import React from "react";
import { ResponsiveBar } from "@nivo/bar";

export default function Home() {
  const data = [
    {
      day: "Monday",
      degress: 59,
    },
    {
      day: "Tuesday",
      degress: 61,
    },
    {
      day: "Wednesday",
      degress: 55,
    },
    {
      day: "Thursday",
      degress: 78,
    },
    {
      day: "Friday",
      degress: 71,
    },
    {
      day: "Saturday",
      degress: 56,
    },
    {
      day: "Sunday",
      degress: 67,
    },
  ];

  return (
    <div>
      <h1>Bar</h1>
      <div style={{ width: "100%", height: "500px" }}>
        <ResponsiveBar
          data={data}
          keys={["degress"]}
          indexBy="day"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.4}
          valueScale={{ type: "linear" }}
          animate={true}
          enableLabel={false}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "degrees",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          theme={{
            background: "transparent",
            textColor: "white",
            fontSize: 11,
            axis: {
              domain: {
                line: {
                  stroke: "#777777",
                  strokeWidth: 1,
                },
              },
              legend: {
                text: {
                  fontSize: 12,
                  fill: "white",
                },
              },
              ticks: {
                line: {
                  stroke: "#777777",
                  strokeWidth: 1,
                },
                text: {
                  fontSize: 11,
                  fill: "white",
                },
              },
            },
            grid: {
              line: {
                stroke: "#dddddd",
                strokeWidth: 1,
              },
            },
            legends: {
              title: {
                text: {
                  fontSize: 11,
                  fill: "#333333",
                },
              },
              text: {
                fontSize: 11,
                fill: "#333333",
              },
              ticks: {
                line: {},
                text: {
                  fontSize: 10,
                  fill: "#333333",
                },
              },
            },
            annotations: {
              text: {
                fontSize: 13,
                fill: "#333333",
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
              },
              link: {
                stroke: "#000000",
                strokeWidth: 1,
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
              },
              outline: {
                stroke: "#000000",
                strokeWidth: 2,
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
              },
              symbol: {
                fill: "#000000",
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
              },
            },
            tooltip: {
              container: {
                background: "#ffffff",
                color: "#333333",
                fontSize: 12,
              },
              basic: {},
              chip: {},
              table: {},
              tableCell: {},
              tableCellValue: {},
            },
          }}
        />
      </div>
    </div>
  );
}
