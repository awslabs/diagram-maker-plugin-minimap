import { DiagramMakerNode } from 'diagram-maker';

export enum DiagramMakerMinimapComponentType {
    /**
     * Used on minimap rectangle.
     * For internal use only.
     */
    RECTANGLE = 'DiagramMakerMinimap.Rectangle',
    /**
     * Used on minimap canvas.
     * For internal use only.
     */
    CANVAS = 'DiagramMakerMinimap.Canvas'
  }

export const DiagramMakerMinimapType = {
  ...DiagramMakerMinimapComponentType
};

export type BoundRenderCallback = (
  diagramMakerContainer: HTMLElement,
  consumerContainer?: HTMLElement | void
) => (HTMLElement | undefined | void);

export type RenderCallback<NodeType> = (
  node: DiagramMakerNode<NodeType>,
  diagramMakerContainer: HTMLElement,
  consumerContainer?: HTMLElement | void
) => (HTMLElement | undefined | void);
