import { NavLink } from "react-router-dom";

export function Header() {
  return (
      <ul className="nav flex items-center justify-center bg-blue-200 p-3 gap-2.5 text-2xl">
        <li className="nav-item">
          <p className="nav-link text-black/50 cursor-default">React Pagination</p>
        </li>
        <li className="nav-item">
          <NavLink className="pb-1 border-b-2 border-transparent hover:border-black transition-all duration-300" to={"/"}>Main</NavLink>
        </li>
      </ul>
  );
}
