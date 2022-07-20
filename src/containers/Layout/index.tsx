import { ReactNode } from "react";
import styles from "./Layout.module.css";
import cx from "classnames";
interface Props {
  children: ReactNode;
  flex?: boolean;
  padding?: boolean;
}

function Layout({ children, flex = false, padding = false }: Props) {
  return (
    <div
      className={cx(
        styles.root,
        flex && styles.flex,
        padding && styles.padding
      )}
    >
      {children}
    </div>
  );
}

export default Layout;
