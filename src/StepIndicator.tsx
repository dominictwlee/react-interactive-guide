import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

type StepIndicator = {
  curPos: number;
  steps: number;
};

type DotProps = {
  focused: boolean;
};

const Dot = styled.div<DotProps>({
  width: 24,
  height: 24,
  border: '1.5px solid white',
  borderRadius: 666,
});

const StepContainer = styled.div({
  display: 'flex',
  '& div:not(:first-child)': {
    marginLeft: 24,
  },
});

const StepIndicator = ({ steps, curPos }: StepIndicator) => {
  return (
    <StepContainer>
      {Array(steps)
        .fill(null)
        .map((_, index) => (
          <Dot key={`dot-${index}`} focused={curPos === index} />
        ))}
    </StepContainer>
  );
};

export default StepIndicator;
