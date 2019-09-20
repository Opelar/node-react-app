import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
        <li>
          <Link to="/user/">Users</Link>
        </li>
        <li>
          <Link to="/movieurl/list/">Movie Url List</Link>
        </li>
      </ul>
    </nav>
  )
}
