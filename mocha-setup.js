import { JSDOM } from "jsdom";

const { window } = new JSDOM('<div id="app"></div>', {
  url: "http://localhost:5173",
});

global.window = window;
global.document = window.document;
global.FormData = window.FormData;
global.DocumentFragment = window.DocumentFragment;
global.Node = window.Node;
