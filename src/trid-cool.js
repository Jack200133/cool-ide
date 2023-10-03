ace.define("ace/mode/tridirec_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
    
    var TridirecHighlightRules = function () {
        this.$rules = {
            start: [
                {
                    token: "entity.name.class",
                    regex: "CLASS",
                },
                {
                    token: "entity.name.function",
                    regex: "FUNCTION",
                },
                {
                    token: "keyword",
                    regex: "\\b(?:END|INHERITS|RETURN|ASSIGN|IF|GOTO|PARAM|NEW|CALL|END|LABEL)\\b",
                },
                {
                    token: "variable.parameter",
                    regex: "t\\d+"
                },
                {
                    token: "entity.name.function",
                    regex: "LABEL_L\\d+"
                },
                {
                    token: "string",
                    regex: '".*?"',
                  },
                {
                    token: "constant.numeric",
                    regex: "\\b\\d+\\b"
                },
                {
                    token: "constant.language.boolean",
                    regex: "\\b(?:true|false)\\b"
                },
                {
                    token: "keyword.operator",
                    regex: "\\b(?:PLUS|MINUS|MULT|EQ|LT|NEG)\\b"
                },
                {
                    token: "storage.type",
                    regex: "sp[_A-Z0-9]*"
                },
                {
                    token: "variable.parameter",
                    regex: "(?=\\bNEW\\b)\\s*\\w+"
                },
                {
                    token: "keyword.operator",
                    regex: "="
                },
            ]
        };
    };
      
    oop.inherits(TridirecHighlightRules, TextHighlightRules);
    exports.TridirecHighlightRules = TridirecHighlightRules;
});
  
ace.define("ace/mode/tridirec", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/tridirec_highlight_rules"], function (require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var TridirecHighlightRules = require("ace/mode/tridirec_highlight_rules").TridirecHighlightRules;
    
    var Mode = function () {
        this.HighlightRules = TridirecHighlightRules;
    };
    oop.inherits(Mode, TextMode);
    
    (function () {
        this.$id = "ace/mode/tridirec";
    }.call(Mode.prototype));
    
    exports.Mode = Mode;
});
