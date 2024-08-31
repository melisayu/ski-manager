import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import GroupCard from '../components/GroupCard';
import ActionBar from '../components/ActionBar';
import { useGlobalState } from '../state/GlobalStateContext';
import GroupForm from '../components/Form';
import { useGroupForm } from '../hooks/useGroupForm';

const DashboardWrapper = styled.div`
  position: relative;
  overflow-y: scroll;
  width: 100%;

  @media (max-width: 600px) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  margin: 2rem;
  width: auto;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 1rem;

  @media (max-width: 600px) {
    grid-template: none;
  }
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { state, dispatch } = useGlobalState();
  const { handleFormSubmit } = useGroupForm('ADD_GROUP', () => setShowModal(false));

  const handleGroupClick = (id: string) => {
    navigate(`/group/${id}`);
    dispatch({ type: 'SET_CURRENT_GROUP', payload: id });
  };

  return (
   <DashboardWrapper>
      <Wrapper>
        {showModal && <GroupForm onClose={() => setShowModal(false)} onSubmit={handleFormSubmit} />}
        <ActionBar title="Groups" count={state?.groupCount} manageButtonTitle="+ Add New Group" showManageButton={setShowModal} />
        <CardContainer>
          {state.groups.map((group) => (
            <GroupCard key={group.id} group={group} onClick={() => handleGroupClick(group.id)} />
          ))}
        </CardContainer>
      </Wrapper>
   </DashboardWrapper>
  )
};

export default Dashboard;
