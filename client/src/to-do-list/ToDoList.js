import React, { useState, useEffect, useReducer } from "react";
import * as uuid from "uuid";
import { reducer } from "./reducer";
import Modal from "./Modal";
import "bootswatch/dist/sketchy/bootstrap.min.css";
import "./ToDoList.css";

const url = "http://localhost:5001/";

function ToDoList() {
  const [listItem, setListItem] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    isModalOpen: false,
    modalContent: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (item) {
      const singleItem = { id: uuid(), item, quantity };

      console.log(singleItem);
      dispatch({ type: "ADD_ITEM", payload: singleItem });
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
      //console.log("empty value");
      dispatch({ type: "NO_VALUE" });
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
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
    console.log(closeModal);
  };
  return (
    <>
      {state.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}
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

        // deleteData();
        const deleteData = () => {
          console.log(deleteData);
          dispatch({ type: "REMOVE_ITEM", payload: "deletaData" });
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
