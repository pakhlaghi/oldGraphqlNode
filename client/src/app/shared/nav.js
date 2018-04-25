import React from 'react';

const Nav = ({ navData }) => {
  const { brand, menu } = navData;

  return (
    <nav className="navbar navbar-expand-lg fixed-top ">
      <a className="navbar-brand" href="/#">
        <img
          src={brand.imgUrl}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        {brand.text}
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav mr-4">
          {menu.map(item => (
            <li className="nav-item">
              <a className="nav-link" href={`/${item.link}`}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
