import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import axios from "axios";

const url = "http://localhost:8080/";

function ToDoList() {
  const [listItem, setListItem] = useState([]);
  const [item, setItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (item) {
      const singleItem = { id: uuid(), item };

      fetch(url, {
        method: "POST",
        body: JSON.stringify(singleItem),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((json) => {
          console.log(json);
        })
        //Then with the error generated...
        .catch((error) => {
          console.error("Error:", error);
        });

      setItem("");
    } else {
      console.log("empty value");
    }
  };

  const getItems = async () => {
    const response = await fetch(url);
    const listItem = await response.json();
    setListItem(listItem);
  };
  useEffect(() => {
    getItems();
  }, []);

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
