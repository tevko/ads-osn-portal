import React from "react";
import Header from "./Header";
import Data from "./data/data.json";

export default function Home() {
  // fetch from API and render
  return (
    <>
      <Header />
      <div className="invoices">
        {Data.map((post) => {
          return (
            <>
              <h4>{post.title}</h4>
              <p> {post.content} </p>
            </>
          );
        })}
      </div>
    </>
  );
}
