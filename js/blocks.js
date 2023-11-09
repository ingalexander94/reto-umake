class BlocksControl {
  #wrapper;
  #workspace;

  constructor(wrapper) {
    this.#wrapper = wrapper;
    this.#init();
  }

  #init() {
    this.#workspace = Blockly.inject(this.#wrapper, {
      media: "https://unpkg.com/blockly@10.1.3/media/",
      toolbox: this.#createToolbox(),
      trashcan: true,
      scrollbars: true,
      collapse: true,
    });
  }

  #createToolbox() {
    this.createMoveBlock();
    var toolboxDef = "<xml>";
    toolboxDef += '<block type="move_direction_block"></block>';
    toolboxDef += `
    <block type="controls_repeat_ext">
      <value name="TIMES">
          <shadow type="math_number">
              <field name="NUM">3</field>
          </shadow>
      </value>
    </block>`;
    toolboxDef += "</xml>";
    return toolboxDef;
  }

  createMainBlock() {
    Blockly.Blocks["move_block"] = {
      init: function () {
        this.appendStatementInput("OPTIONS")
          .setCheck("Option")
          .appendField("Mover");
        this.setColour(137);
        this.setOutput(false, null);
        this.setTooltip("Mover el objeto en direcciones específicas");
        this.setHelpUrl("");
      },
    };
    const customBlock = this.#workspace.newBlock("move_block");
    customBlock.moveBy(260, 30);
    this.#workspace.getFlyout().createBlock(customBlock);
    javascript.javascriptGenerator.forBlock["move_block"] = function (block) {
      const dropdownValue = Blockly.JavaScript.valueToCode(
        block,
        "OPTIONS",
        Blockly.JavaScript.ORDER_NONE
      );
      return dropdownValue;
    };
  }

  createMoveBlock() {
    Blockly.Blocks["move_direction_block"] = {
      init: function () {
        this.appendDummyInput()
          .appendField("Girar")
          .appendField(
            new Blockly.FieldDropdown([
              ["arriba", "ARRIBA"],
              ["abajo", "ABAJO"],
              ["derecha", "DERECHA"],
              ["izquierda", "IZQUIERDA"],
            ]),
            "OPTION"
          );
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setOutput(true, "Option");
        this.setColour(224);
        this.setTooltip(
          "Mover el objeto en una dirección específica durante una distancia determinada"
        );
        this.setHelpUrl("");
      },
    };

    javascript.javascriptGenerator.forBlock["move_direction_block"] = function (
      block
    ) {
      var dropdownValue = block.getFieldValue("OPTION");
      return ["'" + dropdownValue + "'", Blockly.JavaScript.ORDER_NONE];
    };
  }

  play() {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    let movements = [];
    let code = Blockly.JavaScript.workspaceToCode(this.#workspace).trim();
    if (code.length) {
      code = code.split(",")[0];
      movements = code.match(/'([^']+)'/g).map(function (match) {
        return match.slice(1, -1);
      });
    }
    return movements;
  }
}

export { BlocksControl };
