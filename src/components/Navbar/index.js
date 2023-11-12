import styles from "@/styles/Navbar.module.scss";
import {
  faBars,
  faDrumstickBite,
  faHome,
  faLeaf,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../Buttons/ThemeToggle";
import UserDetails from "../Buttons/UserDetails";
import { useRouter } from "next/navigation";

const links = [
  {
    name: "Veg",
    url: "/veg",
    icon: faLeaf,
  },
  {
    name: "Non-Veg",
    url: "/non-veg",
    icon: faDrumstickBite,
  },
  {
    name: "Publish",
    url: "/publish",
    icon: faPlus,
  },
];

function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/search/${search}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <nav className={`${styles.container} ${isScrolled ? styles.sticky : ""}`}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo.png"
          width={40}
          height={40}
          alt="logo"
          priority={true}
        />
        <span className="gradient">Recipe Global</span>
      </Link>
      <div className={styles.search}>
        <form action="" onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div
        ref={menuRef}
        className={`${styles.menu} ${toggle ? styles.show : ""}`}
      >
        <ul>
          {links.map((link, i) => (
            <li key={i}>
              <Link href={link.url}>
                <FontAwesomeIcon icon={link.icon} />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
        <UserDetails />
        <button
          ref={toggleRef}
          className={styles.toggle}
          onClick={() => setToggle(!toggle)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
