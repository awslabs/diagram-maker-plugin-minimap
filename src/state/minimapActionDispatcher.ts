import {
  DiagramMaker,
  DiagramMakerPlugin,
  DiagramMakerWorkspace,
  Event,
  NormalizedEvent,
  Position,
  WorkspaceActions
} from 'diagram-maker';
import { DiagramMakerMinimapType, getRectOffset, getRectSize, getScale, subtract } from 'diagramMakerMinimap/service';

// TODO: avoid this global variable if possible
export let rectInitOffset = { x: 0, y: 0 };

export function getWorkspacePosition(
  rectOffset: Position,
  scale: number,
  workspaceScale: number
): Position {
  const pos = {
    x: - rectOffset.x * scale * workspaceScale,
    y: - rectOffset.y * scale * workspaceScale
  };
  return pos;
}

export function getWorkspacePositionAfterDrag(
  rectOffset: Position,
  workspace: DiagramMakerWorkspace,
  minimap: DiagramMakerPlugin
): Position {
  const scale = getScale(workspace, minimap);
  const workspaceScale = workspace.scale;
  return getWorkspacePosition(rectOffset, scale, workspaceScale);
}

export function getWorkspacePositionAfterClick(
  offset: Position,
  workspace: DiagramMakerWorkspace,
  minimap: DiagramMakerPlugin
): Position {
  const scale = getScale(workspace, minimap);
  const workspaceScale = workspace.scale;
  const rectSize = getRectSize(workspace, scale);
  const rectOffset = {
    x: offset.x - rectSize.width / 2,
    y: offset.y - rectSize.height / 2
  };
  return getWorkspacePosition(rectOffset, scale, workspaceScale);
}

export function handleMinimapEvent(event: NormalizedEvent, diagramMaker: DiagramMaker) {
  if (event.type === Event.LEFT_CLICK && event.target.type === DiagramMakerMinimapType.CANVAS) {
    const state = diagramMaker.store.getState();
    if (!state.plugins)return;

    const offset  = event.offset;
    const position = getWorkspacePositionAfterClick(offset, state.workspace, state.plugins.minimap);

    diagramMaker.api.dispatch({
      payload: { position },
      type: WorkspaceActions.WORKSPACE_DRAG
    });

  } else if (event.type === Event.DRAG_START && event.target.type === DiagramMakerMinimapType.RECTANGLE) {
    const state = diagramMaker.store.getState();
    if (!state.plugins)return;

    const scale = getScale(state.workspace, state.plugins.minimap);
    const workspace = state.workspace;
    rectInitOffset = getRectOffset(workspace, scale);

  } else if (event.type === Event.DRAG && event.target.type === DiagramMakerMinimapType.RECTANGLE) {
    const state = diagramMaker.store.getState();
    if (!state.plugins)return;

    const rectInitPos = event.dragReference || { x:0, y:0 };
    const canvasPos = subtract(rectInitPos, rectInitOffset);

    const pos = event.position;
    const offset = event.offset || { x:0, y:0 };
    const rectPos = subtract(pos, offset);

    const rectOffset = subtract(rectPos, canvasPos);
    const position = getWorkspacePositionAfterDrag(rectOffset, state.workspace, state.plugins.minimap);

    diagramMaker.api.dispatch({
      payload: { position },
      type: WorkspaceActions.WORKSPACE_DRAG
    });
  }
}
