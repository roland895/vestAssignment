import React, { useState } from 'react';
import './header.css'; // Assuming you'll style it with a separate CSS file
import searchIcon from '../../assets/icons/search.svg'
const Header = () => {
  // State to track search input value
  const [searchValue, setSearchValue] = useState('');

  // State to track dropdown value
  const [dropdownValue, setDropdownValue] = useState('profile');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle dropdown selection change
  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  return (
    <header className="header">
      <div className="header__search">
        <img src={searchIcon}/>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
          className="header__search-input"
        />
      </div>

      <div className="header__right">
        <i className="header__icon">🔔</i>
        <select
          className="header__dropdown"
          value={dropdownValue}
          onChange={handleDropdownChange}
        >
          <option value="profile">Profile</option>
          <option value="settings">Settings</option>
          <option value="logout">Logout</option>
        </select>
      </div>
    </header>
  );
};

export default Header;