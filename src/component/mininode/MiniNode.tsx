import { DestroyCallback, DiagramMakerNode } from 'diagram-maker';
import { default as ComposeView } from 'diagramMakerMinimap/component/common/ComposeView';
import { BoundRenderCallback } from 'diagramMakerMinimap/service';
import * as React from 'react';
import './MiniNode.scss';

export interface MiniNodeProps<NodeType> {
  renderCallback: BoundRenderCallback;
  destroyCallback: DestroyCallback;
  diagramMakerNode: DiagramMakerNode<NodeType>;
}

export default class MiniNode<NodeType> extends React.PureComponent<MiniNodeProps<NodeType>, {}> {
  public render(): JSX.Element {
    const { diagramMakerData } = this.props.diagramMakerNode;
    const { x, y } = diagramMakerData.position;
    const { width, height } = diagramMakerData.size;
    const transform = `translate3d(${x}px, ${y}px, 0)`;
    const { renderCallback, destroyCallback } = this.props;

    return (
      <div
        className="dm-mini-node"
        style={{ width, height, transform }}
      >
        <ComposeView
          renderCallback={renderCallback}
          destroyCallback={destroyCallback}
        />
      </div>
    );
  }
}
