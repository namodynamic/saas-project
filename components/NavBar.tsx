import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex gap-2.5 cursor-pointer items-center">
          <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <p>Sign In</p>
      </div>
    </nav>
  );
};
export default NavBar;
