const zeroFill = (number, width) => {
  width -= number.toString().length;
  if ( width > 0 ){
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number;
};

const hexToRgb = (hex) => {
  hex = hex.replace('#', '');
  if (hex.length !== 3 && hex.length !== 6) {
    return [255,255,255];
  }
  if (hex.length === 3) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return [r,g,b];
};

const rgbToHex = (color) => {
  color[0] = (color[0] > 255) ? 255 : (color[0] < 0) ? 0 : color[0];
  color[1] = (color[1] > 255) ? 255 : (color[1] < 0) ? 0 : color[1];
  color[2] = (color[2] > 255) ? 255 : (color[2] < 0) ? 0 : color[2];
  return zeroFill(color[0].toString(16), 2) + zeroFill(color[1].toString(16), 2) + zeroFill(color[2].toString(16), 2);
};

const generateGradient = (color1, color2) => {
  const STEPS = 5;

  const gradient = [];
  
  color1 = hexToRgb(color1);
  color2 = hexToRgb(color2);

  const rStep = (Math.max(color1[0], color2[0]) - Math.min(color1[0], color2[0])) / STEPS;
  const gStep = (Math.max(color1[1], color2[1]) - Math.min(color1[1], color2[1])) / STEPS;
  const bStep = (Math.max(color1[2], color2[2]) - Math.min(color1[2], color2[2])) / STEPS;

  gradient.push(`#${rgbToHex(color1)}`);
  
  let rVal = color1[0],
    gVal = color1[1],
    bVal = color1[2];

  for (let i = 0; i < (STEPS - 2); i++) {
    rVal = (color1[0] < color2[0]) ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
    gVal = (color1[1] < color2[1]) ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
    bVal = (color1[2] < color2[2]) ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
    gradient.push(`#${rgbToHex([rVal, gVal, bVal])}`);
  }
  
  gradient.push(`#${rgbToHex(color2)}`);
  
  return gradient;
};

const generatePallet = (gradient) => {
  const base = [
    '$gradientType($direction, $color0, $color1, $color2, $color3, $color4)',
    '$gradientType($direction, $backgr, $color0, $color1, $color2, $color3)',
    '$gradientType($direction, $backgr, $backgr, $color0, $color1, $color2)',
    '$gradientType($direction, $backgr, $backgr, $backgr, $color0, $color1)',
    '$gradientType($direction, $backgr, $backgr, $backgr, $backgr, $color0)',
  ];
  const pallet = [];
  base.forEach((item) => {
    gradient.forEach((color, i) => item = item.replace(`$color${i}`, color));
    pallet.push(item);
  });
  return pallet;
};

const speedOptions = {
  superfast: 60,
  fast: 80,
  medium: 100,
  slow: 120,
  superslow: 140,
};

const defaultOptions = {
  colorA: '#4BB543',
  colorB: '#ffffff',
  direction: 'bottom',
  directions: [],
  speed: 'medium',
  speeds: {},
  onDone: null,
};

const availableDirections = [
  'right top',
  'right',
  'right bottom',
  'bottom',
  'left bottom',
  'left',
  'left top',
  'top',
  'circle',
];
const availableDirectionsFilter = d => availableDirections.includes(d);

const getDirections = (options) => {
  if (!options.directions.length
    && typeof options.direction === 'string'
    && availableDirections.includes(options.direction)) {
    return [options.direction];
  }
  return options.directions.filter(availableDirectionsFilter);
};

const animatedHighlight = (element, params = {}) => {
  if (typeof element === 'string') {
    element = document.getElementById(element.replace(/^\#/, ''));
  }
  if (!element || !(element instanceof Element || element instanceof HTMLDocument)) {
    console.error('invalid element');
    return;
  }

  const options = {
    ...defaultOptions,
    ...params,
  };

  const ANIMATION_TIMEOUT = speedOptions[options.speed] || speedOptions[defaultOptions.speed];

  const originalBackground = window.getComputedStyle(element).backgroundImage
    || element.style.backgroundImage;
  const originalBackgroundColor = window.getComputedStyle(element).backgroundColor
    || element.style.backgroundColor;

  const pallet = generatePallet(generateGradient(options.colorA, options.colorB));

  if (!pallet || pallet.length !== 5) {
    console.error('invalid gradient');
    return;
  }

  const getAnimationTimeout = (direction) => {
    let timeout = speedOptions[defaultOptions.speed];
    if (options.speeds[direction]) {
      return speedOptions[options.speeds[direction]] || timeout;
    }
    return speedOptions[options.speed] || timeout;
  };

  const animate = (index = 0, direction) => {
    const animationTimeout = getAnimationTimeout(direction);

    if (!pallet[index] && directions.length > (directionsIndex + 1)) {
      directionsIndex += 1;
      setTimeout(() => {
        animate(0, directions[directionsIndex]);
      }, animationTimeout);
      return;
    }

    if (!pallet[index]) {
      element.style.backgroundImage = originalBackground;
      if (options.onDone && typeof options.onDone === 'function') {
        options.onDone();
      }
      return;
    }

    const isCircle = direction === 'circle';
    const gradientType = isCircle ? 'radial-gradient' : 'linear-gradient';
    const gradientDireciton = isCircle ? direction : `to ${direction}`;

    const bgImage = pallet[index]
      .replaceAll('$backgr', originalBackgroundColor)
      .replace('$direction', gradientDireciton)
      .replace('$gradientType', gradientType);

    element.style.setProperty('background-image', bgImage, 'important');

    setTimeout(() => {
      animate(index + 1, direction);
    }, animationTimeout);
  };
  
  let directionsIndex = 0;

  const directions = getDirections(options);

  if (!directions.length) {
    console.error('invalid directions');
    return;
  }

  animate(0, directions[directionsIndex]);
};

export animatedHighlight;
