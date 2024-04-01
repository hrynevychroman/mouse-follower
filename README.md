# @gwlab/mouse-follower

## Important ❗️

This is a Typescript continuation of the original [Mouse Follower](https://github.com/Cuberto/mouse-follower) library by [Cuberto](https://cuberto.com/). I just want to make it with type definitions and css `swiper` like styles with css-variables. Maybe I will add some new features in the future. If you have any ideas or suggestions, feel free to open an issue or pull request.

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

# Usage

For usage of this library, just replace all `mouse-follower` with your library name.

Pnpm is a main package manager for this project. You can install it from [pnpm.io](https://pnpm.io/)

To run dev command first install the dependencies and run `dev` command.

```bash
pnpm install
```

```bash
pnpm dev
```

# Playground

This is a playground for your library. You can test your library here. You can also use it as a demo for your library.

It uses `vite` with `typescript` under the hood, so it's fast and easy to use.

# Docs

This is a documentation for your library. You can write your documentation in `markdown` and it will be automatically generated.

It uses `vitepress` under the hood, so it's fast and easy to use.

Docs will automatically be generated and published to your github pages.

To config your github pages, go to `Settings` -> `Pages` and select `Source` to `GitHub Actions`.

# Documentation

[Link ❤️](https://romanhrynevych.github.io/mouse-follower/)

# Release to `npm`

To publish your library, you can use `pnpm publish` command.

```bash
pnpm run release
```

# Basic usage

```bash
npm i @gwlab/mouse-follower
```

```bash
pnpm i @gwlab/mouse-follower
```

```bash
yarn add @gwlab/mouse-follower
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [Greenwich Lab](https://github.com/romanhrynevych)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@gwlab/mouse-follower?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@gwlab/mouse-follower
[npm-downloads-src]: https://img.shields.io/npm/dm/@gwlab/mouse-follower?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@gwlab/mouse-follower
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@gwlab/mouse-follower?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@gwlab/mouse-follower
[license-src]: https://img.shields.io/github/license/@gwlab/mouse-follower.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/@gwlab/mouse-follower/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@gwlab/mouse-follower

# Previous README.md content

## Dependencies

GSAP v3 (https://greensock.com/gsap/)

## Quick start

Import GSAP and Mouse Follower and initialize it:

```js
import MouseFollower from '@gwlab/mouse-follower'
import gsap from 'gsap'

MouseFollower.registerGSAP(gsap)

const cursor = new MouseFollower()
```

Don't forget to import the cursor styles from `/dist/css/mouse-follower.css` into your styles:

```css
@import '@gwlab/mouse-follower/dist/css/mouse-follower.css';
```

To style the cursor, you can use the following css variables: [docs link](https://romanhrynevych.github.io/mouse-follower/css-variables)

```css
:root {
  --mf-color-base: #000;
  --mf-color-text: #fff;
  --mf-color-base-invert: #fff;

  --mf-cursor-size: 48px;
  --mf-cursor-default-scale: 0.2;

  --mf-cursor-text-size: 36px;
  --mf-cursor-text-font-size: 16px;
  --mf-cursor-text-line-height: 20px;
  --mf-cursor-text-letter-spacing: initial;

  --mf-cursor-media-size: 400px;

  --mf-cursor-pointer-scale: 0.15;

  --mf-cursor-text-scale: 1.7;
  --mf-cursor-text-scale-active: 1.6;

  --mf-cursor-icon-scale: 1.5;
  --mf-cursor-icon-active-scale: 1.4;
}
```

## Options

You can configure Mouse Follower via options:

```js
const cursor = new MouseFollower({
  container: '.mf-container',
  speed: 0.3
})
```

The following options with defaults are available:

```js
const cursor = new MouseFollower({
  el: null,
  container: document.body,
  className: 'mf-cursor',
  innerClassName: 'mf-cursor-inner',
  textClassName: 'mf-cursor-text',
  mediaClassName: 'mf-cursor-media',
  mediaBoxClassName: 'mf-cursor-media-box',
  iconSvgClassName: 'mf-svgsprite',
  iconSvgNamePrefix: '-',
  iconSvgSrc: '',
  dataAttr: 'cursor',
  hiddenState: '-hidden',
  textState: '-text',
  iconState: '-icon',
  activeState: '-active',
  mediaState: '-media',
  stateDetection: {
    '-pointer': 'a,button',
    '-hidden': 'iframe'
  },
  visible: true,
  visibleOnState: false,
  speed: 0.55,
  ease: 'expo.out',
  overwrite: true,
  skewing: 0,
  skewingText: 2,
  skewingIcon: 2,
  skewingMedia: 2,
  skewingDelta: 0.001,
  skewingDeltaMax: 0.15,
  stickDelta: 0.15,
  showTimeout: 20,
  hideOnLeave: true,
  hideTimeout: 300,
  hideMediaTimeout: 300
})
```

| Name | Type | Description |
| :--- | :---: | :--- |
| `el` | `string` &vert; `HTMLElement` | Existed cursor element. If not specified, the cursor will be created automatically. |
| `container` |  `string` &vert; `HTMLElement` | Cursor container. Body by default. |
| `className` |  `string` | Cursor root element class name. |
| `innerClassName` |  `string` | Inner element class name. |
| `textClassName` |  `string` | Text element class name. |
| `mediaClassName` |  `string` | Media element class name. |
| `mediaBoxClassName` |  `string` | Media inner element class name. |
| `iconSvgClassName` |  `string` | SVG sprite class name. |
| `iconSvgNamePrefix` |  `string` | SVG sprite class name prefix of icon. |
| `iconSvgSrc` |  `string` | SVG sprite source. If you are not using SVG sprites leave this blank. |
| `dataAttr` |  `string` &vert; `null` | Name of data attribute for changing cursor state directly in HTML markdown. Uses an event delegation. |
| `hiddenState` |  `string` | Hidden class name state. |
| `textState` |  `string` | Text class name state. |
| `iconState` |  `string` | Icon class name state. |
| `activeState` |  `string` &vert; `null` | Active (mousedown) class name state. Set `false` to disable. |
| `mediaState` |  `string` | Media (image/video) class name state. |
| `visible` | `boolean` | Is cursor visible by default. |
| `visibleOnState` | `boolean` | Automatically show/hide cursor when state added. Can be useful when implementing a hidden cursor follower. |
| `stateDetection` |  `object` &vert; `null` | Allow to set predefined states for different elements on page. Uses an event delegation. |
| `speed` |  `number` | Cursor movement speed. |
| `ease` |  `string` | Timing function of cursor movement. See [gsap easing](https://greensock.com/docs/v3/Eases). |
| `overwrite` |  `boolean` | Overwrite or remain cursor position when `mousemove` event happened. See [gsap overwrite modes](https://greensock.com/conflict/). |
| `skewing` | `number` | Default "skewing" factor. |
| `skewingText` | `number` | Skew effect factor in a text state. Set `0` to disable skew in this mode. |
| `skewingIcon` | `number` | Skew effect factor in a icon state. Set `0` to disable skew in this mode. |
| `skewingMedia` | `number` | Skew effect factor in a media (image/video) state. Set `0` to disable skew in this mode. |
| `skewingDelta` | `number` | Skew effect base delta. Set `0` to disable skew in this mode. |
| `skewingDeltaMax` | `number` | Skew effect max delta. Set `0` to disable skew in this mode. |
| `stickDelta` | `number` | Stick effect delta. |
| `showTimeout` | `number` | Delay before show. May be useful for the spawn animation to work properly. |
| `hideOnLeave` | `boolean` | Hide the cursor when mouse leave container. |
| `hideTimeout` | `number` | Hiding delay. Should be equal to the CSS hide animation time. |
| `initialPos` | `array` | Array (x, y) of initial cursor position. |

## Advanced usage

### Show or hide cursor

These basic methods allow you to show and hide the cursor:

```js
const cursor = new MouseFollower()
const el = document.querySelector('.my-element')

el.addEventListener('mouseenter', () => {
  cursor.hide()
})

el.addEventListener('mouseleave', () => {
  cursor.show()
})
```

or via data attribute:

```html
<div data-cursor="-hidden">Hover me to hide cursor!</div>
```

### Toggle cursor state

A state is essentially a class that applies to the root element of the cursor. You can change the appearance of the
cursor using CSS (see `cursor.scss`).

To set/unset state use methods:

```js
const cursor = new MouseFollower()
const el = document.querySelector('.my-element')

el.addEventListener('mouseenter', () => {
  cursor.addState('-inverse') // you can pass multiple states separated by whitespace
})

el.addEventListener('mouseleave', () => {
  cursor.removeState('-inverse')
})
```

or via data attribute:

```html
<div data-cursor="-inverse">Hover me to inverse cursor!</div>
```

### State detection

You can customize the list of states for all elements on the page:

```js
const cursor = new MouseFollower({
  stateDetection: {
    '-pointer': 'a,button',
    '-opaque': '.my-image',
    '-hidden': '.my-input'
  }
})
```

```html
<a>On this element cursor will be in pointer state</a>
<div class="my-image">On this element cursor will be in opaque state</div>
<div class="my-input">On this element cursor will be hidden</div>
```

Note: State detection feature uses an event delegation. Do not create large amount rules and complex selectors to avoid
performance problems. It is recommended to disable this in projects with a large number of nested DOM elements. This
also applies to binding via data attribute.

To fully disable event delegation:

```js
const cursor = new MouseFollower({
  stateDetection: false,
  dataAttr: false
})
```

### Text mode

To display text in the cursor use this method:

```js
const cursor = new MouseFollower()
const el = document.querySelector('.my-element')

el.addEventListener('mouseenter', () => {
  cursor.setText('Hello!')
})

el.addEventListener('mouseleave', () => {
  cursor.removeText()
})
```

or via data attribute:

```html
<div data-cursor-text="Hello!">Hover me!</div>
```

### Icon mode

If you use SVG spritesheet in your project and want to display them in the cursor, then you can use this method. In this
case, you need to specify the path to the SVG sprite in the options and set class names.

```js
const cursor = new MouseFollower({
  iconSvgSrc: '/assets/img/sprites/svgsprites.svg',
  iconSvgClassName: 'my-spritesheet',
  iconSvgNamePrefix: '-',
})
const el = document.querySelector('.my-element')

el.addEventListener('mouseenter', () => {
  cursor.setIcon('arrow-left')
})

el.addEventListener('mouseleave', () => {
  cursor.removeIcon()
})
```

or via data attribute:

```html
<div data-cursor-icon="arrow-left">Hover me!</div>
```

### Image mode

This method allows you to show any picture in the cursor:

```js
const cursor = new MouseFollower()
const el = document.querySelector('.my-element')

el.addEventListener('mouseenter', () => {
  cursor.setImg('/img/example.png')
})

el.addEventListener('mouseleave', () => {
  cursor.removeImg()
})
```

or via data attribute:

```html
<div data-cursor-img="/img/example.png">Hover me to show image!</div>
```

### Video mode

You can also play videos:

```js
const cursor = new MouseFollower()
const el = document.querySelector('.my-element')

el.addEventListener('mouseenter', () => {
  cursor.setVideo('/video/example.mp4')
})

el.addEventListener('mouseleave', () => {
  cursor.removeVideo()
})
```

or via data attribute:

```html
<div data-cursor-video="/video/example.mp4">Hover me to show movie!</div>
```

### Sticky effect

This method allows you to attach the cursor to an element with a magnet effect. This only works correctly with fixed
elements on the page.

```js
const cursor = new MouseFollower()
const box = document.querySelector('.my-fixed-box')
const el = document.querySelector('.my-fixed-element')

box.addEventListener('mouseenter', () => {
  cursor.setStick(el)
})

box.addEventListener('mouseleave', () => {
  cursor.removeStick()
})
```

or via data attribute:

```html
<div data-cursor-stick>Hover me to stick cursor!</div>
```

You can also pass element selector to data attribute:

```html
<div data-cursor-stick="#stick-me">Hover <div id="stick-me">me</div> to stick cursor!</div>
```

### Skewing effect

The skew effect is the distortion of the cursor when moving. It looks good with round cursors.

```js
const cursor = new MouseFollower()
const el = document.querySelector('.my-element')

el.addEventListener('mouseenter', () => {
  cursor.setSkewing(3)
})

el.addEventListener('mouseleave', () => {
  cursor.removeSkewing()
})
```

### Hidden cursor

In this example, the cursor is initialized hidden by default and only appears on the desired element.

```js
const cursor = new MouseFollower({
  visible: false
})
const el = document.querySelector('.my-element')

el.addEventListener('mouseenter', () => {
  cursor.show()
  cursor.setText('Surprise!')
})

el.addEventListener('mouseleave', () => {
  cursor.removeText()
  cursor.hide()
})
```

or via data attribute:

```html
<div data-cursor-show data-cursor-text="Surprise!">Hover me to show cursor!</div>
```

### Destroy cursor instance

Destroy the cursor completely and remove all event listeners.

```js
const cursor = new MouseFollower()

cursor.destroy()
```

## Events

Mouse Follower comes with a useful events you can listen. Events can be assigned in this way:

```js
const cursor = new MouseFollower()

cursor.on('show', () => {
  console.log('cursor appear')
})
```

You can also delete an event that you no longer want to listen in these ways:

```js
cursor.off('show')
cursor.off('show', myHandler)
```

| Name | Arguments | Description |
| :--- | :--- | :--- |
| `show` | `(cursor)` | Event will be fired when the show state is entered. |
| `hide` | `(cursor)` | Event will be fired when the hidden state is entered. |
| `addState` | `(cursor, state)` | Event will be fired when the state is added. |
| `removeState` | `(cursor, state)` | Event will be fired when the state is removed. |
| `render` | `(cursor)` | Event will be fired on each render tick. |
| `destroy` | `(cursor)` | Event will be fired when the instance is destroyed. |

## Examples of use

- [Cuberto](https://cuberto.com/): Leading digital agency.
- [Potion](https://www.sendpotion.com/): Video email for top sales professionals.
- [Wickret](https://wickret.cuberto.com/): 100% digital bank designed for you.
- [Papumba](https://www.papumba.com/): Educational platform for kids.
- [Safe Security](https://www.safe.security/): Cyber Risk Quantification For Enterprises.

## License

[The MIT License (MIT)](LICENSE)
