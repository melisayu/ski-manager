import React from 'react';
import styled from 'styled-components';
import { GroupType } from '../types/Group';
import { Group } from '@mui/icons-material';

const Wrapper = styled.div`
  background-color: white;
  border: 1px solid;
  color: black;
  cursor: pointer;
  padding: 1rem;
  box-shadow: var(--box-shadow);
`;

const Name = styled.h3`
  text-transform: capitalize;
  text-align: left;
`;

const GroupWrapper = styled.span`
   display: flex;
   flex-direction: row;
   align-items: center;
   gap: 1rem;
   justify-content: center;
`;

const DifficultyLevel = styled.p`
  span {
    text-transform: capitalize;
    font-weight: 500;
  }
`;

interface CardProps {
  group: GroupType,
  onClick?: () => void,
}

const GroupCard: React.FC<CardProps> = ({ group, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <Name>{group.name}</Name>
      <GroupWrapper>
        <p>{group.size}</p><Group />
      </GroupWrapper>
      <DifficultyLevel>Difficulty level: <span>{group.difficulty}</span></DifficultyLevel>
      <p>Number of recommended trails: {group.numberOfRecommendedTrails} </p>
    </Wrapper>
  )
};

export default GroupCard;
