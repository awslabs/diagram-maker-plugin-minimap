import { DiagramMakerPlugin, DiagramMakerWorkspace, Position, Size } from 'diagram-maker';

export function subtract(a: Position, b: Position): Position {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function getScale(workspace: DiagramMakerWorkspace, minimap: DiagramMakerPlugin): number {
  const { height: workspaceHeight, width: workspaceWidth } = workspace.canvasSize;
  const workspaceRatio = workspaceWidth / workspaceHeight;

  const containerSize = minimap.data.size;
  const { height: containerHeight, width: containerWidth } = containerSize;
  const containerRatio = containerWidth / containerHeight;

  let scale;

  if (workspaceRatio > containerRatio) {
        // Short and fat, fill empty space at the top and bottom
    scale = workspaceWidth / containerWidth;
  } else {
        // Tall and thin, fill empty space at the left and right
    scale = workspaceHeight / containerHeight;
  }
  return scale;
}

export function getRectOffset(workspace: DiagramMakerWorkspace, scale: number): Position {
  const workspacePosition = workspace.position;
  const workspaceScale = workspace.scale;
  const rectPosition = {
    x: - workspacePosition.x / (scale * workspaceScale),
    y: - workspacePosition.y / (scale * workspaceScale)
  };
  return rectPosition;
}

export function getRectSize(workspace: DiagramMakerWorkspace, scale: number): Size {
  const workspaceScale = workspace.scale;
  const viewContainerSize = workspace.viewContainerSize;
  const { width: viewWidth, height: viewHeight } = viewContainerSize;

  const rectSize = {
    height: viewHeight / (scale * workspaceScale) - 2,
    width: viewWidth  / (scale * workspaceScale) - 2  // border takes 2px
  };
  return rectSize;
}
