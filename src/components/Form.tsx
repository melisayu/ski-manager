import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Close } from '@mui/icons-material';
import { Difficulty } from '../types/Difficulty';
import { generateId } from '../utils/utils';
import Button from './Button';
import { useGlobalState } from '../state/GlobalStateContext';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Wrapper = styled.div`
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: .5rem;
  align-items: end;
`;

const CloseButton = styled.button`
  cursor: pointer;
  width: 2.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  width: 20rem;
  text-align: left;

  input {
    line-height: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Select = styled.select`
  margin-bottom: 1rem;
  height: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

export interface FormDataType {
  id: string;
  name: string;
  size: number;
  difficulty: Difficulty | '';
  groomStatus: string;
  elevationGain: number;
}

interface FormProps {
  onClose: () => void;
  onSubmit: (data: FormDataType) => void;
}

const GroupForm: React.FC<FormProps> = ({ onClose, onSubmit }) => {
  const { state } = useGlobalState();
  const { currentGroup } = state;

  const [formState, setFormState] = useState<FormDataType>({
    id: '',
    name: '',
    size: 1,
    difficulty: '',
    groomStatus: 'any',
    elevationGain: 0,
  });

  // Initialize form state if currentGroup is present.
  useEffect(() => {
    if (currentGroup) {
      setFormState({
        id: currentGroup.id,
        name: currentGroup.name,
        size: currentGroup.size,
        difficulty: currentGroup.difficulty,
        groomStatus: currentGroup.groomStatus,
        elevationGain: currentGroup.elevationGain,
      })
    }
  }, [currentGroup]);

  // Handle form input changes.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: id === 'size' || id === 'elevationGain' ? Number(value) : value,
    }));
  };

  // Handle form submission.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      ...formState,
      id: currentGroup ? currentGroup.id : generateId(),
    });
  }

  return (
    <Overlay>
      <Wrapper>
        <CloseButton onClick={() => onClose()}>
          <Close />
        </CloseButton>
        <Form onSubmit={handleSubmit}>
          <h3>Add a new group</h3>
          <label htmlFor="groupName">Group name: </label>
          <input
            id="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="size">Group size: </label>
          <input
            id="size"
            type="number"
            value={formState.size}
            onChange={handleChange}
            min="1"
            required
          />
          <label htmlFor="difficulty">Trail Difficulty: </label>
          <Select
            id="difficulty"
            value={formState.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select difficulty</option>
            <option value={Difficulty.BEGINNER}>Beginner</option>
            <option value={Difficulty.INTERMEDIATE}>Intermediate</option>
            <option value={Difficulty.ADVANCED}>Advanced</option>
            <option value={Difficulty.EXPERT}>Expert</option>
          </Select>
          <label htmlFor="groomStatus">Groom status: </label>
          <Select
            id="groomStatus"
            value={formState.groomStatus}
            onChange={handleChange}
          >
            <option value="any">Select groom status</option>
            <option value="groomed">Groomed</option>
            <option value="ungroomed">Not groomed</option>
          </Select>
          <label htmlFor="elevationGain">Minimum acceptable lift elevation gain: </label>
          <input
            id="elevationGain"
            type="number"
            max="13000"
            min="0"
            value={formState.elevationGain}
            onChange={handleChange}
          />
          <ButtonWrapper>
            <Button type="submit" color="primary">Save</Button>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Overlay>
  )
};

export default GroupForm;
