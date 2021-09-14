export const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    console.log(action.type);
    const newItem = [...state.items, action.payload];
    return {
      ...state,
      items: newItem,
      isModalOpen: true,
      modalContent: "Item Added",
    };
  }
  if (action.type === "NO_VALUE") {
    return { ...state, isModalOpen: true, modalContent: "please enter value" };
  }
  if (action.type === "CLOSE_MODAL") {
    return { ...state, isModalOpen: false };
  }
  if (action.type === "REMOVE_ITEM") {
    return { ...state, isModalOpen: true, modalContent: "Item Removed" };
  }

  throw new Error("no matching action type");
};
