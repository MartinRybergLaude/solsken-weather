import React, { ChangeEventHandler } from "react";
import { FiSearch } from "react-icons/fi";

import Spinner from "../Spinner";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  label?: string;
  autoFocus?: boolean;
  loading?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
  autoFocus,
  loading,
}: SearchBarProps) {
  return (
    <div className={styles.root}>
      {loading ? (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <FiSearch className={styles.icon} />
      )}
      <input
        className={styles.search}
        autoFocus={autoFocus}
        id="search"
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
