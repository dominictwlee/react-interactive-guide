import React from 'react';
import useTourguide from '../src/useTourguide';
import styled from 'styled-components';
import Tourguide from '../src/Tourguide';

const Card = styled.div({
  boxShadow:
    '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  backgroundColor: 'white',
  borderRadius: '4px',
  padding: '1rem',
});

const messages = ['hello1', 'world2', 'hello3'];

function App() {
  const {
    show,
    curPos,
    anchorEls,
    getAnchorElProps,
    next,
    prev,
    toggle,
  } = useTourguide();

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
        <button disabled={curPos === anchorEls.length - 1} onClick={next}>
          next
        </button>
        <button disabled={curPos === 0} onClick={prev}>
          prev
        </button>
      </div>
      <Tourguide
        animated
        show={show}
        curPos={curPos}
        anchorEls={anchorEls}
        tooltip={messages.map(message => (
          <Card>{message}</Card>
        ))}
        // content={messages}
      />
    </>
  );
}

export default App;
