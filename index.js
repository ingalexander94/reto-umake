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
  Blockly.Blocks["move_block"] = {
    init: function () {
      this.appendStatementInput("DIRECTIONS")
        .setCheck(null)
        .appendField("Mover objeto");
      this.setColour(230);
      this.setTooltip("Move the object in specified directions");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["move_direction_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Mover hacia")
        .appendField(
          new Blockly.FieldDropdown([
            ["arriba", "ARRIBA"],
            ["abajo", "ABAJO"],
            ["derecha", "DERECHA"],
            ["izquierda", "IZQUIERDA"],
          ])
        );
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip(
        "Move the object in a specific direction for a given distance"
      );
      this.setHelpUrl("");
    },
  };

  createGame();
}
