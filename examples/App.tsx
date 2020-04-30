import React from 'react';
import styled from 'styled-components';
import Tourguide from '../src/Tourguide';
import useGuide from '../src/useGuide';

const Card = styled.div({
  boxShadow:
    '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  backgroundColor: 'white',
  borderRadius: '4px',
  padding: '1rem',
});

const messages = ['hello1', 'world2', 'hello3'];

const node = document.getElementById('tourguide-root');

function App() {
  const {
    curPos,
    anchorEls,
    getAnchorElProps,
    next,
    prev,
    toggle,
    close,
  } = useGuide();

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <h2 {...getAnchorElProps(1)}>Some cool subtitle 2</h2>
          <Card {...getAnchorElProps(0)}>Some random card with content</Card>
          <p {...getAnchorElProps(2)}>Some cool content 3</p>
        </div>
        <button onClick={toggle}>show</button>
      </div>
      <Tourguide
        positionStyles={{
          spotlight: {
            0: {
              width: (baseWidth) => baseWidth + 500,
              height: (baseHeight) => baseHeight + 30,
            },
          },
        }}
        animated
        node={node}
        tooltip={messages.map((message) => (
          <Card>{message}</Card>
        ))}
        leftControl={
          <button disabled={curPos === 0} onClick={prev}>
            prev
          </button>
        }
        rightControl={
          <button disabled={curPos === anchorEls.length - 1} onClick={next}>
            next
          </button>
        }
        closeControl={<button onClick={close}>Close</button>}

        // content={messages}
      />
    </>
  );
}

export default App;
