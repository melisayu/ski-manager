import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Close, Tune } from '@mui/icons-material';
import Button from './Button';
import { Difficulty } from '../types/Difficulty';
import { useGlobalState } from '../state/GlobalStateContext';
import { useTrailFilter } from '../hooks/useTrailFilter';

const FilterWrapper = styled.div`
  width: auto;
`;

const CloseButton = styled.button`
  display: block;
  float: right;
`;

const FilterControlWrapper = styled.div`
  width: 280px;
  background-color: white;
  padding: 1rem;
  position: absolute;
  z-index: 2;
  top: 5.5rem;
  right: 3rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
  input {
    margin-right: 8px;
  }
`;

const SliderLabel = styled.label`
  text-transform: capitalize;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const TrailFilter: React.FC = () => {
  const { state } = useGlobalState();
  const { handleDifficultyChange, handleGroomedChange, handleElevationGainChange } = useTrailFilter();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideFilter);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideFilter);
    }
  }, []);

  // TODO: Maybe move this to a separate hook?
  const handleClickOutsideFilter = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowFilter(false);
    }
  };

  const handleButtonClick = () => {
    setShowFilter(!showFilter);
  };

  return (
      <FilterWrapper ref={ref}>
        <Button title="Filter" onClick={() => handleButtonClick()}>
          <Tune />
        </Button>
        {showFilter && (
          <FilterControlWrapper>
            <CloseButton onClick={() => setShowFilter(false)}>
              <Close />
            </CloseButton>
            <div>
              <h4>Difficulty</h4>
              {Object.values(Difficulty).map(difficulty => (
                <Label key={difficulty}>
                  <input
                    type="checkbox"
                    value={difficulty}
                    checked={state.trailFilterOptions.difficulty.includes(difficulty)}
                    onChange={handleDifficultyChange}
                  />
                  {difficulty}
                </Label>
              ))}
            </div>
            <div>
              <h4>Groomed status</h4>
              <Label key={'groomed'}>
                <input
                  type="checkbox"
                  value={'groomed'}
                  onChange={handleGroomedChange}
                  checked={state?.trailFilterOptions.groomed?.groomed}
                />
                {'Yes'}
              </Label>
              <Label key={'not-groomed'}>
                <input
                  type="checkbox"
                  value={'ungroomed'}
                  onChange={handleGroomedChange}
                  checked={state?.trailFilterOptions.groomed?.ungroomed}
                />
                 {'No'}
              </Label>
            </div>
            <div>
              <h4>Lift elevation gain</h4>
              <SliderLabel key={'elevation-gain'}>
                <input type="range" value={state?.trailFilterOptions.elevationGain} min="1" max="13000" onChange={handleElevationGainChange} />
                <span>Value: {state?.trailFilterOptions.elevationGain}</span>
              </SliderLabel>
            </div>
          </FilterControlWrapper>
        )}
      </FilterWrapper>
  )
};

export default TrailFilter;
