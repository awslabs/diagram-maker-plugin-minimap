import { renderDiagramMaker } from './render';
const windowAsAny = window as any;

function addResizeHandler() {
  window.addEventListener('resize', () => {
    document.body.style.height = `${window.innerHeight}px`;
    windowAsAny.diagramMaker.updateContainer();
  });
}

renderDiagramMaker();

addResizeHandler();

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./render', () => {
    windowAsAny.diagramMaker.destroy();
    renderDiagramMaker();
  });
}
