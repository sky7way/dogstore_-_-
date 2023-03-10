import React, { useRef, useState, useCallback } from "react";
import debounce from "lodash.debounce";

export default function Search({ search, setSearch }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const memoSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 500),
    []
  );

  const clear = () => {
    setValue("");
    setSearch("");
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
