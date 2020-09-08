import {
  ConnectorPlacement,
  ContextMenuRenderCallbacks,
  DiagramMaker,
  DiagramMakerData,
  DiagramMakerNode,
  DiagramMakerPotentialNode,
  VisibleConnectorTypes
} from 'diagram-maker';
import 'diagram-maker/dist/diagramMaker.css';
import { Action, Dispatch } from 'redux';

import '../scss/CircularNode.scss';
import '../scss/Logger.scss';
import '../scss/MinimapNode.scss';
import '../scss/RectangularNode.scss';
import { graph } from './data';

import {
  addDevTools, createCircularNode, createEdgeContextMenu,
  createLibraryPanel, createMinimapPanel, createNodeContextMenu,
  createNodeWithDropdown, createNodeWithInput, createPanelContextMenu,
  createPotentialNode, createRectangularNode,
  createWorkspaceContextMenu, updateActionInLogger
} from '../utils';

import { handleMinimapEvent } from 'diagramMakerMinimap/state';

const windowAsAny = window as any;

export function renderDiagramMaker() {
  windowAsAny.diagramMaker = new DiagramMaker(
    'diagramMakerContainer', {
      options: {
        connectorPlacement: ConnectorPlacement.LEFT_RIGHT
      },
      renderCallbacks: {
        destroy: () => undefined,
        node: (node: DiagramMakerNode<{}>, container: HTMLElement) => {
          if (node.typeId === 'testId-centered') {
            return createCircularNode(node, container);
          }
          if (node.typeId === 'testId-input') {
            return createNodeWithInput(node, container);
          }
          if (node.typeId === 'testId-dropdown') {
            return createNodeWithDropdown(node, container);
          }
          return createRectangularNode(node, container);
        },
        potentialNode: (node: DiagramMakerPotentialNode, container: HTMLElement) =>
          createPotentialNode(node, container),
        panels: {
          library: (panel: any, state: any, container: HTMLElement) => createLibraryPanel(container),
          minimap: (panel: any, state: any, container: HTMLElement) => createMinimapPanel(container, state)
        },
        contextMenu: {
          node: (id: string | undefined, container: HTMLElement) => createNodeContextMenu(id, container),
          edge: (id: string | undefined, container: HTMLElement) => createEdgeContextMenu(id, container),
          panel: (id: string | undefined, container: HTMLElement) => createPanelContextMenu(id, container),
          workspace: (container: HTMLElement) => createWorkspaceContextMenu(container)
        } as ContextMenuRenderCallbacks
      },
      actionInterceptor: (action: Action, next: Dispatch<Action>, getState: () => DiagramMakerData<{}, {}>) => {
        updateActionInLogger(action);
        next(action);
      },
      nodeTypeConfig: {
        'testId-centered': {
          size: { width: 100, height: 100 },
          connectorPlacementOverride: ConnectorPlacement.CENTERED
        },
        'testId-dead': {
          size: { width: 150, height: 50 },
          visibleConnectorTypes: VisibleConnectorTypes.NONE
        },
        'testId-dropdown': {
          size: { width: 150, height: 50 }
        },
        'testId-end': {
          size: { width: 150, height: 50 },
          visibleConnectorTypes: VisibleConnectorTypes.INPUT_ONLY
        },
        'testId-input': {
          size: { width: 150, height: 50 }
        },
        'testId-normal': {
          size: { width: 150, height: 50 }
        },
        'testId-normalWithSize': {
          size: { width: 150, height: 50 }
        },
        'testId-start': {
          size: { width: 150, height: 50 },
          visibleConnectorTypes: VisibleConnectorTypes.OUTPUT_ONLY
        },
        'testId-topBottom': {
          size: { width: 150, height: 50 },
          connectorPlacementOverride: ConnectorPlacement.TOP_BOTTOM
        }
      }
    },
    {
      consumerEnhancer: addDevTools(),
      eventListener: (event) => {
        handleMinimapEvent(event, windowAsAny.diagramMaker);
      },
      initialData: graph
    }
  );
}
