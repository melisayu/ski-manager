import React from 'react';
import styled from 'styled-components';
import { Trail } from '../types/Trail';
import { Lift } from '../types/Lift';
import { Difficulty } from '../types/Difficulty';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  box-shadow: var(--box-shadow);
`;

const ImageWrapper = styled.div`
  height: 15rem;
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Content = styled.div`
 position: relative;
  z-index: 1;
  background-color: var(--faded-blue);
  text-transform: capitalize;
  text-align: left;

  p {
    margin: 4px;
  }
`;

const TrailDifficulty = styled.span<{ difficulty: Difficulty }>`
  border: 1px solid gray;
  padding: 4px 8px;
  background-color: ${({difficulty}) => {
    switch (difficulty) {
      case Difficulty.BEGINNER:
        return 'lightgreen';
      case Difficulty.INTERMEDIATE:
        return 'yellow';
      case Difficulty.ADVANCED:
        return 'orange';
      case Difficulty.EXPERT:
        return 'indianred';
      default:
        return 'gray'
    }
  }};
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1;
  border-radius: 4px;
  text-transform: capitalize;
  width: 7rem;
  text-align: center;
`;


interface TrailCardProps {
  onClick?: () => void,
  trail: Trail;
}

const TrailCard: React.FC<TrailCardProps> = ({ onClick, trail }) => {
  /**
  * Get lift with the smallest elevation gain.
  * @param lifts array
  * @returns elevation gain
  */
  const smallestElevationGain = (lifts: Lift[]): string => {
    const smallest = lifts.reduce((min, lift) => lift.elevationGain < min.elevationGain ? lift : min);
    return smallest.elevationGain.toString() || '-';
  };

  /**
  * Get lift that has the most capacity.
  * @param lifts array
  * @return string of lift's name and capacity
  */
  const largestLift = (lifts: Lift[]): string => {
    const largestLift = lifts.reduce((maxLift, lift) => lift.capacity > maxLift.capacity ? lift : maxLift);
    return `${largestLift.name} (up to ${largestLift.capacity.toString()} people)` || '-';
  };

  /**
  * Map trail difficulty to the appropriate image path.
  * @param difficulty string
  * @returns image path
  */
  const getImage = (difficulty: Difficulty): string => {
    switch(difficulty) {
      case Difficulty.BEGINNER:
        return '/ski-beginner.jpg';
      case Difficulty.INTERMEDIATE:
        return '/ski-intermediate.jpg';
      case Difficulty.ADVANCED:
        return '/ski-advanced.jpg';
      case Difficulty.EXPERT:
        return '/ski-expert.jpg';
      default:
        return '';
    }
  };

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={getImage(trail.difficulty)} alt="Ski trail" />
        <TrailDifficulty difficulty={trail.difficulty}>{trail.difficulty}</TrailDifficulty>
      </ImageWrapper>
      <Content>
        <h3>{trail.name}</h3>
        <p>Groomed: {trail.groomed ? 'Yes' : 'No'}</p>
        <p>Number of lift to the summit: {trail.accessedByLifts.length}</p>
        <p>Lift with maximum capacity:</p>
        <p>{largestLift(trail.accessedByLifts)}</p>
        <p>Smallest elevation gain: {smallestElevationGain(trail.accessedByLifts)}</p>
      </Content>
    </Wrapper>
  )
};

export default TrailCard;
