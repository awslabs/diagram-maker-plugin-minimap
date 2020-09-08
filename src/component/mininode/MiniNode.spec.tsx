import MiniNode from 'diagramMakerMinimap/component/mininode/MiniNode';
import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import './MiniNode.scss';

const destroyCallback = jest.fn();
const renderCallback = jest.fn();
const nodes = {
  diagramMakerData: {
    position: {
      x: 400,
      y: 600
    },
    size: {
      height: 300,
      width: 200
    }
  },
  id: 'myNode'
};
describe('MiniNode', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('test MiniNode', () => {
    const renderer  = ShallowRenderer.createRenderer();

    renderer.render(
      <MiniNode
        diagramMakerNode={nodes}
        renderCallback={renderCallback}
        destroyCallback={destroyCallback}
      />
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
