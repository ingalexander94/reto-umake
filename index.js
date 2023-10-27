import { createGame } from "./js/kaboom.js";

const $d = document;

$d.addEventListener("DOMContentLoaded", () => {
  init();
});

function init() {
  var demoWorkspace = Blockly.inject("blocklyDiv", {
    media: "https://unpkg.com/blockly@10.1.3/media/",
    toolbox: $d.getElementById("toolbox"),
  });
  Blockly.Xml.domToWorkspace($d.getElementById("startBlocks"), demoWorkspace);
  createGame();
}
