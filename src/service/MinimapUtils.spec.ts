import { DiagramMakerPlugin } from 'diagram-maker';
import { getRectOffset, getRectSize, getScale, subtract } from './MinimapUtils';

describe('subtract', () => {
  it('returns subtracted position object', () => {
    const position1 = { x: 30, y: 30 };
    const position2 = { x: 20, y: 20 };
    expect(subtract(position1, position2)).toEqual({ x: 10, y: 10 });
  });
});

describe('getScale', () => {
  it('returns scale when workspace view is short and fat', () => {
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
    const minimap: DiagramMakerPlugin = {
      data:{
        size:{
          height: 200,
          width: 200
        }
      }
    };
    expect(getScale(workspace, minimap)).toEqual(16);
  });
  it('returns scale when workspace view is tall and thin', () => {
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
    const minimap: DiagramMakerPlugin = {
      data:{
        size:{
          height: 200,
          width: 200
        }
      }
    };
    expect(getScale(workspace, minimap)).toEqual(16);
  });
});

describe('getRectOffset', () => {
  it('returns minimap rectangle offset', () => {
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
    const scale = 2;
    expect(getRectOffset(workspace, scale)).toEqual({ x: 50, y: 50 });
  });
});

describe('getRectSize', () => {
  it('returns minimap rectangle size', () => {
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
    const scale = 2;
    expect(getRectSize(workspace, scale)).toEqual({ height: 398, width: 798 });
  });
});
