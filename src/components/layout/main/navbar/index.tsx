import Link from "next/link";

const menuList = [
  { name: "home", destination: "/" },
  { name: "about", destination: "/about" },
];

const Navbar = () => {
  return (
    <nav className="flex">
      <ul className="font-medium md:flex md:flex-row md:space-y-0 space-y-2">
        {menuList.map((menu, index) => (
          <li key={index} className="relative md:mr-4">
            <Link
              href={menu.destination}
              className="block py-2 pl-4 md:pl-0 underline-transition"
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
