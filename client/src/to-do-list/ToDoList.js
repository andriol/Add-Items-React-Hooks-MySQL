import React, { useState } from "react";
import uuid from "react-uuid";

function ToDoList() {
  const [listItem, setListItem] = useState([]);
  const [item, setItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item) {
      const singleItem = { id: uuid(), item };
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
