import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  title?: string,
  children?: React.ReactNode;
  onClick?: () => void,
  color?: string;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<{ color?: string }>`
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  border-color: transparent;
  margin-left: 8px;
  width: 8rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.color === 'primary' ? 'var(--winter-blue)' : 'white'};
  color: ${(props) => props.color === 'primary' ? 'white' : 'var(--dark-blue)'};
`;

const Button: React.FC<ButtonProps> = ({ title, onClick, color, children, type }) => {
  return (
    <StyledButton onClick={onClick} color={color} type={type ? type : 'button'}>
      {children}
      {title}
    </StyledButton>
  )
};

export default Button;
