export function updateUIPosition(id: string) {
  const ui = document.getElementById(id);
  if (!ui || !window.visualViewport) return;

  const vv = window.visualViewport;

  // IMPORTANT: use offsetWidth/offsetHeight instead of getBoundingClientRect()
  const uiWidth = ui.offsetWidth;
  const uiHeight = ui.offsetHeight;

  const x = vv.offsetLeft + vv.width - uiWidth;
  const y = vv.offsetTop + vv.height - uiHeight;

  ui.style.position = 'absolute';
  ui.style.left = `${x}px`;
  ui.style.top = `${y}px`;
  ui.style.transform = `scale(${vv.scale})`;
  ui.style.transformOrigin = 'bottom right';
}