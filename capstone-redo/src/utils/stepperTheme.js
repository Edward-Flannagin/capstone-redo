// utils/stepperTheme.js
// src/utils/stepperTheme.js
function parseRGB(cssColor) {
  if (!cssColor) return null;

  // rgba() / rgb()
  let m = cssColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];

  // hex #rrggbb
  m = cssColor.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (m) return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];

  return null;
}

function srgbToLinear(v) {
  v = v / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]) {
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function findEffectiveBackground(el) {
  let node = el;
  while (node && node !== document.documentElement) {
    const bg = getComputedStyle(node).backgroundColor;
    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') return bg;
    node = node.parentElement;
  }
  return getComputedStyle(document.body).backgroundColor;
}

/**
 * applyStepperTheme(stepperEl, options)
 * - stepperEl: wrapper element that contains .progress-stepper (or the .progress-stepper itself)
 * - options.threshold: luminance threshold (default 0.5)
 * - options.colors: optional override object:
 *     { dark: { fill, track, label }, light: { fill, track, label } }
 */
export function applyStepperTheme(stepperEl, options = {}) {
  if (!stepperEl) return;
  const { threshold = 0.5, colors = {} } = options;

  // find the actual .progress-stepper node inside wrapper (or use the element itself)
  const stepperNode = stepperEl.classList.contains('progress-stepper')
    ? stepperEl
    : stepperEl.querySelector('.progress-stepper') || stepperEl;

  const bg = findEffectiveBackground(stepperNode);
  const rgb = parseRGB(bg);

  // default color sets (fallbacks)
  const darkColors = {
    fill: '#F4CE14',
    track: '#3d4a42',
    label: '#edefee',
    ...(colors.dark || {}),
  };
  const lightColors = {
    fill: '#495e57',
    track: '#edefee',
    label: '#495e57',
    ...(colors.light || {}),
  };

  if (!rgb) {
    // fallback to light palette
    stepperNode.style.setProperty('--progress-line-fill', lightColors.fill);
    stepperNode.style.setProperty('--progress-line-track', lightColors.track);
    stepperNode.style.setProperty('--progress-label-color', lightColors.label);
    return;
  }

  const lum = relativeLuminance(rgb);
  if (lum < threshold) {
    // dark background -> use light fill, darker track
    stepperNode.style.setProperty('--progress-line-fill', darkColors.fill);
    stepperNode.style.setProperty('--progress-line-track', darkColors.track);
    stepperNode.style.setProperty('--progress-label-color', darkColors.label);
  } else {
    // light background -> use darker fill, light track
    stepperNode.style.setProperty('--progress-line-fill', lightColors.fill);
    stepperNode.style.setProperty('--progress-line-track', lightColors.track);
    stepperNode.style.setProperty('--progress-label-color', lightColors.label);
  }
}