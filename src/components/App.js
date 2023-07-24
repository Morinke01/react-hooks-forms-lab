import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import Header from "./Header";
import Filter from "./Filter";
import ItemForm from "./ItemForm";
import itemData from "../data/items";

function App() {
  const [items, setItems] = useState(itemData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchText, setSearchText] = useState(""); // State for search text

  // Function to handle dark mode toggle
  function handleDarkModeClick() {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  }

  // Function to handle category change
  function handleCategoryChange(event) {
    const category = event.target.value;
    if (category === "All") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
  }

  // Function to handle search text change
  function handleSearchChange(event) {
    const text = event.target.value;
    setSearchText(text);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  }

  // Function to handle form submission from ItemForm component
  // App.js
// ... (previous code)

function handleItemFormSubmit(newItem) {
  setItems([...items, newItem]);
  setFilteredItems([...items, newItem]); // Update the filteredItems state with the updated items
}

// ... (rest of the code)


  return (
    <div className={"App " + (isDarkMode ? "dark" : "light")}>
      <Header isDarkMode={isDarkMode} onDarkModeClick={handleDarkModeClick} />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        searchText={searchText} // Pass the search text state to Filter component
      />
      <ShoppingList items={filteredItems} />
      <ItemForm onItemFormSubmit={handleItemFormSubmit} /> {/* Pass the handleItemFormSubmit function as a prop */}
    </div>
  );
}

export default App;
