<h1 align="center">Welcome to react-interactive-guide 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-interactive-guide" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-interactive-guide.svg">
  </a>
  <a href="https://github.com/dominictwlee/react-interactive-guide#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/dominictwlee/react-interactive-guide/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/dominictwlee/react-interactive-guide/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/dominictwlee/react-interactive-guide" />
  </a>
</p>

> Interactive tour guide for your react app

### Documentation

#### 1. Wrap your app with the `TourGuideProvider`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { TourguideProvider } from 'react-interactive-guide';
import App from './App';
import './index.css';

ReactDOM.render(
  <TourguideProvider>
    <App />
  </TourguideProvider>,
  document.getElementById('root')
);
```

This provides the context to the tourguide's state and functions.

---

#### 2. Basic usage of passing tooltip component and content to the tourguide

```javascript
/**
 * This should be a sibling of your app root in the DOM,
 * It will be used by the tourguide portal as a container.
 **/
const node = document.getElementById('tourguide-root');

// This gets passed to your tooltip component as a child.
const content = ['Content for first step', <AnyReactNodeForStepTwo />, 3];

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
      <div>
        <div>
          <h2 {...getAnchorElProps(1)}>Header</h2>
          <Card {...getAnchorElProps(0)}>Some random card</Card>
          <p {...getAnchorElProps(2)}>Descriptions</p>
        </div>
        <button onClick={toggle}>show</button>
        <button onClick={prev}>prev</button>
        <button onClick={next}>next</button>
      </div>
      <Tourguide tooltip={YourTooltipComponent} node={node} />
    </>
  );
}
```

- `getAnchorElProps` will map your element to a particular step for the tourguide.
- `toggle` is used to enable/disable the tourguide.
- `next` and `prev` are handlers moves your tourguide forward or backward.

#### 3. Passing different props to each tooltip component step

```javascript
const node = document.getElementById('tourguide-root');
const content = ['Content for first step', <AnyReactNodeForStepTwo />, 3];

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
      <Tourguide
        tooltip={content.map((content, index) => (
          <YourToolTip backgroundColor={index === 0 ? 'white' : 'yellow'}>
            {content}
          </YourToolTip>
        ))}
        node={node}
      />
    </>
  );
}
```

### ✨ [Examples](https://github.com/dominictwlee/react-interactive-guide/tree/master/examples)

```sh
yarn dev
```

## Install

```sh
yarn
```

## Run tests

```sh
yarn test
```

## Author

👤 **Dominic Lee**

- Website: https://github.com/dominictwlee
- Github: [@dominictwlee](https://github.com/dominictwlee)
- LinkedIn: [@https:\/\/www.linkedin.com\/in\/dominictwlee\/](https://linkedin.com/in/https://www.linkedin.com/in/dominictwlee/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/dominictwlee/react-interactive-guide/issues). You can also take a look at the [contributing guide](https://github.com/dominictwlee/react-interactive-guide/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Dominic Lee](https://github.com/dominictwlee).<br />
This project is [MIT](https://github.com/dominictwlee/react-interactive-guide/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
