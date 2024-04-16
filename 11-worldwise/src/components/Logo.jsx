import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    // We use Link instead of NavLink because we dont need to add any special styles which this image is selected/clicked
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
