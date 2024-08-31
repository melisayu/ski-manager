import React from 'react';
import styled from 'styled-components';
import TrailCard from '../components/TrailCard';
import ActionBar from '../components/ActionBar';
import { useGlobalState } from '../state/GlobalStateContext';

const ContentWrapper = styled.div`
  position: relative;
  overflow-y: scroll;
  width: 100%;
`;

const Wrapper = styled.div`
  margin: 2rem;
  width: auto;
`;

const TrailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 600px) {
    grid-template: none; 
  }
`;

const AllTrails: React.FC = () => {
  const { state } = useGlobalState();

  return (
    <ContentWrapper data-testid="all-trails">
      <Wrapper>
        <ActionBar title="All Trails" count={state?.trailCount} filter={'trail'} />
        {state.isLoading
          ? <p>Loading ...</p>
          : (
              <TrailContainer>
                {state?.filteredTrails?.map((trail) => (
                  <TrailCard trail={trail} key={trail.id} />
                ))}
              </TrailContainer>
            )
        }
      </Wrapper>
    </ContentWrapper>
  )
};

export default AllTrails;
