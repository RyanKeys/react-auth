export default function Navbar({ loggedIn }) {
  if (loggedIn) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:3000">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/about-us">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://localhost:3000/custom-orders"
                >
                  Custom Orders
                </a>
              </li>
            </ul>
            <a className="nav-link" href="http://localhost:3000/account">
              Your Account
            </a>
            <span className="navbar-text">
              <button
                className="btn btn-success"
                onClick={() => {
                  localStorage.clear();
                  window.location.replace("http://localhost:3000");
                }}
              >
                Logout
              </button>
            </span>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="http://localhost:3000">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000/about-us">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="http://localhost:3000/custom-orders"
              >
                Custom Orders
              </a>
            </li>
          </ul>
          <span className="navbar-text">
            <button
              className="btn btn-primary"
              onClick={() => {
                window.location.replace("http://localhost:3000/login");
              }}
            >
              Login
            </button>
          </span>
        </div>
      </div>
    </nav>
  );
}
