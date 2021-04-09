import {
  DestroyCallback,
  DiagramMakerData,
  DiagramMakerNode,
  DiagramMakerNodes,
  DiagramMakerWorkspace,
  Size
} from 'diagram-maker';
import MiniNode from 'diagramMakerMinimap/component/mininode/MiniNode';
import {
  DiagramMakerMinimapType,
  getRectOffset,
  getRectSize,
  getScale,
  RenderCallback
} from 'diagramMakerMinimap/service';
import * as React from 'react';
import './Minimap.scss';

export interface MinimapProps<NodeType, EdgeType> {
  state: DiagramMakerData<NodeType, EdgeType>;
  renderMiniNode: RenderCallback<NodeType>;
  destroyCallback: DestroyCallback;
}

export default class Minimap<NodeType, EdgeType> extends React.Component< MinimapProps<NodeType, EdgeType>> {
  public render(): JSX.Element | undefined {
    const plugins = this.props.state.plugins;
    if (!plugins) return;

    const minimap = plugins.minimap;
    const workspace = this.props.state.workspace;
    const nodes = this.props.state.nodes;

    const scale = getScale(workspace, minimap);
    const containerSize = minimap.data.size;
    const canvasSize = this.getCanvasSize(workspace, containerSize, scale);
    const emptyTop = (containerSize.height - canvasSize.height) / 2;
    const emptyLeft = (containerSize.width - canvasSize.width) / 2;

    const rectOffset = getRectOffset(workspace, scale);
    const rectSize = getRectSize(workspace, scale);
    const rectTransform = `translate3d(${rectOffset.x + emptyLeft}px, ${rectOffset.y + emptyTop}px, 0)`;

    const renderedMinimapNodes = this.renderMinimapNodes(nodes, scale);

    return(
      <div
        className="dm-minimap-container"
        style={{ width: containerSize.width, height: containerSize.height }}
      >
        <div
          data-event-target={true}
          data-draggable={true}
          data-type={DiagramMakerMinimapType.RECTANGLE}
          style={{ transform: rectTransform, width: rectSize.width, height: rectSize.height }}
          className="dm-minimap-rectangle"
        />
        <div
          data-event-target={true}
          data-type={DiagramMakerMinimapType.CANVAS}
          className="dm-minimap-canvas"
          style={{ width: canvasSize.width, height: canvasSize.height, top: emptyTop, left: emptyLeft }}
        >
          {renderedMinimapNodes}
        </div>
      </div>
    );
  }

  private getCanvasSize(workspace: DiagramMakerWorkspace, containerSize: Size, scale: number): Size {
    const { height: workspaceHeight, width: workspaceWidth } = workspace.canvasSize;
    const { height: containerHeight, width: containerWidth } = containerSize;

    const workspaceRatio = workspaceWidth / workspaceHeight;
    const containerRatio = containerWidth / containerHeight;

    let canvasWidth = containerWidth;
    let canvasHeight = containerHeight;

    if (workspaceRatio > containerRatio) {
      // Short and fat, fill empty space at the top and bottom
      canvasHeight = workspaceHeight / scale;
    } else {
      // Tall and thin, fill empty space at the left and right
      canvasWidth = workspaceWidth / scale;
    }

    const canvasSize = {
      height: canvasHeight,
      width: canvasWidth
    };
    return canvasSize;
  }

  private getMinimapNode(node: DiagramMakerNode<NodeType>, scale: number): DiagramMakerNode<NodeType> {
    const { diagramMakerData: orignalDiagramMakerData, id } = node;
    const { x, y } = orignalDiagramMakerData.position;
    const { width, height } = orignalDiagramMakerData.size;
    const miniNodePos = {
      x: x / scale,
      y: y / scale
    };
    const miniNodeSize = {
      height: height / scale,
      width: width / scale
    };
    const miniNodeData = {
      position: miniNodePos,
      size: miniNodeSize
    };
    const diagramMakerData = miniNodeData;
    const miniNode = {
      diagramMakerData,
      id
    };
    return miniNode;
  }

  private renderMinimapNodes(nodes: DiagramMakerNodes<NodeType>, scale: number) {
    const renderCallback = this.props.renderMiniNode;
    const destroyCallback = this.props.destroyCallback;

    const nodeKeys = Object.keys(nodes);
    return nodeKeys.map((nodeKey: string) => {
      const miniNode = this.getMinimapNode(nodes[nodeKey], scale);
      return (
        <MiniNode
          key={`miniNode_${nodes[nodeKey].id}`}
          renderCallback={renderCallback.bind(null, nodes[nodeKey])}
          destroyCallback={destroyCallback}
          diagramMakerNode={miniNode}
        />
      );
    });
  }
}
