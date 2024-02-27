/**
 * Recursively retrieves all focusable child elements within a given container element.
 * @param containerElement The HTML element whose focusable child elements are to be retrieved.
 * @param allFocusableChildren An array to collect all focusable child elements encountered during traversal.
 * @returns An array containing all focusable child elements within the specified container element.
 */
export function getAllFocusableChildElements(
  containerElement: HTMLElement,
  allFocusableChildren: HTMLElement[] = []
): HTMLElement[] {
  // Retrieve direct child elements of the container element
  const children = getDirectChildrenElements(
    containerElement,
    allFocusableChildren
  );

  // Recursively traverse through each child element to gather all focusable children
  for (const child of children) {
    getAllFocusableChildElements(child, allFocusableChildren);
  }

  // Return the collection of all focusable children
  return allFocusableChildren;
}

/**
 * Retrieves the direct child elements of the given HTML element.
 * If the element has a shadow root, it retrieves the child elements from the shadow DOM.
 * If the element is a slot, it considers assigned elements if available, otherwise, it includes its regular children.
 * If the element has a positive tabIndex, it adds the element to the list of focusable children.
 * @param element The HTML element whose children are to be retrieved.
 * @param allFocusableChildren An array to store all focusable child elements found during traversal.
 * @returns An array containing the direct child elements of the given element.
 */
function getDirectChildrenElements(
  element: HTMLElement,
  allFocuseableChildren: HTMLElement[]
): HTMLElement[] {
  const children = [];

  // Check if the element has a shadow DOM, usually Web Components have it.
  if (element.shadowRoot) {
    // If so, retrieve children from the shadow DOM
    children.push(...Array.from(element.shadowRoot.children));
  }
  // If it doesn't have a shadow DOM, treat it as a regular html element
  else {
    // Check if the element is a slot
    const isSlot = element instanceof HTMLSlotElement;

    if (isSlot) {
      // If it's a slot, it may or may not have assigned elements
      // we should use assignedElements intead of ask for children directly just because it's a slot element
      const assignedElements = Array.from(
        element.assignedElements() as HTMLElement[]
      );

      // If assigned elements are available, add them to the children array
      if (assignedElements.length > 0) {
        children.push(...assignedElements);
      }
      // If no assigned elements, consider regular children
      else if (element.children) {
        children.push(...Array.from(element.children));
      }
    } else if (element.children) {
      // If it's not a slot, consider regular children
      children.push(...Array.from(element.children));
    }

    // Check if the element is focusable
    if (element.tabIndex >= 0) {
      // If focusable, add it to the list of focusable children
      allFocuseableChildren.push(element);
    }
  }

  return children as HTMLElement[];
}
