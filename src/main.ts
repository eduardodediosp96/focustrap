import { getFocusTrap } from "./focustrap/focustrap.ts";
import { FocusTrap } from "./focustrap/types.ts";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div id="modal" tabindex="0">
  <div id="modal-header">
    <h1>Focustrap in Modal</h1>
    <button id="close-btn" aria-label="Close">&times;</button>
  </div>
  <div id="modal-body">
    <form id="signup-form">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br><br>
      <label for="gender">Gender:</label>
      <select id="gender" name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select><br><br>
      <fieldset>
        <legend>Interests:</legend>
        <input type="checkbox" id="sports" name="interests" value="sports">
        <label for="sports">Sports</label><br>
        <input type="checkbox" id="music" name="interests" value="music">
        <label for="music">Music</label><br>
        <input type="checkbox" id="reading" name="interests" value="reading">
        <label for="reading">Reading</label><br><br>
      </fieldset>
      <select id="country" name="country">
        <option value="usa">USA</option>
        <option value="uk">UK</option>
        <option value="canada">Canada</option>
        <option value="australia">Australia</option>
      </select><br><br>
      <label for="message">Message:</label><br>
      <textarea id="message" name="message" rows="4" cols="50"></textarea><br><br>
      <button type="submit">Submit</button>
      <button class="cancel-button">Cancel</button>
    </form>
    <div id="focus-info">
      <p id="focus-tag"></p>
      <p id="focus-input"></p>
      <p id="focus-details"></p>
    </div>
  </div>
</div>
`;

let focusTrap: FocusTrap;
const modal = document.querySelector<HTMLElement>("#modal") as HTMLElement;
// Function to populate relevant information about the focused element
const generateFocusInfo = (currentElement: HTMLElement) => {
  // Focus Info
  const focusTagElement = document.getElementById("focus-tag");
  const focusInputElement = document.getElementById("focus-input");
  const focusDetailsElement = document.getElementById("focus-details");

  if (
    currentElement &&
    focusTagElement &&
    focusInputElement &&
    focusDetailsElement
  ) {
    focusTagElement.textContent = `Tag Name: ${currentElement.tagName.toLowerCase()}`;

    if (currentElement instanceof HTMLInputElement) {
      focusInputElement.textContent = `Input Type: ${currentElement.type}`;
    } else {
      focusInputElement.textContent = "";
    }

    // You can add more details about the focused element here
    // Additional details about the focused element
    const details = `
        ID: ${currentElement.id || "N/A"}<br>
        Class: ${currentElement.className || "N/A"}<br>
        Width: ${currentElement.clientWidth}px<br>
        Height: ${currentElement.clientHeight}px<br>
        Position: ${getComputedStyle(currentElement).position}<br>
        Box Sizing: ${getComputedStyle(currentElement).boxSizing}<br>
        Margin: ${getComputedStyle(currentElement).margin}<br>
        Padding: ${getComputedStyle(currentElement).padding}<br>
        Border: ${getComputedStyle(currentElement).border}<br>
        Background Color: ${
          getComputedStyle(currentElement).backgroundColor
        }<br>
        Color: ${getComputedStyle(currentElement).color}<br>
        Font Size: ${getComputedStyle(currentElement).fontSize}<br>
        Font Family: ${getComputedStyle(currentElement).fontFamily}<br>
        Font Weight: ${getComputedStyle(currentElement).fontWeight}<br>
        Text Align: ${getComputedStyle(currentElement).textAlign}<br>
      `;
    focusDetailsElement.innerHTML = details;
  }
};

if (modal) {
  focusTrap = getFocusTrap(modal);

  // Focus the first element
  focusTrap.focusFirstElement();
  const { getCurrentFocusElement } = focusTrap;
  const currentElement = getCurrentFocusElement();
  generateFocusInfo(currentElement);

  // Listener of Keyboard events
  document.addEventListener("keydown", (event) => {
    const { focusPrevious, focusNext, getCurrentFocusElement } = focusTrap;

    if (event.key === "Tab") {
      const { shouldPreventDefault } = event.shiftKey
        ? focusPrevious()
        : focusNext();

      if (shouldPreventDefault) {
        event.preventDefault();
      }
    }

    // Generate Focus Info
    const currentElement = getCurrentFocusElement();
    generateFocusInfo(currentElement);
  });
}
