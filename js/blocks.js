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
    this.createMoveForeheadBlock();
    this.createBucleBlock();
    var toolboxDef = "<xml>";
    toolboxDef += `<label text="" web-class="myLabelStyle"></label>`;
    toolboxDef += `<label text="" web-class="myLabelStyle"></label>`;
    toolboxDef += `<label text="" web-class="myLabelStyle"></label>`;
    toolboxDef += '<block type="move_direction_block"></block>';
    toolboxDef += '<block type="move_front_block"></block>';
    if (this.#challenge === 3) {
      toolboxDef += `
      <block type="repetir"> </block>`;
    }
    toolboxDef += "</xml>";
    return toolboxDef;
  }

  createMainBlock() {
    Blockly.Blocks["move_block"] = {
      init: function () {
        this.appendStatementInput("OPTIONS")
          .setCheck("Option")
          .appendField("Ejecutar  ");
        this.setColour(115);

        this.setDeletable(false);
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

  createBucleBlock() {
    Blockly.Blocks["repetir"] = {
      init: function () {
        this.appendDummyInput()
          .appendField("Repetir")
          .appendField(
            new Blockly.FieldDropdown([
              ["2", "2"],
              ["3", "3"],
              ["4", "4"],
              ["5", "5"],
              ["6", "6"],
              ["7", "7"],
            ]),
            "veces"
          );
        this.appendStatementInput("cuerpo").setCheck(null).appendField("veces");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setOutput(true, "String");
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };

    javascript.javascriptGenerator.forBlock["repetir"] = function (block) {
      var veces = block.getFieldValue("veces");
      var cuerpo = Blockly.JavaScript.valueToCode(
        block,
        "cuerpo",
        Blockly.JavaScript.ORDER_NONE
      );
      let salida = "";
      for (let i = 0; i < veces; i++) {
        salida += cuerpo;
      }
      return [salida, Blockly.JavaScript.ORDER_NONE];
    };
  }

  createMoveBlock() {
    Blockly.Blocks["move_direction_block"] = {
      init: function () {
        this.appendDummyInput()
          .appendField("Girar")
          .appendField(
            new Blockly.FieldDropdown([
              ["izquierda", "IZQUIERDA"],
              ["derecha", "DERECHA"],
            ]),
            "OPTION"
          );
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setOutput(true, "String");
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

  createMoveForeheadBlock() {
    Blockly.Blocks["move_front_block"] = {
      init: function () {
        this.appendDummyInput().appendField("Avanzar");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setOutput(true, "String");
        this.setColour(224);
        this.setTooltip("Mueve la nave hacia al frente");
        this.setHelpUrl("");
      },
    };

    javascript.javascriptGenerator.forBlock["move_front_block"] = function (_) {
      return ["'AVANZAR'", Blockly.JavaScript.ORDER_NONE];
    };
  }

  play() {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    let movements = [];
    let code = Blockly.JavaScript.workspaceToCode(this.#workspace).trim();
    if (code.length) {
      code = code.replace(";", "").split(",");
      code.forEach((text) => {
        text = text.includes("99") ? text.replace("99", "").trim() : text;
        if (text) {
          const normalizeMovements = text
            .match(/'([^']+)'/g)
            .map(function (match) {
              return match.slice(1, -1);
            });
          movements = [...movements, ...normalizeMovements];
        }
      });
    }
    return movements;
  }
}

export { BlocksControl };
