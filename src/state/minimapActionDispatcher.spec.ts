import { DiagramMakerPlugin, EditorMode, Event, WorkspaceActions } from 'diagram-maker';
import { DiagramMakerMinimapType } from 'diagramMakerMinimap/service';
import {
  getWorkspacePositionAfterClick,
  getWorkspacePositionAfterDrag,
  rectInitOffset
} from './minimapActionDispatcher';

import { handleMinimapEvent } from '..';

describe('minimapActionDispatcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const minimap: DiagramMakerPlugin = {
    data:{
      size:{
        height: 200,
        width: 200
      }
    }
  };

  const workspace = {
    canvasSize: {
      height: 1600,
      width: 3200
    },
    position: {
      x: -100,
      y: -100
    },
    scale: 1,
    viewContainerSize: {
      height: 800,
      width: 1600
    }
  };
  const edges = {};
  const nodes = {};
  const editor = { mode: EditorMode.SELECT };
  const panels = {};
  const plugins = { minimap };

  const diagramMakerObj1: any = {
    api:{
      dispatch:  jest.fn()
    },
    store: {
      getState: () => ({ edges, editor, nodes, panels, plugins, workspace })
    }
  };

  const diagramMakerObj2: any = {
    api:{
      dispatch:  jest.fn()
    },
    store: {
      getState: () => ({ edges, editor, nodes, panels, workspace })
    }
  };

  const type = Event.LEFT_CLICK;
  const target = document.createElement('div');
  const event: any = { target, type };

  const clickEvent = {
    button: 1,
    offset: { x: 0, y: 0 },
    originalEvent: event,
    position:{ x: 10, y:10 },
    target: {
      originalTarget: document.createElement('div'),
      type: DiagramMakerMinimapType.CANVAS
    },
    type: Event.LEFT_CLICK
  };

  const dragEvent1 = {
    dragReference: { x: 10, y: 10 },
    offset: { x: 10, y: 10 },
    position: { x: 10, y: 10 },
    target: {
      originalTarget: document.createElement('div'),
      type: DiagramMakerMinimapType.RECTANGLE
    },
    type: Event.DRAG
  };

  const dragEvent2 = {
    position: { x: 10, y: 10 },
    target: {
      originalTarget: document.createElement('div'),
      type: DiagramMakerMinimapType.RECTANGLE
    },
    type: Event.DRAG
  };

  const dragStartEvent = {
    dragReference: { x: 10, y: 10 },
    offset: { x: 10, y: 10 },
    position: { x: 10, y: 10 },
    target: {
      originalTarget: document.createElement('div'),
      type: DiagramMakerMinimapType.RECTANGLE
    },
    type: Event.DRAG_START
  };

  describe('getWorkspacePositionAfterDrag', () => {
    it('get workspace position after drag', () => {
      const state = diagramMakerObj1.store.getState();
      if (!state.plugins)return;
      const rectPosition = { x: 10, y: 10 };
      expect(getWorkspacePositionAfterDrag(
        rectPosition,
        state.workspace,
        state.plugins.minimap
      )).toEqual({ x: -160, y: -160 });
    });
  });

  describe('getWorkspacePositionAfterClick', () => {
    it('get workspace position after click', () => {
      const state = diagramMakerObj1.store.getState();
      const offset = { x: 10, y: 10 };
      if (!state.plugins)return;
      expect(getWorkspacePositionAfterClick(offset, state.workspace, state.plugins.minimap)).toEqual({ x:624 , y:224 });
    });
  });

  describe('handleMinimapEvent', () => {
    it('handle minimap click event', () => {
      handleMinimapEvent(clickEvent, diagramMakerObj1);
      expect(diagramMakerObj1.api.dispatch).toHaveBeenCalledTimes(1);
      expect(diagramMakerObj1.api.dispatch).toHaveBeenCalledWith({
        payload: {
          position: { x: 784, y: 384 }
        },
        type: WorkspaceActions.WORKSPACE_DRAG
      });
    });

    it('handle minimap click event if plugins not existed', () => {
      handleMinimapEvent(clickEvent, diagramMakerObj2);
      expect(diagramMakerObj2.api.dispatch).toHaveBeenCalledTimes(0);
    });

    it('handle minimap drag start event if plugins do not exist', () => {
      handleMinimapEvent(dragStartEvent, diagramMakerObj2);
      expect(rectInitOffset).toEqual({ x: 0, y: 0 });
    });

    it('handle minimap drag start event', () => {
      handleMinimapEvent(dragStartEvent, diagramMakerObj1);
      expect(rectInitOffset).toEqual({ x: 6.25, y: 6.25 });
    });

    it('handle minimap drag event', () => {
      handleMinimapEvent(dragEvent1, diagramMakerObj1);
      expect(diagramMakerObj1.api.dispatch).toHaveBeenCalledTimes(1);
      expect(diagramMakerObj1.api.dispatch).toHaveBeenCalledWith({
        payload:{
          position: { x: 60, y: 60 }
        },
        type: WorkspaceActions.WORKSPACE_DRAG
      });
    });

    it('handle minimap drag event if plugins do not existed', () => {
      handleMinimapEvent(dragEvent1, diagramMakerObj2);
      expect(diagramMakerObj2.api.dispatch).toHaveBeenCalledTimes(0);
    });

    it('handle minimap drag event if drag reference do not existed', () => {
      handleMinimapEvent(dragEvent2, diagramMakerObj1);
      expect(diagramMakerObj1.api.dispatch).toHaveBeenCalledTimes(1);
      expect(diagramMakerObj1.api.dispatch).toHaveBeenCalledWith({
        payload: {
          position: { x: -260, y: -260 }
        },
        type: WorkspaceActions.WORKSPACE_DRAG
      });
    });
  });
});
