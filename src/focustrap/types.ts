export interface FocusTrap {
  focusNext: () => FocusResult;
  focusPrevious: () => FocusResult;
  focusFirstElement: () => void;
  focusElementByIndex: (index: number) => void;
  getFocusableElementsQuantity: () => number;
  getCurrentFocusElement: () => HTMLElement;
}

export interface FocusResult {
  shouldPreventDefault: boolean;
}

export interface GetFocusableElementsInfo {
  focusableItems: HTMLElement[];
  firstFocusableElement: HTMLElement;
  lastFocusableElement: HTMLElement;
  currentFocusElement: HTMLElement;
  elementsQuantity: number;
}
