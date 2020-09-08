/**
 * Gets DOM element based on data-type
 * @param {string} id
 * @return {Cypress.Chainable} A Cypress object
 */
export function getElementByType(type: string): Cypress.Chainable {
  return cy.get(`[data-type="${type}"]`);
}

/**
 * Gets DOM element based on class
 * @param {string} class
 * @return {Cypress.Chainable} A Cypress object
 */
export function getElementByClassName(className: string): Cypress.Chainable {
  return cy.get(`[class="${className}"]`);
}

/**
 * Gets DOM element for diagramMaker workspace
 * @return {Cypress.Chainable} A Cypress object
 */
export function getWorkspace() {
  return getElementByType('DiagramMaker.Workspace');
}

/**
 * Gets DOM elements for all diagramMaker nodes
 * @return {Cypress.Chainable} A Cypress object
 */
export function getAllNodes(): Cypress.Chainable {
  return getElementByType('DiagramMaker.Node');
}

/**
 * Gets DOM elements for all minimap nodes
 * @return {Cypress.Chainable} A Cypress object
 */
export function getMinimapContainer(): Cypress.Chainable {
  return getElementByClassName('dm-minimap-container');
}

/**
 * Gets DOM elements for minimap rectangle
 * @return {Cypress.Chainable} A Cypress object
 */
export function getMinimapRectangle(): Cypress.Chainable {
  return getElementByType('DiagramMakerMinimap.Rectangle');
}

/**
 * Gets DOM elements for minimap canvas
 * @return {Cypress.Chainable} A Cypress object
 */
export function getMinimapCanvas(): Cypress.Chainable {
  return getElementByType('DiagramMakerMinimap.Canvas');
}

/**
 * Gets DOM elements for all minimap nodes
 * @return {Cypress.Chainable} A Cypress object
 */
export function getMiniNodes(): Cypress.Chainable {
  return getElementByClassName('dm-mini-node');
}
