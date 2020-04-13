import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

type StepIndicator = {
  curPos: number;
  steps: number;
};

type DotProps = {
  focused: boolean;
};

const BaseDot = animated(
  styled.div<DotProps>({
    width: 24,
    height: 24,
    border: '1.5px solid white',
    borderRadius: 666,
  })
);

const Dot = (props: DotProps) => {
  const dotFillAnim = useSpring({
    backgroundColor: props.focused
      ? 'rgba(255, 255, 255, 1)'
      : 'rgba(255, 255, 255, 0)',
  });

  return <BaseDot {...props} style={dotFillAnim} />;
};

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
