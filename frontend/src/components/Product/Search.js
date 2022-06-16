import React, { Fragment, useState } from "react";
import "./Search.css";
import MetaData from "../layout/MetaData";
import { useHistory } from "react-router-dom";
const Search = () => {
  let history = useHistory();
  console.log("file: Search.js ~ line 5 ~ Search ~ history", history);
  const [keyWord, setKeyWord] = useState();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyWord && keyWord.trim()) {
      history.push(`/products/${keyWord}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <Fragment>
      <MetaData title="Search A Product" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => {
            setKeyWord(e.target.value);
          }}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
