import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Home, DownhillSkiing, EventAvailable, Logout } from '@mui/icons-material';
import { useGlobalState } from '../state/GlobalStateContext';

const Nav = styled.nav`
  background-color: white;
`;

const NavBarList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const List = styled.li`
  width: 60px;
  height: 60px;
  margin: 1rem;
  a {
    background-color: white;
    display: block;
    padding: 1rem;
    text-decoration: none;
    color: var(--dark-blue);
    border-radius: 20px;
    transition: background-color 0.3s ease;
  }

  a:hover, a.active {
    background-color: var(--cottage-blue);
    color: white;
  }
`;

const SideBar: React.FC = () => {
  const { dispatch } = useGlobalState();
  const handleNavClick = () =>{
    dispatch({ type: 'RESET_TRAIL_FILTER' });
    dispatch({ type: 'SET_CURRENT_GROUP', payload: undefined });
  };

  return (
    <Nav data-testid="sidebar">
      <NavBarList>
        <List>
        </List>
        <List>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
            <Home />
          </NavLink>
        </List>
        <List>
          <NavLink to="/all-trails" onClick={handleNavClick}>
            <DownhillSkiing />
          </NavLink>
        </List>
        <List>
          <NavLink to="event" onClick={handleNavClick}>
            <EventAvailable />
          </NavLink>
        </List>
        <List>
          <NavLink to="logout" onClick={handleNavClick}>
            <Logout />
          </NavLink>
        </List>
      </NavBarList>
    </Nav>
  )
};

export default SideBar;
