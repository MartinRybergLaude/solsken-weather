import { useEffect, useState } from "react";
import cx from "classnames";

import { getItem, setItem } from "~/utils/storage";

import styles from "./ToggleButton.module.css";

type Option = {
  label: string;
  value: string;
};

interface ToggleButtonProps {
  options: Option[];
  groupKey: string;
  id: string;
}

function ToggleButton({ options, groupKey, id }: ToggleButtonProps) {
  const [selected, setSelected] = useState(getInitialSelected());

  function getInitialSelected() {
    return getItem(groupKey) || options[0].value;
  }

  useEffect(() => {
    setItem(groupKey, selected);
  }, [selected, groupKey]);

  return (
    <ul className={styles.container} id={id}>
      {options.map((option, i) => (
        <li key={i} className={styles.listItem}>
          <button
            key={option.value}
            className={cx(styles.button, option.value == selected && styles.selected)}
            onClick={() => setSelected(option.value)}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ToggleButton;
