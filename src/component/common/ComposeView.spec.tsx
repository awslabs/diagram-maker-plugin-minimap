import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import ComposeView from './ComposeView';
import './Node.scss';

describe('ComposeView', () => {
  const destroyCallback = jest.fn();
  const renderCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls renderCallback after component mounts', () => {
    const testRenderer = TestRenderer.create(
      <ComposeView
        renderCallback={renderCallback}
        destroyCallback={destroyCallback}
      />
    );
    expect(renderCallback).toHaveBeenCalledTimes(1);
  });

  it('calls renderCallback after component update', () => {
    const testRenderer = TestRenderer.create(
      <ComposeView
        renderCallback={renderCallback}
        destroyCallback={destroyCallback}
      />
    );
    jest.clearAllMocks();
    testRenderer.update(
      <ComposeView
        renderCallback={renderCallback}
        destroyCallback={destroyCallback}
      />
    );
    expect(renderCallback).toHaveBeenCalledTimes(1);
  });

  it('calls destroyCallback before unmounting', () => {
    const testRenderer = TestRenderer.create(
      <ComposeView
        renderCallback={renderCallback}
        destroyCallback={destroyCallback}
      />
    );
    testRenderer.unmount();
    expect(destroyCallback).toHaveBeenCalledTimes(1);
  });
});
