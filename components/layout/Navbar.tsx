import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">
            {" "}
            <img
              src="/mainlogo.png.png"
              alt="Logo"
              style={{ width: "200px", paddingTop: "50px" }}
            />
          </div>
        </div>

        {/* Nav Links */}
        <nav className="nav-links">
          <Link href="/">Features</Link>
          <Link href="/">How It Works</Link>
          <Link href="/">Solutions</Link>
          <Link href="/">Pricing</Link>
          <Link href="/">Docs</Link>
        </nav>

        <div className="nav-btns">
          <Link href="/login" className="login">
            Log In
          </Link>
          <Link href="/signup" className="signup">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
