import {
  getMinimapCanvas,
  getMinimapContainer,
  getMinimapRectangle,
  getMiniNodes,
  getWorkspace
} from '../common/getters';
import { convertTranslate2dToMatrix } from '../common/utils';

describe('DiagramMakerMinimap', () => {
  beforeEach(() => {
    cy.visit('/WideMinimap.html');
  });
  const minimapPanelPos = { x: 20, y: 0 };
  const workspaceSize = {
    height: 1600,
    width: 3200
  };
  const workspaceScale = 1;
  const viewport = { height: 900, width: 1200 };
  const minimapPadding = 20;
  const dragElementHeight = 20;
  const borderWidth = 1;
  const minimapContainerSize = {
    height: 200,
    width: 200
  };

  const minimapContainerPos = {
    x: minimapPanelPos.x + minimapPadding,
    y: minimapPanelPos.y + minimapPadding + dragElementHeight
  };

  const scale = workspaceSize.width / minimapContainerSize.width;
  const minimapHeight = workspaceSize.height / scale;
  const emptyTop = (minimapContainerSize.height - minimapHeight) / 2;

  const minimapPos = {
    x: minimapContainerPos.x,
    y: minimapContainerPos.y + emptyTop
  };

  describe('minimap rendering', () => {
    it('renders minimap canvas', () => {
      const canvas = getMinimapCanvas();
      canvas.should('have.length', 1);
      canvas.should('have.class', 'dm-minimap-canvas');
    });
    it('renders minimap rectangle', () => {
      const rectangle = getMinimapRectangle();
      rectangle.should('have.length', 1);
      rectangle.should('have.class', 'dm-minimap-rectangle');
    });
    it('renders minimap container', () => {
      const container = getMinimapContainer();
      container.should('have.length', 1);
      container.should('have.class', 'dm-minimap-container');
      container.should('have.css', 'height', '200px');
      container.should('have.css', 'width', '200px');
    });
  });

  describe('drag minimap rectangle', () => {
    it('move rectangle and workspace when drag rectangle', () => {
      const dragDistance = { x: 20, y: 20 };

      const dragEndPos = {
        pageX: minimapPos.x + dragDistance.x,
        pageY: minimapPos.y + dragDistance.y
      };

      const workspacePos = {
        x: - dragDistance.x * scale * workspaceScale,
        y: - (dragDistance.y - borderWidth) * scale * workspaceScale
      };

      getMinimapRectangle().trigger('mousedown', 'topLeft', { button: 0, which: 1, force: true });
      getMinimapRectangle().trigger('mousemove', { button: 0, ...dragEndPos, force: true });
      getMinimapRectangle().trigger('mouseup', { button: 0, force: true });
      const expectedRectTransform = convertTranslate2dToMatrix(dragDistance.x, emptyTop + dragDistance.y - borderWidth);
      getMinimapRectangle().should('have.css', 'transform').and('eq', expectedRectTransform);
      const expectedWsTransform = convertTranslate2dToMatrix(workspacePos.x, workspacePos.y);
      getWorkspace().should('have.css', 'transform').and('eq', expectedWsTransform);
    });
  });

  describe('click minimap canvas', () => {
    it('move rectangle and workspace when click on minimap canvas', () => {
      const rectSize = {
        height: viewport.height / scale,
        width: viewport.width / scale
      };

      const clickPos = {
        x: minimapContainerSize.width / 2,
        y: minimapContainerSize.height / 2
      };

      const rectOffset = {
        x: clickPos.x - rectSize.width / 2 + borderWidth,
        y: clickPos.y - emptyTop - rectSize.height / 2 + borderWidth
      };

      const workspacePos = {
        x: - rectOffset.x * scale * workspaceScale,
        y: - rectOffset.y * scale * workspaceScale
      };

      getMinimapCanvas().trigger('mousedown', 'center', { button: 0, force: true });
      getMinimapCanvas().trigger('mouseup', { button: 0, force: true });
      const expectedRectTransform = convertTranslate2dToMatrix(rectOffset.x, rectOffset.y + emptyTop);
      getMinimapRectangle().should('have.css', 'transform').and('eq', expectedRectTransform);
      const expectedWsTransform = convertTranslate2dToMatrix(workspacePos.x, workspacePos.y);
      getWorkspace().should('have.css', 'transform').and('eq', expectedWsTransform);
    });
  });

  describe('test minimap nodes', () => {
    it('minimap nodes number should be the same as workspace nodes number', () => {
      getMiniNodes().should('have.length', 2);
    });
  });
});
