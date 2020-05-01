## [2.2.3](https://github.com/dominictwlee/react-interactive-guide/compare/v2.2.2...v2.2.3) (2020-05-01)


### Bug Fixes

* hide Control and Overlay when tourguide is not showing ([6bbf1e7](https://github.com/dominictwlee/react-interactive-guide/commit/6bbf1e7003362faa023209d07a7e355c338885a8))

## [2.2.2](https://github.com/dominictwlee/react-interactive-guide/compare/v2.2.1...v2.2.2) (2020-04-30)


### Bug Fixes

* handle offset if custom dimen height is smaller than base ([5083d3f](https://github.com/dominictwlee/react-interactive-guide/commit/5083d3fc31a5c899054096148563d43ffcf3355d))

## [2.2.1](https://github.com/dominictwlee/react-interactive-guide/compare/v2.2.0...v2.2.1) (2020-04-30)


### Bug Fixes

* reverse offsetY ([e90e9f9](https://github.com/dominictwlee/react-interactive-guide/commit/e90e9f92378d838bf94354cbc7984d98fef10168))

# [2.2.0](https://github.com/dominictwlee/react-interactive-guide/compare/v2.1.0...v2.2.0) (2020-04-30)


### Features

* export tourguide style props ([4bc054f](https://github.com/dominictwlee/react-interactive-guide/commit/4bc054fb8765421a0b7011aafcd6c50a3cf957d4))

# [2.1.0](https://github.com/dominictwlee/react-interactive-guide/compare/v2.0.2...v2.1.0) (2020-04-30)


### Features

* add global width height style overrides ([7951848](https://github.com/dominictwlee/react-interactive-guide/commit/7951848bbf046234a7386118fe67891d87023424))
* add offset positioning options for spotlight ([2aaf57f](https://github.com/dominictwlee/react-interactive-guide/commit/2aaf57f48ebcde4602732a3594a68453c5706259))
* add width, height and spring style config for spotlight ([8db2b37](https://github.com/dominictwlee/react-interactive-guide/commit/8db2b37c8f8252ad9c7e08b4a091323773df0411))
* type def for style config ([d9d6ae0](https://github.com/dominictwlee/react-interactive-guide/commit/d9d6ae004d1f40371c9a3d3934cbc21321274c73))

## [2.0.2](https://github.com/dominictwlee/react-interactive-guide/compare/v2.0.1...v2.0.2) (2020-04-27)


### Bug Fixes

* position fixed for overlay ([0eff594](https://github.com/dominictwlee/react-interactive-guide/commit/0eff5948682143c6c828e4aa81a899af80e7b920))

## [2.0.1](https://github.com/dominictwlee/react-interactive-guide/compare/v2.0.0...v2.0.1) (2020-04-26)


### Bug Fixes

* move react-is and styled-components to peer dependencies ([6607023](https://github.com/dominictwlee/react-interactive-guide/commit/6607023a5eca50f98362cbdc35c5929eab3cd2b6))

# [2.0.0](https://github.com/dominictwlee/react-interactive-guide/compare/v1.5.0...v2.0.0) (2020-04-26)


### Bug Fixes

* set spotlight visibility to hidden if not focused and not active ([ac1c098](https://github.com/dominictwlee/react-interactive-guide/commit/ac1c0982e37ce5a925abb71126ee1bce7107b6c7))
* set visibility to hidden if tooltip is not active ([ddeda72](https://github.com/dominictwlee/react-interactive-guide/commit/ddeda72bc4d3eafbec4ea1593e95c8f3e60cc92c))


### Features

* mix blend mode spotlight layer ([82546fa](https://github.com/dominictwlee/react-interactive-guide/commit/82546fa0ed02af09d408d33586a7cf083aa4fb8a))


### BREAKING CHANGES

* Overlay goes on top of other elements and blocks user from interacting with underlying elements when guide is on. Spotlight can now be shaped like any other div.

# [1.5.0](https://github.com/dominictwlee/react-interactive-guide/compare/v1.4.0...v1.5.0) (2020-04-23)


### Features

* throttle keydown handler ([ef891f1](https://github.com/dominictwlee/react-interactive-guide/commit/ef891f1e99d54c45d459a2dc12d85ba47b9615e4))

# [1.4.0](https://github.com/dominictwlee/react-interactive-guide/compare/v1.3.5...v1.4.0) (2020-04-22)


### Features

* add ability to close and nav tourguide with keyboard ([c9c53c6](https://github.com/dominictwlee/react-interactive-guide/commit/c9c53c6241fad4694bff1e20f2cef25c911d07f5))

## [1.3.5](https://github.com/dominictwlee/react-interactive-guide/compare/v1.3.4...v1.3.5) (2020-04-21)


### Bug Fixes

* use useEffect for non-blocking behavior ([aa4203b](https://github.com/dominictwlee/react-interactive-guide/commit/aa4203b2eb3cbe27872d73895ab8cad847fb97e6))

## [1.3.4](https://github.com/dominictwlee/react-interactive-guide/compare/v1.3.3...v1.3.4) (2020-04-21)


### Bug Fixes

* mask position offset ([47598a7](https://github.com/dominictwlee/react-interactive-guide/commit/47598a7875c8ee0a0330c8de2f5ca712ba1d0032))

## [1.3.3](https://github.com/dominictwlee/react-interactive-guide/compare/v1.3.2...v1.3.3) (2020-04-21)


### Bug Fixes

* shadow inset padding ([947481a](https://github.com/dominictwlee/react-interactive-guide/commit/947481a3a8c8b532205a83cc0f5d210020ecb375))

## [1.3.2](https://github.com/dominictwlee/react-interactive-guide/compare/v1.3.1...v1.3.2) (2020-04-21)


### Bug Fixes

* zindex overlapping between Tourguide children ([596eb54](https://github.com/dominictwlee/react-interactive-guide/commit/596eb5419e0ccb48363fc860d0f20b43eb8a6005))

## [1.3.1](https://github.com/dominictwlee/react-interactive-guide/compare/v1.3.0...v1.3.1) (2020-04-20)


### Bug Fixes

* remove useEffect reset ([3d4f3fd](https://github.com/dominictwlee/react-interactive-guide/commit/3d4f3fd518a7cfcc4973e66298aa43e14befc457))

# [1.3.0](https://github.com/dominictwlee/react-interactive-guide/compare/v1.2.1...v1.3.0) (2020-04-20)


### Features

* export tour guide types ([3def3fe](https://github.com/dominictwlee/react-interactive-guide/commit/3def3fefc1b1f01f092000190d3e55f5c0187113))

## [1.2.1](https://github.com/dominictwlee/react-interactive-guide/compare/v1.2.0...v1.2.1) (2020-04-19)


### Code Refactoring

* narrow type anchor el ([951938b](https://github.com/dominictwlee/react-interactive-guide/commit/951938bd687915a6c50dc1853134f101ca3211af))


# [1.2.0](https://github.com/dominictwlee/react-interactive-guide/compare/v1.1.1...v1.2.0) (2020-04-18)


### Features

* add precondition to starting tourguide ([13457fc](https://github.com/dominictwlee/react-interactive-guide/commit/13457fc2afafb003f5079aa615147193fa12f7f3))
