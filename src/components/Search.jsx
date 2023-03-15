import React, { useRef, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { clearSearch, setSearch } from "../redux/slices/searchReducer";

export default function Search() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const memoSearch = useCallback(
    debounce((value) => {
      dispatch(setSearch(value));
    }, 500),
    []
  );

  const clear = () => {
    setValue("");
    dispatch(clearSearch());
    inputRef.current?.focus();
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
    memoSearch(e.target.value);
  };

  return (
    <div className="search">
      <input
        ref={inputRef}
        value={value}
        className="search__input"
        placeholder="Поиск товаров..."
        onChange={onChangeInput}
      />
      {value.length ? (
        <i
          className="uil uil-times"
          style={{ cursor: "pointer" }}
          onClick={clear}
        ></i>
      ) : (
        <i className="uil uil-search"></i>
      )}
    </div>
  );
}
