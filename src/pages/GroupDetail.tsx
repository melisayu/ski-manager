import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useGlobalState } from '../state/GlobalStateContext';
import TrailCard from '../components/TrailCard';
import { Trail } from '../types/Trail';
import ActionBar from '../components/ActionBar';
import { Group } from '@mui/icons-material';
import GroupForm from '../components/Form';
import { useGroupForm } from '../hooks/useGroupForm';

const DetailWrapper = styled.div`
  overflow-x: scroll;
  scroll-behavior: smooth;
  width: 100%;
`;

const Wrapper = styled.div`
  margin: 2rem;
  width: auto;
  text-align: left;
`;

const InfoWrapper = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--winter-blue);

  p {
    margin: 6px 0;
  }
`;

const FieldWrapper = styled.span`
   display: flex;
   flex-direction: row;
   align-items: center;
   gap: 1rem;
   justify-content: left;
`;

const TrailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template: none; 
  }
`;

const GroupDetail: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGlobalState();
  const { name, size, difficulty, groomStatus, elevationGain, recommendedTrails } = state.currentGroup!;
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleBackTo = () => {
    dispatch({ type: 'RESET_TRAIL_FILTER' });
    dispatch({ type: 'SET_CURRENT_GROUP', payload: undefined });
    navigate('/');
  };

  const { handleFormSubmit } = useGroupForm('EDIT_GROUP', () => setShowModal(false));

  return (
    <DetailWrapper>
      <Wrapper>
        {showModal && <GroupForm onClose={() => setShowModal(false)} onSubmit={handleFormSubmit} />}
        <ActionBar title={name} backTo={handleBackTo} showManageButton={setShowModal} manageButtonTitle="Edit" />
        <InfoWrapper>
          <FieldWrapper>
            <p>Group size: {size}</p><Group />
          </FieldWrapper>
          <FieldWrapper><p>Group difficulty level: {difficulty}</p></FieldWrapper>
          <FieldWrapper><p>Preferred groom status: {groomStatus}</p></FieldWrapper>
          <FieldWrapper><p>Minimum acceptable lift elevation gain: {elevationGain}</p></FieldWrapper>
          <FieldWrapper><p>Recommended trails: {recommendedTrails.length}</p></FieldWrapper>
          <TrailContainer>
            {recommendedTrails.map((trail: Trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </TrailContainer>
        </InfoWrapper>
        {recommendedTrails.length === 0 && <InfoWrapper>This group has no matching trails.</InfoWrapper>}
      </Wrapper>
    </DetailWrapper>
  )
};

export default GroupDetail;
