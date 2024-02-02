import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.logo}>TODO APP</h1>
      <ul className={styles.navItems}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/singletodo/:id">Update</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
