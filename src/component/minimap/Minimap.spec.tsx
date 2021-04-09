import { EditorMode } from 'diagram-maker';
import Minimap from 'diagramMakerMinimap/component/minimap/Minimap';
import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import './Node.scss';

describe('Minimap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const nodes = {
    node1: {
      diagramMakerData: {
        position: { x: 200, y: 150 },
        size: { width: 100, height: 50 }
      },
      id: 'node1'
    },
    node2: {
      diagramMakerData: {
        position: { x: 400, y: 300 },
        size: { width: 100, height: 50 }
      },
      id: 'node2'
    }
  };
  const minimap = {
    data:{
      size:{
        height: 200,
        width: 200
      }
    }
  };
  const plugins = { minimap };
  const edges = {};
  const panels = {};
  const editor = { mode: EditorMode.SELECT };
  const renderMininode = jest.fn();
  const destroyCallback = jest.fn();

  it('test Minimap when workspace short and wide', () => {
    const workspace = {
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
    };
    const state = { edges, editor, nodes, panels, plugins, workspace };

    const renderer  = ShallowRenderer.createRenderer();
    renderer.render(
      <Minimap
        state={state}
        renderMiniNode={renderMininode}
        destroyCallback={destroyCallback}
      />
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('test Minimap when workspace tall and thin', () => {
    const workspace = {
      canvasSize: {
        height: 3200,
        width: 1600
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
    };
    const state = { edges, editor, nodes, panels, plugins, workspace };

    const renderer  = ShallowRenderer.createRenderer();
    renderer.render(
      <Minimap
        state={state}
        renderMiniNode={renderMininode}
        destroyCallback={destroyCallback}
      />
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('test Minimap when plugins do not exist', () => {
    const workspace = {
      canvasSize: {
        height: 3200,
        width: 1600
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
    };
    const state = { edges, editor, nodes, panels, workspace };

    const renderer  = ShallowRenderer.createRenderer();
    renderer.render(
      <Minimap
        state={state}
        renderMiniNode={renderMininode}
        destroyCallback={destroyCallback}
      />
    );
    const result = renderer.getRenderOutput();
    expect(result).toEqual(undefined);
  });
});
