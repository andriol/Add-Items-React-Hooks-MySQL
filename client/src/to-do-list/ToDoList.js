import React, { useState } from "react";
import uuid from "react-uuid";
import axios from "axios";

function ToDoList() {
  const [listItem, setListItem] = useState([]);
  const [item, setItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (item) {
      const singleItem = { id: uuid(), item };

      fetch("http://localhost:8080/", {
        method: "POST",
        body: JSON.stringify(singleItem),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((json) => {
          console.log(json);
        })
        //Then with the error genereted...
        .catch((error) => {
          console.error("Error:", error);
        });

      console.log(singleItem);
      setListItem((item) => {
        return [...item, singleItem];
      });
      setItem("");
    } else {
      console.log("empty value");
    }
  };

  return (
    <>
      <form className="form">
        <div className="form-control">
          <label htmlFor="item">Insert Item: </label>
          <input
            type="text"
            className="container"
            name="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <button className="btn" type="submit" onClick={handleSubmit}>
          Add Item
        </button>
      </form>
      {listItem.map((singleItem) => {
        const { id, item } = singleItem;
        return (
          <div key={id} className="item">
            <h2>{item}</h2>
          </div>
        );
      })}
    </>
  );
}

export default ToDoList;

//  fetch("http://localhost:8080/", {
//    method: "post",
//    headers: { "Content-Type": "application/json" },
//    body: JSON.stringify({ singleItem }),
//  })
//    .then((res) => res.json())
//    .then((json) => setItem(json.singleItem));
