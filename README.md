# animated-highlight.js
Simple JS package to highlight DOM elements with some animation

## Instalation

#### Browser

[Download File](https://raw.githubusercontent.com/arthursb2016/animated-highlight.js/main/src/index.js)

```
<script src="animated-highlight.js" type="module"></script>
```

#### NPM

```
npm i animated-highlight
```

#### YARN

```
yarn add animated-highlight
```
## How to use

```
import { animatedHighlight } from 'animated-highlight';

const elem = document.getElementById('container');
const options = { speed: 'fast' };

animatedHighlight(elem, options);

// or just

animatedHighlight('container'); // with default options
```

## Options

| Name  | Type | Description | Default Value |
| ------------- |:-------------:|:-------------:|:-------------:|
| colorA      | string  | main color to generate the gradient | #4BB543 |
| colorB      | string  | secondary color to generate the gradient | #ffffff |
| direction      | string  | animation direction (see options below) | bottom |
| directions     | array  | directions sequence (overrides direction) | [] |
| speed     | string  | animation speed (see options below) | medium |
| speeds     | object  | specific speed for a given direction | {} |
| onDone     | function  | callback function after animation is done | null |


#### Available directions

* right top
* right
* right bottom
* bottom
* left bottom
* left
* left top
* top
* circle

#### Available speeds

* superfast
* fast
* medium
* slow
* superslow

## Examples

#### Directions sequence

```
const options = {
  directions: ['right top', 'circle'],
};

animatedHighlight('elementId', options);
```

![first example](/examples/1.gif "first example")

#### Custom colors

```
const options = {
  directions: [
    'right top',
    'left top',
    'circle',
  ],
  colorA: 'rgb(51, 102, 204)',
  colorB: 'rgb(174, 194, 234)',
};

animatedHighlight('elementId', options);
```

![second example](/examples/2.gif "second example")

#### Specific speed for each direction

```
const options = {
  directions: [
    'top',
    'bottom',
  ],
  colorA: '#b300b3',
  colorB: '#ff80ff',
  speeds: {
    'top': 'slow',
    'bottom': 'superfast',
  },
};

animatedHighlight('elementId', options);
```

![third example](/examples/3.gif "third example")
