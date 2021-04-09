import { DestroyCallback, DiagramMakerData } from 'diagram-maker';
import { RenderCallback } from 'diagramMakerMinimap/service';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Minimap from './minimap/Minimap';

export function createMinimap<NodeType, EdgeType>(
  state: DiagramMakerData<NodeType, EdgeType>,
  renderMiniNode: RenderCallback<NodeType>,
  destroyCallback: DestroyCallback
) {
  const reactRoot = document.createElement('div');
  ReactDOM.render(
    <Minimap
      state={state}
      renderMiniNode={renderMiniNode}
      destroyCallback={destroyCallback}
    />,
    reactRoot);
  return reactRoot;
}
