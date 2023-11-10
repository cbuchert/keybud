import { KeyMap } from "../types/KeyMap.ts"

const row1: KeyMap = Object.fromEntries([
  ["Escape", { code: "Escape", labels: ["esc"], keys: ["Escape"] }],
  ["F1", { code: "F1", labels: ["F1"], keys: ["F1"] }],
  ["F2", { code: "F2", labels: ["F2"], keys: ["F2"] }],
  ["F3", { code: "F3", labels: ["F3"], keys: ["F3"] }],
  ["F4", { code: "F4", labels: ["F4"], keys: ["F4"] }],
  ["F5", { code: "F5", labels: ["F5"], keys: ["F5"] }],
  ["F6", { code: "F6", labels: ["F6"], keys: ["F6"] }],
  ["F7", { code: "F7", labels: ["F7"], keys: ["F7"] }],
  ["F8", { code: "F8", labels: ["F8"], keys: ["F8"] }],
  ["F9", { code: "F9", labels: ["F9"], keys: ["F9"] }],
  ["F10", { code: "F10", labels: ["F10"], keys: ["F10"] }],
  ["F11", { code: "F11", labels: ["F11"], keys: ["F11"] }],
  ["F12", { code: "F12", labels: ["F12"], keys: ["F12"] }],
])
const row2: KeyMap = Object.fromEntries([
  ["Backquote", { code: "Backquote", labels: ["`", "~"], keys: ["`", "~"] }],
  ["Digit1", { code: "Digit1", labels: ["1", "!"], keys: ["1", "!"] }],
  ["Digit2", { code: "Digit2", labels: ["2", "@"], keys: ["2", "@"] }],
  ["Digit3", { code: "Digit3", labels: ["3", "#"], keys: ["3", "#"] }],
  ["Digit4", { code: "Digit4", labels: ["4", "$"], keys: ["4", "$"] }],
  ["Digit5", { code: "Digit5", labels: ["5", "%"], keys: ["5", "%"] }],
  ["Digit6", { code: "Digit6", labels: ["6", "^"], keys: ["6", "^"] }],
  ["Digit7", { code: "Digit7", labels: ["7", "&"], keys: ["7", "&"] }],
  ["Digit8", { code: "Digit8", labels: ["8", "*"], keys: ["8", "*"] }],
  ["Digit9", { code: "Digit9", labels: ["9", "("], keys: ["9", "("] }],
  ["Digit0", { code: "Digit0", labels: ["0", ")"], keys: ["0", ")"] }],
  ["Minus", { code: "Minus", labels: ["-", "_"], keys: ["-", "_"] }],
  ["Equal", { code: "Equal", labels: ["=", "+"], keys: ["=", "+"] }],
  ["Backspace", { code: "Backspace", labels: ["delete"], keys: ["Backspace"] }],
])
const row3: KeyMap = Object.fromEntries([
  ["Tab", { code: "Tab", labels: ["tab"], keys: ["Tab"] }],
  ["KeyQ", { code: "KeyQ", labels: ["Q"], keys: ["q", "Q"] }],
  ["KeyW", { code: "KeyW", labels: ["W"], keys: ["w", "W"] }],
  ["KeyE", { code: "KeyE", labels: ["E"], keys: ["e", "E"] }],
  ["KeyR", { code: "KeyR", labels: ["R"], keys: ["r", "R"] }],
  ["KeyT", { code: "KeyT", labels: ["T"], keys: ["t", "T"] }],
  ["KeyY", { code: "KeyY", labels: ["Y"], keys: ["y", "Y"] }],
  ["KeyU", { code: "KeyU", labels: ["U"], keys: ["u", "U"] }],
  ["KeyI", { code: "KeyI", labels: ["I"], keys: ["i", "I"] }],
  ["KeyO", { code: "KeyO", labels: ["O"], keys: ["o", "O"] }],
  ["KeyP", { code: "KeyP", labels: ["P"], keys: ["p", "P"] }],
  [
    "BracketLeft",
    { code: "BracketLeft", labels: ["[", "{"], keys: ["[", "{"] },
  ],
  [
    "BracketRight",
    { code: "BracketRight", labels: ["]", "}"], keys: ["]", "}"] },
  ],
  ["Backslash", { code: "Backslash", labels: ["\\", "|"], keys: ["\\", "|"] }],
])
const row4: KeyMap = Object.fromEntries([
  ["CapsLock", { code: "CapsLock", labels: ["caps lock"], keys: ["CapsLock"] }],
  ["KeyA", { code: "KeyA", labels: ["A"], keys: ["a", "A"] }],
  ["KeyS", { code: "KeyS", labels: ["S"], keys: ["s", "S"] }],
  ["KeyD", { code: "KeyD", labels: ["D"], keys: ["d", "D"] }],
  ["KeyF", { code: "KeyF", labels: ["F"], keys: ["f", "F"] }],
  ["KeyG", { code: "KeyG", labels: ["G"], keys: ["g", "G"] }],
  ["KeyH", { code: "KeyH", labels: ["H"], keys: ["h", "H"] }],
  ["KeyJ", { code: "KeyJ", labels: ["J"], keys: ["j", "J"] }],
  ["KeyK", { code: "KeyK", labels: ["K"], keys: ["k", "K"] }],
  ["KeyL", { code: "KeyL", labels: ["L"], keys: ["l", "L"] }],
  ["Semicolon", { code: "Semicolon", labels: [";", ":"], keys: [";", ":"] }],
  ["Quote", { code: "Quote", labels: ["'", '"'], keys: ["'", '"'] }],
  ["Enter", { code: "Enter", labels: ["return"], keys: ["Enter"] }],
])
const row5: KeyMap = Object.fromEntries([
  [
    "ShiftLeft",
    { code: "ShiftLeft", labels: ["shift"], isModifier: true, keys: ["Shift"] },
  ],
  ["KeyZ", { code: "KeyZ", labels: ["Z"], keys: ["z", "Z"] }],
  ["KeyX", { code: "KeyX", labels: ["X"], keys: ["x", "X"] }],
  ["KeyC", { code: "KeyC", labels: ["C"], keys: ["c", "C"] }],
  ["KeyV", { code: "KeyV", labels: ["V"], keys: ["v", "V"] }],
  ["KeyB", { code: "KeyB", labels: ["B"], keys: ["b", "B"] }],
  ["KeyN", { code: "KeyN", labels: ["N"], keys: ["n", "N"] }],
  ["KeyM", { code: "KeyM", labels: ["M"], keys: ["m", "M"] }],
  ["Comma", { code: "Comma", labels: [",", "<"], keys: [",", "<"] }],
  ["Period", { code: "Period", labels: [".", ">"], keys: [".", ">"] }],
  ["Slash", { code: "Slash", labels: ["/", "?"], keys: ["/", "?"] }],
  [
    "ShiftRight",
    {
      code: "ShiftRight",
      labels: ["shift"],
      isModifier: true,
      keys: ["Shift"],
    },
  ],
])
const row6: KeyMap = Object.fromEntries([
  [
    "ControlLeft",
    {
      code: "ControlLeft",
      labels: ["control", "⌃"],
      isModifier: true,
      keys: ["Control"],
    },
  ],
  [
    "AltLeft",
    {
      code: "AltLeft",
      labels: ["option", "⌥"],
      isModifier: true,
      keys: ["Alt"],
    },
  ],
  [
    "MetaLeft",
    {
      code: "MetaLeft",
      labels: ["command", "⌘"],
      mmWidth: 20.75,
      isModifier: true,
      keys: ["Meta"],
    },
  ],
  ["Space", { code: "Space", labels: [""], mmWidth: 91.5, keys: [" "] }],
  [
    "MetaRight",
    {
      code: "MetaRight",
      labels: ["command", "⌘"],
      mmWidth: 20.75,
      isModifier: true,
      keys: ["Meta"],
    },
  ],
  [
    "AltRight",
    {
      code: "AltRight",
      labels: ["option", "⌥"],
      isModifier: true,
      keys: ["Alt"],
    },
  ],
  ["ArrowLeft", { code: "ArrowLeft", labels: ["←"], keys: ["ArrowLeft"] }],
  [
    "ArrowUp",
    { code: "ArrowUp", labels: ["↑"], mmHeight: 7.46, keys: ["ArrowUp"] },
  ],
  [
    "ArrowDown",
    { code: "ArrowDown", labels: ["↓"], mmHeight: 7.46, keys: ["ArrowDown"] },
  ],
  ["ArrowRight", { code: "ArrowRight", labels: ["→"], keys: ["ArrowRight"] }],
])
export const appleQuertyKeymap: KeyMap = {
  ...row1,
  ...row2,
  ...row3,
  ...row4,
  ...row5,
  ...row6,
}
