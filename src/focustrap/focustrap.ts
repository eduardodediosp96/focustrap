import { getAllFocusableChildElements } from "../utils/focusUtils";
import { FocusTrap, GetFocusableElementsInfo } from "./types";

export function getFocusTrap(element: HTMLElement): FocusTrap {
  let selectedIndex = 0;
  function getFocusableElementsInfo(): GetFocusableElementsInfo {
    const allFocusableChildren = getAllFocusableChildElements(element);
    return {
      focusableItems: allFocusableChildren,
      firstFocusableElement: allFocusableChildren[0],
      lastFocusableElement:
        allFocusableChildren[allFocusableChildren.length - 1],
      currentFocusElement: allFocusableChildren[selectedIndex],
      elementsQuantity: allFocusableChildren.length,
    };
  }
  return {
    focusNext() {
      selectedIndex += 1;
      const { elementsQuantity, firstFocusableElement: firstFocusableEl } =
        getFocusableElementsInfo();
      if (selectedIndex > elementsQuantity - 1) {
        selectedIndex = 0;
        firstFocusableEl?.focus();
        return { shouldPreventDefault: true };
      }
      return { shouldPreventDefault: false };
    },
    focusPrevious() {
      selectedIndex -= 1;
      const { elementsQuantity, lastFocusableElement: lastFocusableEl } =
        getFocusableElementsInfo();
      if (selectedIndex < 0) {
        selectedIndex = elementsQuantity - 1;
        lastFocusableEl?.focus();
        return { shouldPreventDefault: true };
      }
      return { shouldPreventDefault: false };
    },
    focusFirstElement() {
      const { firstFocusableElement: firstFocusableEl } =
        getFocusableElementsInfo();
      selectedIndex = 0;
      firstFocusableEl?.focus();
    },
    focusElementByIndex(index: number) {
      const { focusableItems: focusAbleItems } = getFocusableElementsInfo();
      if (!focusAbleItems[index]) {
        throw new Error(
          `Failed to find focusable element with index: ${index}`
        );
        return;
      }
      selectedIndex = index;
      focusAbleItems[index]?.focus();
    },
    getFocusableElementsQuantity() {
      const { elementsQuantity } = getFocusableElementsInfo();
      return elementsQuantity;
    },
    getCurrentFocusElement() {
      const { currentFocusElement } = getFocusableElementsInfo();
      return currentFocusElement;
    },
  };
}
