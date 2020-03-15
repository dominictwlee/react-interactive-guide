import React from 'react';
import useTourguide from './useTourguide';
import Tooltip from './Tooltip';
import Spotlight from './Spotlight';
import styled from 'styled-components';

const Card = styled.div({
  boxShadow:
    '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  backgroundColor: 'white',
  borderRadius: '4px',
  padding: '1rem',
});

function App() {
  const {
    show,
    anchorEl,
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
      <Spotlight show={show} anchorEl={anchorEl} curPos={curPos} pos={0} />
      {/* {anchorEls.map((el, index) => (
        <Spotlight
          key={`anchorEl-child-${index}`}
          show={show}
          anchorEl={el}
          pos={Number(el.dataset.tourguidePosition)}
          curPos={curPos}
        />
      ))}
      {anchorEls.map((el, index) => (
        <Tooltip
          key={`anchorEl-tooltip-child-${index}`}
          show={show}
          anchorEl={el}
          pos={Number(el.dataset.tourguidePosition)}
          curPos={curPos}
        />
      ))} */}
    </>
  );
}

export default App;
