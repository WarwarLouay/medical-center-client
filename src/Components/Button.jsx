import React from 'react';
import styled from 'styled-components';

const Button = ({ content, onClick, disabled}) => {
  return (
    <StyledButton style={{cursor: disabled ? 'no-drop' : 'pointer',
                          opacity: disabled ? '0.5' : '1'}}
                  disabled={disabled}
                  onClick={onClick}>
                    {content}
    </StyledButton>
  )
};

const StyledButton = styled.button`
    background: #409DBA;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 65%;
    height: 3rem;
    border: none;
    color: white;
    border-radius: 2rem;
    cursor: pointer;
`;

export default Button
