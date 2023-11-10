// Definición de las reglas de resaltado para MIPS
ace.define("ace/mode/mips_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var MipsHighlightRules = function() {
        this.$rules = {
            "start": [
                {
                    token: "comment",
                    regex: "#.*$"
                },
                {
                    token: "constant.numeric", // Números inmediatos
                    regex: "\\b\\d+\\b"
                },
                {
                    token: "keyword", // Instrucciones
                    regex: "\\b(?:add|addi|sub|lw|sw|beq|bne|jr|blt|move|syscall|jal|j)\\b"
                },
                {
                    token: "variable.parameter", // Registros
                    regex: "\\$[a-zA-Z0-9]+"
                },
                {
                    token: "constant.language.boolean", // Constantes booleanas
                    regex: "\\b(?:true|false)\\b"
                },
                {
                    token: "entity.name.function", // Directivas
                    regex: "\\b(?:.data|.text)\\b"
                },
                {
                    token: "entity.name.function", // Instrucciones
                    regex: "\\b(?:la|li|l)\\b"
                }
                // ... más reglas según sea necesario
            ]
        };
    };

    oop.inherits(MipsHighlightRules, TextHighlightRules);
    exports.MipsHighlightRules = MipsHighlightRules;
});

// Definición del modo MIPS
ace.define("ace/mode/mips", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/mips_highlight_rules"], function(require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var MipsHighlightRules = require("ace/mode/mips_highlight_rules").MipsHighlightRules;

    var Mode = function() {
        this.HighlightRules = MipsHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        this.$id = "ace/mode/mips";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});
