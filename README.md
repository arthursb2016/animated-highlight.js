# animated-highlight.js
Simple JS package to highlight DOM elements with some animation

## Instalation

#### Browser

[Download File](https://raw.githubusercontent.com/arthursb2016/animated-highlight.js/main/src/index.js)

```
<script src="animated-highlight.js"></script>
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
| directions     | array  | sequence directions (overrides direction) | [] |
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

...to be continued