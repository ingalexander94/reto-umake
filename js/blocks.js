class BlocksControl {
  #wrapper;
  #workspace;
  #challenge;
  #isMobile;

  constructor(wrapper, challenge) {
    this.#wrapper = wrapper;
    this.#challenge = challenge;
    this.#isMobile =
      window.innerWidth < 1100 &&
      screen.orientation.type === "landscape-primary";
    this.#init();
  }

  #init() {
    this.#workspace = Blockly.inject(this.#wrapper, {
      media: "https://unpkg.com/blockly@10.1.3/media/",
      toolbox: this.#createToolbox(),
      trashcan: true,
      scrollbars: true,
      collapse: true,
      renderer: "thrasos",
    });
  }

  #createToolbox() {
    this.createMoveBlock();
    var toolboxDef = "<xml>";
    toolboxDef += `<label text="" web-class="myLabelStyle"></label>`;
    toolboxDef += `<label text="" web-class="myLabelStyle"></label>`;
    toolboxDef += `<label text="" web-class="myLabelStyle"></label>`;
    toolboxDef += '<block type="move_direction_block"></block>';
    if (this.#challenge === 3) {
      toolboxDef += `
      <block type="controls_repeat_ext">
        <value name="TIMES">
            <shadow type="math_number">
                <field name="NUM">3</field>
            </shadow>
        </value>
      </block>`;
    }
    toolboxDef += "</xml>";
    return toolboxDef;
  }

  createMainBlock() {
    Blockly.Blocks["move_block"] = {
      init: function () {
        this.appendStatementInput("OPTIONS")
          .setCheck("Option")
          .appendField("Ejecutar");
        this.setColour(115);
        this.setOutput(false, null);
        this.setTooltip("Mover el objeto en direcciones específicas");
        this.setHelpUrl("");
      },
    };
    const customBlock = this.#workspace.newBlock("move_block");
    customBlock.moveBy(this.#isMobile ? 170 : 260, this.#isMobile ? 10 : 30);
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
          .appendField("Ir a")
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
