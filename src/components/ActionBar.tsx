import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import TrailFilter from './TrailFilter';
import { ArrowBack, Edit } from '@mui/icons-material';

const ActionsHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ActionsTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem;
  text-transform: capitalize;
  width: 100%;

  span {
    position: relative;
    top: 3px;
    color: var(--cottage-blue);
    margin-left: 1rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  cursor: pointer;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 0 1rem;
  width: auto;
`;

interface ActionBarProps {
  title: string;
  count?: number;
  filter?: 'trail' | 'group';
  backTo?: () => void;
  showManageButton?: (show: boolean) => void;
  manageButtonTitle?: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ title, count, filter, backTo, showManageButton, manageButtonTitle }) => {
  return (
    <ActionsHeader>
        <ActionsTitle>
          <h2>{title}</h2>
          <span>{count}</span>
        </ActionsTitle>
        {backTo && <BackButton onClick={() => backTo()}><ArrowBack /></BackButton>}
        <ActionButtons>
          {/* Might implement other type of filter later */}
          {filter === 'trail' && (
             <TrailFilter />
          )}
          {showManageButton &&
            <Button onClick={() => showManageButton(true)} title={manageButtonTitle} color="primary">
              {manageButtonTitle === 'Edit' ? <Edit /> : ''}
            </Button>
          }      
        </ActionButtons>
      </ActionsHeader>
  )
};

export default ActionBar;
