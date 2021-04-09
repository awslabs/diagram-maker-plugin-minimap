import { EditorMode } from 'diagram-maker';
import { createMinimap } from '..';

describe('createMinimap', () => {
  const minimap = {
    data:{
      size:{
        height: 200,
        width: 200
      }
    }
  };
  const state = {
    edges: {},
    editor: {
      mode: EditorMode.SELECT
    },
    nodes: {},
    panels: {},
    plugins: { minimap },
    workspace:{
      canvasSize: {
        height: 1600,
        width: 3200
      },
      position: {
        x: 0,
        y: 0
      },
      scale: 1,
      viewContainerSize: {
        height: 800,
        width: 1600
      }
    }
  };
  const renderCallback = jest.fn();
  const destroyCallback = jest.fn();
  it('test createMinimap to match snapshoot', () => {
    const res = createMinimap(state, renderCallback, destroyCallback);
    expect(res).toMatchSnapshot();
  });
});
