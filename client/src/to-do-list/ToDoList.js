import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import axios from "axios";

import "bootswatch/dist/sketchy/bootstrap.min.css";
import "./ToDoList.css";

const url = "http://localhost:5001/";

function ToDoList() {
  const [listItem, setListItem] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (item) {
      const singleItem = { id: uuid(), item, quantity };
      console.log(singleItem);

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
      setQuantity("");
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
  //console.log(listItem);

  return (
    <>
      <form className="form">
        <div className="form-control">
          <label htmlFor="item">Insert Items: </label>
          <input
            type="text"
            className="container"
            name="item"
            value={item}
            placeholder="Name"
            autoComplete="off"
            onChange={(e) => setItem(e.target.value)}
          />
          <input
            type="number"
            className="container"
            name="quanity"
            value={quantity}
            placeholder="Quantity"
            autoComplete="off"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button className="btn" type="submit" onClick={handleSubmit}>
          Add Item
        </button>
      </form>
      {listItem.map((singleItem) => {
        const { id, item, quantity } = singleItem;
        console.log(singleItem);

        // const deleteData = async (id) => {
        //   const response = await fetch(`http://localhost:8081/${id}`, {
        //     method: "DELETE",
        //     headers: {
        //       headers: { "Content-type": "application/json; charset=UTF-8" },
        //     },
        //     body: JSON.stringify(singleItem),
        //   });

        //   const data = await response.json();

        //   // now do whatever you want with the data
        //   console.log(singleItem);
        // };

        // deleteData();
        const deleteData = () => {
          console.log(deleteData);
          fetch(`http://localhost:5001/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: null,
          })
            .then((response) => {
              return response.json();
            })
            .then((data) =>
              // this is the data we get after putting our data, do whatever you want with this data
              console.log(data)
            );
        };
        return (
          <div key={id} className="item">
            <h2>{item}</h2>
            <h2>{quantity}</h2>
            <button type="submit" onClick={deleteData}>
              Remove Item
            </button>
          </div>
        );
      })}
    </>
  );
}

export default ToDoList;
