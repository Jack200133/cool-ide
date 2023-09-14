ace.define("ace/mode/cool_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
  
    var CoolHighlightRules = function () {
        this.$rules = {
          start: [
            {
              token: "keyword.control.cool",
              regex: "\\b(?:CLASS|ELSE|FI|IF|IN|LET|INHERITS|ISVOID|LOOP|POOL|THEN|WHILE|NEW|NOT|SELF_TYPE)\\b",
              caseInsensitive: true,
            },

            {
                regex:"\\b(?:true|false)\\b",
                token:"constant.language.boolean"
            },

            {
              token: "variable.parameter",
              regex: "\\bself\\b", // Para resaltar "self"
            },
            {
                token: "storage.type", // Resaltado para la declaración de funciones
                regex: "\\b(?:Int|Bool|String|IO|Object)\\b",
              },
            {
              token: "constant.numeric",
              regex: "\\b[0-9]+\\b",
            },
            {
              token: "keyword.operator",
              regex: ":|;|,|\\.|-|~|@|\\*|/|\\+|<|<=|=|\\+\\+|--|=\\*|=/|=\\+|=-|<-",
            },
            {
              token: "string",
              regex: '".*?"',
            },
            {
              token: "comment",
              regex: "--.*$",
            },
            {
                // Resaltado para la declaración de funciones
                regex: "\\b[a-z][A-Za-z0-9_]*(?=\\s*\\()",
                token: "entity.name.function",

            },
            
            // Resaltado para declaraciones de variables
            //  n: Int <- 10; resaltar n
            {
                regex: "\\b[a-z][A-Za-z0-9_]*(?=\\s*:\\s*[A-Z][A-Za-z0-9_]*)",
                token: "storage.type",
            },
          ],
        };
      };
      
  
    oop.inherits(CoolHighlightRules, TextHighlightRules);
    exports.CoolHighlightRules = CoolHighlightRules;
  });
  
ace.define("ace/mode/cool", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/cool_highlight_rules"], function (require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var CoolHighlightRules = require("ace/mode/cool_highlight_rules").CoolHighlightRules;
  
    var Mode = function () {
      this.HighlightRules = CoolHighlightRules;
    };
    oop.inherits(Mode, TextMode);
  
    (function () {
      this.$id = "ace/mode/cool";
    }.call(Mode.prototype));
  
    exports.Mode = Mode;
  });
  