---
sort: 1
---

# Integration Steps

## Setup Minimap initial data
Configure minimap's container size in the initial data at the time of diagram maker [initialization](https://awslabs.github.io/diagram-maker/usage/initialization.html). It should be noted that we use the plugin ID of `minimap`.
```javascript
plugins: {
    minimap: {
      data:{
        size: { width: 200, height: 200 }
      }
    }
}
```

## Add minimap event handler to event listener
Just add handleMinimapEvent to eventListener and pass event and diagram maker instance to it.
```javascript
import { handleMinimapEvent } from 'diagram-maker-plugin-minimap';

...

const wrapper = { diagramMaker: null };
wrapper.diagramMaker = new DiagramMaker(
  ...
  {
    eventListener: (event: NormalizedEvent) => {
      handleMinimapEvent(event, wrapper.diagramMaker);
    }
  }
)
```

## Render the Minimap nodes
You need to provide a render callback function for mini nodes. It is used to render mini nodes within the minimap. You can use this method to give different styles to different types of nodes. This is a [diagram maker style render callback](https://awslabs.github.io/diagram-maker/usage/configuration.html#render-callbacks) that can use vanilla JS/TS, or React or any other framework to render the nodes.
```javascript
const renderMiniNode = (node: DiagramMakerNode<{}>, container: HTMLElement) => {
  if (node.typeId === 'circular') {
    return createMinimapCircularNode(node, container);
  } else if(node.typeId === 'rectangular') {
    return createMinimapRectangularNode(node, container);
  }
  ...
};
```

## Add the Minimap component
Final step is to integrate the minimap component in whichever part of the UI you want. Usually, it is added to a diagram maker panel. There are 2 ways to integrate the minimap component.

### createMinimap function
This is a method that would return the DOM element that needs to be added to the element inside which you want to render the minimap.
```javascript
import { createMinimap } from 'diagram-maker-plugin-minimap';

...

newDiv.appendChild(createMinimap(state, renderMiniNode, destoryCallback));
```

### Minimap react component
If you're using React to render the panel, you can directly use the Minimap component as well.
```javascript
import { Minimap } from 'diagram-maker-plugin-minimap';

...

render = () => (
  <div>
    <Minimap
      state={state}
      renderMiniNode={renderMiniNode}
      destoryCallback={destroyCallback}
    />
  </div>
);

```

### Parameters
It has three parameters.
* **Diagram Maker State**: This should be available inside the render callback for panels or anywhere else you want to render the minimap.
* **Render function for mini node**: This is what we had created above.
* **Destroy**: This is a destroy callback for the mini nodes we render inside the render callback. Check out the need for destroy callbacks as well as samples of destroy callbacks for vanilla JS/TS, React, etc see this [section](https://awslabs.github.io/diagram-maker/usage/configuration.html#render-callbacks) of Diagram Maker documentation.
