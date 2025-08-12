import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/micromark/dist/util/normalize-identifier.js
var require_normalize_identifier = __commonJS({
  "node_modules/micromark/dist/util/normalize-identifier.js"(exports, module) {
    "use strict";
    function normalizeIdentifier(value) {
      return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
    }
    module.exports = normalizeIdentifier;
  }
});

// node_modules/micromark/dist/character/markdown-line-ending.js
var require_markdown_line_ending = __commonJS({
  "node_modules/micromark/dist/character/markdown-line-ending.js"(exports, module) {
    "use strict";
    function markdownLineEnding(code) {
      return code < -2;
    }
    module.exports = markdownLineEnding;
  }
});

// node_modules/micromark/dist/character/markdown-space.js
var require_markdown_space = __commonJS({
  "node_modules/micromark/dist/character/markdown-space.js"(exports, module) {
    "use strict";
    function markdownSpace(code) {
      return code === -2 || code === -1 || code === 32;
    }
    module.exports = markdownSpace;
  }
});

// node_modules/micromark/dist/tokenize/factory-space.js
var require_factory_space = __commonJS({
  "node_modules/micromark/dist/tokenize/factory-space.js"(exports, module) {
    "use strict";
    var markdownSpace = require_markdown_space();
    function spaceFactory(effects, ok, type, max) {
      var limit = max ? max - 1 : Infinity;
      var size = 0;
      return start;
      function start(code) {
        if (markdownSpace(code)) {
          effects.enter(type);
          return prefix(code);
        }
        return ok(code);
      }
      function prefix(code) {
        if (markdownSpace(code) && size++ < limit) {
          effects.consume(code);
          return prefix;
        }
        effects.exit(type);
        return ok(code);
      }
    }
    module.exports = spaceFactory;
  }
});

// node_modules/micromark/dist/tokenize/partial-blank-line.js
var require_partial_blank_line = __commonJS({
  "node_modules/micromark/dist/tokenize/partial-blank-line.js"(exports, module) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var factorySpace = require_factory_space();
    var partialBlankLine = {
      tokenize: tokenizePartialBlankLine,
      partial: true
    };
    function tokenizePartialBlankLine(effects, ok, nok) {
      return factorySpace(effects, afterWhitespace, "linePrefix");
      function afterWhitespace(code) {
        return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
      }
    }
    module.exports = partialBlankLine;
  }
});

// node_modules/micromark/dist/constant/splice.js
var require_splice = __commonJS({
  "node_modules/micromark/dist/constant/splice.js"(exports, module) {
    "use strict";
    var splice = [].splice;
    module.exports = splice;
  }
});

// node_modules/micromark/dist/util/chunked-splice.js
var require_chunked_splice = __commonJS({
  "node_modules/micromark/dist/util/chunked-splice.js"(exports, module) {
    "use strict";
    var splice = require_splice();
    function chunkedSplice(list, start, remove, items) {
      var end = list.length;
      var chunkStart = 0;
      var parameters;
      if (start < 0) {
        start = -start > end ? 0 : end + start;
      } else {
        start = start > end ? end : start;
      }
      remove = remove > 0 ? remove : 0;
      if (items.length < 1e4) {
        parameters = Array.from(items);
        parameters.unshift(start, remove);
        splice.apply(list, parameters);
      } else {
        if (remove) splice.apply(list, [start, remove]);
        while (chunkStart < items.length) {
          parameters = items.slice(chunkStart, chunkStart + 1e4);
          parameters.unshift(start, 0);
          splice.apply(list, parameters);
          chunkStart += 1e4;
          start += 1e4;
        }
      }
    }
    module.exports = chunkedSplice;
  }
});

// node_modules/micromark/dist/util/size-chunks.js
var require_size_chunks = __commonJS({
  "node_modules/micromark/dist/util/size-chunks.js"(exports, module) {
    "use strict";
    function sizeChunks(chunks) {
      var index = -1;
      var size = 0;
      while (++index < chunks.length) {
        size += typeof chunks[index] === "string" ? chunks[index].length : 1;
      }
      return size;
    }
    module.exports = sizeChunks;
  }
});

// node_modules/micromark/dist/util/prefix-size.js
var require_prefix_size = __commonJS({
  "node_modules/micromark/dist/util/prefix-size.js"(exports, module) {
    "use strict";
    var sizeChunks = require_size_chunks();
    function prefixSize(events, type) {
      var tail = events[events.length - 1];
      if (!tail || tail[1].type !== type) return 0;
      return sizeChunks(tail[2].sliceStream(tail[1]));
    }
    module.exports = prefixSize;
  }
});

// node_modules/micromark/dist/constant/assign.js
var require_assign = __commonJS({
  "node_modules/micromark/dist/constant/assign.js"(exports, module) {
    "use strict";
    var assign = Object.assign;
    module.exports = assign;
  }
});

// node_modules/micromark/dist/util/shallow.js
var require_shallow = __commonJS({
  "node_modules/micromark/dist/util/shallow.js"(exports, module) {
    "use strict";
    var assign = require_assign();
    function shallow(object) {
      return assign({}, object);
    }
    module.exports = shallow;
  }
});

// node_modules/micromark/dist/util/resolve-all.js
var require_resolve_all = __commonJS({
  "node_modules/micromark/dist/util/resolve-all.js"(exports, module) {
    "use strict";
    function resolveAll(constructs, events, context) {
      var called = [];
      var index = -1;
      var resolve;
      while (++index < constructs.length) {
        resolve = constructs[index].resolveAll;
        if (resolve && called.indexOf(resolve) < 0) {
          events = resolve(events, context);
          called.push(resolve);
        }
      }
      return events;
    }
    module.exports = resolveAll;
  }
});

// node_modules/micromark-extension-footnote/index.js
var require_micromark_extension_footnote = __commonJS({
  "node_modules/micromark-extension-footnote/index.js"(exports, module) {
    module.exports = footnote;
    var normalizeIdentifier = require_normalize_identifier();
    var blank = require_partial_blank_line();
    var createSpace = require_factory_space();
    var chunkedSplice = require_chunked_splice();
    var prefixSize = require_prefix_size();
    var shallow = require_shallow();
    var resolveAll = require_resolve_all();
    var indent = { tokenize: tokenizeIndent, partial: true };
    function footnote(options) {
      var settings = options || {};
      var call = { tokenize: tokenizeFootnoteCall };
      var noteStart = { tokenize: tokenizeNoteStart, resolveAll: resolveAllNote };
      var noteEnd = {
        add: "after",
        tokenize: tokenizeNoteEnd,
        resolveAll: resolveAllNote,
        resolveTo: resolveToNoteEnd
      };
      var definition = {
        tokenize: tokenizeDefinitionStart,
        continuation: { tokenize: tokenizeDefinitionContinuation },
        exit: footnoteDefinitionEnd
      };
      var text = { 91: call };
      if (settings.inlineNotes) {
        text[93] = noteEnd;
        text[94] = noteStart;
      }
      return {
        _hiddenFootnoteSupport: {},
        document: { 91: definition },
        text
      };
    }
    function resolveAllNote(events) {
      var length = events.length;
      var index = -1;
      var token;
      while (++index < length) {
        token = events[index][1];
        if (events[index][0] === "enter" && token.type === "inlineNoteStart") {
          token.type = "data";
          events.splice(index + 1, 4);
          length -= 4;
        }
      }
      return events;
    }
    function resolveToNoteEnd(events, context) {
      var index = events.length - 4;
      var group;
      var text;
      var token;
      var type;
      var openIndex;
      while (index--) {
        token = events[index][1];
        if (events[index][0] === "enter" && token.type === "inlineNoteStart") {
          openIndex = index;
          type = "inlineNote";
          break;
        }
      }
      group = {
        type,
        start: shallow(events[openIndex][1].start),
        end: shallow(events[events.length - 1][1].end)
      };
      text = {
        type: "inlineNoteText",
        start: shallow(events[openIndex + 4][1].end),
        end: shallow(events[events.length - 3][1].start)
      };
      var note = [
        ["enter", group, context],
        events[openIndex + 1],
        events[openIndex + 2],
        events[openIndex + 3],
        events[openIndex + 4],
        ["enter", text, context]
      ];
      chunkedSplice(
        note,
        note.length,
        0,
        resolveAll(
          context.parser.constructs.insideSpan.null,
          events.slice(openIndex + 6, -4),
          context
        )
      );
      note.push(
        ["exit", text, context],
        events[events.length - 2],
        events[events.length - 3],
        ["exit", group, context]
      );
      chunkedSplice(events, index, events.length - index, note);
      return events;
    }
    function tokenizeFootnoteCall(effects, ok, nok) {
      var self = this;
      var defined = self.parser.footnotes || (self.parser.footnotes = []);
      var size = 0;
      var data;
      return start;
      function start(code) {
        if (code !== 91) return nok(code);
        effects.enter("footnoteCall");
        effects.enter("footnoteCallLabelMarker");
        effects.consume(code);
        effects.exit("footnoteCallLabelMarker");
        return callStart;
      }
      function callStart(code) {
        if (code !== 94) return nok(code);
        effects.enter("footnoteCallMarker");
        effects.consume(code);
        effects.exit("footnoteCallMarker");
        effects.enter("footnoteCallString");
        effects.enter("chunkString").contentType = "string";
        return callData;
      }
      function callData(code) {
        var token;
        if (code === null || code === 91 || size++ > 999) {
          return nok(code);
        }
        if (code === 93) {
          if (!data) {
            return nok(code);
          }
          effects.exit("chunkString");
          token = effects.exit("footnoteCallString");
          return defined.indexOf(normalizeIdentifier(self.sliceSerialize(token))) < 0 ? nok(code) : end(code);
        }
        effects.consume(code);
        if (!(code < 0 || code === 32)) {
          data = true;
        }
        return code === 92 ? callEscape : callData;
      }
      function callEscape(code) {
        if (code === 91 || code === 92 || code === 93) {
          effects.consume(code);
          size++;
          return callData;
        }
        return callData(code);
      }
      function end(code) {
        effects.enter("footnoteCallLabelMarker");
        effects.consume(code);
        effects.exit("footnoteCallLabelMarker");
        effects.exit("footnoteCall");
        return ok;
      }
    }
    function tokenizeNoteStart(effects, ok, nok) {
      return start;
      function start(code) {
        if (code !== 94) return nok(code);
        effects.enter("inlineNoteStart");
        effects.enter("inlineNoteMarker");
        effects.consume(code);
        effects.exit("inlineNoteMarker");
        return noteStart;
      }
      function noteStart(code) {
        if (code !== 91) return nok(code);
        effects.enter("inlineNoteStartMarker");
        effects.consume(code);
        effects.exit("inlineNoteStartMarker");
        effects.exit("inlineNoteStart");
        return ok;
      }
    }
    function tokenizeNoteEnd(effects, ok, nok) {
      var self = this;
      return start;
      function start(code) {
        var index = self.events.length;
        var hasStart;
        while (index--) {
          if (self.events[index][1].type === "inlineNoteStart") {
            hasStart = true;
            break;
          }
        }
        if (code !== 93 || !hasStart) {
          return nok(code);
        }
        effects.enter("inlineNoteEnd");
        effects.enter("inlineNoteEndMarker");
        effects.consume(code);
        effects.exit("inlineNoteEndMarker");
        effects.exit("inlineNoteEnd");
        return ok;
      }
    }
    function tokenizeDefinitionStart(effects, ok, nok) {
      var self = this;
      var defined = self.parser.footnotes || (self.parser.footnotes = []);
      var identifier;
      var size = 0;
      var data;
      return start;
      function start(code) {
        if (code !== 91) {
          return nok(code);
        }
        effects.enter("footnoteDefinition")._container = true;
        effects.enter("footnoteDefinitionLabel");
        effects.enter("footnoteDefinitionLabelMarker");
        effects.consume(code);
        effects.exit("footnoteDefinitionLabelMarker");
        return labelStart;
      }
      function labelStart(code) {
        if (code !== 94) return nok(code);
        effects.enter("footnoteDefinitionMarker");
        effects.consume(code);
        effects.exit("footnoteDefinitionMarker");
        effects.enter("footnoteDefinitionLabelString");
        return atBreak;
      }
      function atBreak(code) {
        var token;
        if (code === null || code === 91 || size > 999) {
          return nok(code);
        }
        if (code === 93) {
          if (!data) {
            return nok(code);
          }
          token = effects.exit("footnoteDefinitionLabelString");
          identifier = normalizeIdentifier(self.sliceSerialize(token));
          effects.enter("footnoteDefinitionLabelMarker");
          effects.consume(code);
          effects.exit("footnoteDefinitionLabelMarker");
          effects.exit("footnoteDefinitionLabel");
          return labelAfter;
        }
        if (code === -5 || code === -4 || code === -3) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          size++;
          return atBreak;
        }
        effects.enter("chunkString").contentType = "string";
        return label(code);
      }
      function label(code) {
        if (code === null || code === -5 || code === -4 || code === -3 || code === 91 || code === 93 || size > 999) {
          effects.exit("chunkString");
          return atBreak(code);
        }
        if (!(code < 0 || code === 32)) {
          data = true;
        }
        size++;
        effects.consume(code);
        return code === 92 ? labelEscape : label;
      }
      function labelEscape(code) {
        if (code === 91 || code === 92 || code === 93) {
          effects.consume(code);
          size++;
          return label;
        }
        return label(code);
      }
      function labelAfter(code) {
        if (code !== 58) {
          return nok(code);
        }
        effects.enter("definitionMarker");
        effects.consume(code);
        effects.exit("definitionMarker");
        return effects.check(blank, onBlank, nonBlank);
      }
      function onBlank(code) {
        self.containerState.initialBlankLine = true;
        return done(code);
      }
      function nonBlank(code) {
        if (code === -2 || code === -1 || code === 32) {
          effects.enter("footnoteDefinitionWhitespace");
          effects.consume(code);
          effects.exit("footnoteDefinitionWhitespace");
          return done(code);
        }
        return done(code);
      }
      function done(code) {
        if (defined.indexOf(identifier) < 0) {
          defined.push(identifier);
        }
        return ok(code);
      }
    }
    function tokenizeDefinitionContinuation(effects, ok, nok) {
      var self = this;
      return effects.check(blank, onBlank, notBlank);
      function onBlank(code) {
        if (self.containerState.initialBlankLine) {
          self.containerState.furtherBlankLines = true;
        }
        return ok(code);
      }
      function notBlank(code) {
        if (self.containerState.furtherBlankLines || !(code === -2 || code === -1 || code === 32)) {
          return nok(code);
        }
        self.containerState.initialBlankLine = void 0;
        self.containerState.furtherBlankLines = void 0;
        return effects.attempt(indent, ok, nok)(code);
      }
    }
    function footnoteDefinitionEnd(effects) {
      effects.exit("footnoteDefinition");
    }
    function tokenizeIndent(effects, ok, nok) {
      var self = this;
      return createSpace(effects, afterPrefix, "footnoteDefinitionIndent", 5);
      function afterPrefix(code) {
        return prefixSize(self.events, "footnoteDefinitionIndent") === 4 ? ok(code) : nok(code);
      }
    }
  }
});

// node_modules/mdast-util-footnote/from-markdown.js
var require_from_markdown = __commonJS({
  "node_modules/mdast-util-footnote/from-markdown.js"(exports) {
    var normalizeIdentifier = require_normalize_identifier();
    exports.canContainEols = ["footnote"];
    exports.enter = {
      footnoteDefinition: enterFootnoteDefinition,
      footnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
      footnoteCall: enterFootnoteCall,
      footnoteCallString: enterFootnoteCallString,
      inlineNote: enterNote
    };
    exports.exit = {
      footnoteDefinition: exitFootnoteDefinition,
      footnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
      footnoteCall: exitFootnoteCall,
      footnoteCallString: exitFootnoteCallString,
      inlineNote: exitNote
    };
    function enterFootnoteDefinition(token) {
      this.enter(
        { type: "footnoteDefinition", identifier: "", label: "", children: [] },
        token
      );
    }
    function enterFootnoteDefinitionLabelString() {
      this.buffer();
    }
    function exitFootnoteDefinitionLabelString(token) {
      var label = this.resume();
      this.stack[this.stack.length - 1].label = label;
      this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
        this.sliceSerialize(token)
      ).toLowerCase();
    }
    function exitFootnoteDefinition(token) {
      this.exit(token);
    }
    function enterFootnoteCall(token) {
      this.enter({ type: "footnoteReference", identifier: "", label: "" }, token);
    }
    function enterFootnoteCallString() {
      this.buffer();
    }
    function exitFootnoteCallString(token) {
      var label = this.resume();
      this.stack[this.stack.length - 1].label = label;
      this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
        this.sliceSerialize(token)
      ).toLowerCase();
    }
    function exitFootnoteCall(token) {
      this.exit(token);
    }
    function enterNote(token) {
      this.enter({ type: "footnote", children: [] }, token);
    }
    function exitNote(token) {
      this.exit(token);
    }
  }
});

// node_modules/parse-entities/decode-entity.browser.js
var require_decode_entity_browser = __commonJS({
  "node_modules/parse-entities/decode-entity.browser.js"(exports, module) {
    "use strict";
    var el;
    var semicolon = 59;
    module.exports = decodeEntity;
    function decodeEntity(characters) {
      var entity = "&" + characters + ";";
      var char;
      el = el || document.createElement("i");
      el.innerHTML = entity;
      char = el.textContent;
      if (char.charCodeAt(char.length - 1) === semicolon && characters !== "semi") {
        return false;
      }
      return char === entity ? false : char;
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/association.js
var require_association = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/association.js"(exports, module) {
    module.exports = association;
    var decode = require_decode_entity_browser();
    var characterEscape = /\\([!-/:-@[-`{-~])/g;
    var characterReference = /&(#(\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
    function association(node) {
      if (node.label || !node.identifier) {
        return node.label || "";
      }
      return node.identifier.replace(characterEscape, "$1").replace(characterReference, decodeIfPossible);
    }
    function decodeIfPossible($0, $1) {
      return decode($1) || $0;
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js
var require_container_phrasing = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js"(exports, module) {
    module.exports = phrasing;
    function phrasing(parent, context, safeOptions) {
      var children = parent.children || [];
      var results = [];
      var index = -1;
      var before = safeOptions.before;
      var after;
      var handle;
      var child;
      while (++index < children.length) {
        child = children[index];
        if (index + 1 < children.length) {
          handle = context.handle.handlers[children[index + 1].type];
          if (handle && handle.peek) handle = handle.peek;
          after = handle ? handle(children[index + 1], parent, context, {
            before: "",
            after: ""
          }).charAt(0) : "";
        } else {
          after = safeOptions.after;
        }
        if (results.length > 0 && (before === "\r" || before === "\n") && child.type === "html") {
          results[results.length - 1] = results[results.length - 1].replace(
            /(\r?\n|\r)$/,
            " "
          );
          before = " ";
        }
        results.push(
          context.handle(child, parent, context, {
            before,
            after
          })
        );
        before = results[results.length - 1].slice(-1);
      }
      return results.join("");
    }
  }
});

// node_modules/repeat-string/index.js
var require_repeat_string = __commonJS({
  "node_modules/repeat-string/index.js"(exports, module) {
    "use strict";
    var res = "";
    var cache;
    module.exports = repeat;
    function repeat(str, num) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      if (num === 1) return str;
      if (num === 2) return str + str;
      var max = str.length * num;
      if (cache !== str || typeof cache === "undefined") {
        cache = str;
        res = "";
      } else if (res.length >= max) {
        return res.substr(0, max);
      }
      while (max > res.length && num > 1) {
        if (num & 1) {
          res += str;
        }
        num >>= 1;
        str += str;
      }
      res += str;
      res = res.substr(0, max);
      return res;
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/container-flow.js
var require_container_flow = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/container-flow.js"(exports, module) {
    module.exports = flow;
    var repeat = require_repeat_string();
    function flow(parent, context) {
      var children = parent.children || [];
      var results = [];
      var index = -1;
      var child;
      while (++index < children.length) {
        child = children[index];
        results.push(
          context.handle(child, parent, context, { before: "\n", after: "\n" })
        );
        if (index + 1 < children.length) {
          results.push(between(child, children[index + 1]));
        }
      }
      return results.join("");
      function between(left, right) {
        var index2 = -1;
        var result;
        while (++index2 < context.join.length) {
          result = context.join[index2](left, right, parent, context);
          if (result === true || result === 1) {
            break;
          }
          if (typeof result === "number") {
            return repeat("\n", 1 + Number(result));
          }
          if (result === false) {
            return "\n\n<!---->\n\n";
          }
        }
        return "\n\n";
      }
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/indent-lines.js
var require_indent_lines = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/indent-lines.js"(exports, module) {
    module.exports = indentLines;
    var eol = /\r?\n|\r/g;
    function indentLines(value, map) {
      var result = [];
      var start = 0;
      var line = 0;
      var match;
      while (match = eol.exec(value)) {
        one(value.slice(start, match.index));
        result.push(match[0]);
        start = match.index + match[0].length;
        line++;
      }
      one(value.slice(start));
      return result.join("");
      function one(value2) {
        result.push(map(value2, line, !value2));
      }
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/pattern-compile.js
var require_pattern_compile = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/pattern-compile.js"(exports, module) {
    module.exports = patternCompile;
    function patternCompile(pattern) {
      var before;
      var after;
      if (!pattern._compiled) {
        before = pattern.before ? "(?:" + pattern.before + ")" : "";
        after = pattern.after ? "(?:" + pattern.after + ")" : "";
        if (pattern.atBreak) {
          before = "[\\r\\n][\\t ]*" + before;
        }
        pattern._compiled = new RegExp(
          (before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (after || ""),
          "g"
        );
      }
      return pattern._compiled;
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
var require_pattern_in_scope = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js"(exports, module) {
    module.exports = patternInScope;
    function patternInScope(stack, pattern) {
      return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct);
    }
    function listInScope(stack, list, none) {
      var index;
      if (!list) {
        return none;
      }
      if (typeof list === "string") {
        list = [list];
      }
      index = -1;
      while (++index < list.length) {
        if (stack.indexOf(list[index]) !== -1) {
          return true;
        }
      }
      return false;
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/safe.js
var require_safe = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/safe.js"(exports, module) {
    module.exports = safe;
    var patternCompile = require_pattern_compile();
    var patternInScope = require_pattern_in_scope();
    function safe(context, input, config) {
      var value = (config.before || "") + (input || "") + (config.after || "");
      var positions = [];
      var result = [];
      var infos = {};
      var index = -1;
      var before;
      var after;
      var position;
      var pattern;
      var expression;
      var match;
      var start;
      var end;
      while (++index < context.unsafe.length) {
        pattern = context.unsafe[index];
        if (!patternInScope(context.stack, pattern)) {
          continue;
        }
        expression = patternCompile(pattern);
        while (match = expression.exec(value)) {
          before = "before" in pattern || pattern.atBreak;
          after = "after" in pattern;
          position = match.index + (before ? match[1].length : 0);
          if (positions.indexOf(position) === -1) {
            positions.push(position);
            infos[position] = { before, after };
          } else {
            if (infos[position].before && !before) {
              infos[position].before = false;
            }
            if (infos[position].after && !after) {
              infos[position].after = false;
            }
          }
        }
      }
      positions.sort(numerical);
      start = config.before ? config.before.length : 0;
      end = value.length - (config.after ? config.after.length : 0);
      index = -1;
      while (++index < positions.length) {
        position = positions[index];
        if (
          // Character before or after matched:
          position < start || position >= end
        ) {
          continue;
        }
        if (position + 1 < end && positions[index + 1] === position + 1 && infos[position].after && !infos[position + 1].before && !infos[position + 1].after) {
          continue;
        }
        if (start !== position) {
          result.push(escapeBackslashes(value.slice(start, position), "\\"));
        }
        start = position;
        if (/[!-/:-@[-`{-~]/.test(value.charAt(position)) && (!config.encode || config.encode.indexOf(value.charAt(position)) === -1)) {
          result.push("\\");
        } else {
          result.push(
            "&#x" + value.charCodeAt(position).toString(16).toUpperCase() + ";"
          );
          start++;
        }
      }
      result.push(escapeBackslashes(value.slice(start, end), config.after));
      return result.join("");
    }
    function numerical(a, b) {
      return a - b;
    }
    function escapeBackslashes(value, after) {
      var expression = /\\(?=[!-/:-@[-`{-~])/g;
      var positions = [];
      var results = [];
      var index = -1;
      var start = 0;
      var whole = value + after;
      var match;
      while (match = expression.exec(whole)) {
        positions.push(match.index);
      }
      while (++index < positions.length) {
        if (start !== positions[index]) {
          results.push(value.slice(start, positions[index]));
        }
        results.push("\\");
        start = positions[index];
      }
      results.push(value.slice(start));
      return results.join("");
    }
  }
});

// node_modules/mdast-util-footnote/to-markdown.js
var require_to_markdown = __commonJS({
  "node_modules/mdast-util-footnote/to-markdown.js"(exports) {
    exports.unsafe = [
      // This is on by default already.
      { character: "[", inConstruct: ["phrasing", "label", "reference"] }
    ];
    exports.handlers = {
      footnote,
      footnoteDefinition,
      footnoteReference
    };
    var association = require_association();
    var phrasing = require_container_phrasing();
    var flow = require_container_flow();
    var indentLines = require_indent_lines();
    var safe = require_safe();
    footnoteReference.peek = footnoteReferencePeek;
    footnote.peek = footnotePeek;
    function footnoteReference(node, _, context) {
      var exit = context.enter("footnoteReference");
      var subexit = context.enter("reference");
      var reference = safe(context, association(node), { before: "^", after: "]" });
      subexit();
      exit();
      return "[^" + reference + "]";
    }
    function footnoteReferencePeek() {
      return "[";
    }
    function footnote(node, _, context) {
      var exit = context.enter("footnote");
      var subexit = context.enter("label");
      var value = "^[" + phrasing(node, context, { before: "[", after: "]" }) + "]";
      subexit();
      exit();
      return value;
    }
    function footnotePeek() {
      return "^";
    }
    function footnoteDefinition(node, _, context) {
      var exit = context.enter("footnoteDefinition");
      var subexit = context.enter("label");
      var label = "[^" + safe(context, association(node), { before: "^", after: "]" }) + "]:";
      var value;
      subexit();
      value = indentLines(flow(node, context), map);
      exit();
      return value;
      function map(line, index, blank) {
        if (index) {
          return (blank ? "" : "    ") + line;
        }
        return (blank ? label : label + " ") + line;
      }
    }
  }
});

// node_modules/remark-footnotes/index.js
var require_remark_footnotes = __commonJS({
  "node_modules/remark-footnotes/index.js"(exports, module) {
    var syntax = require_micromark_extension_footnote();
    var fromMarkdown = require_from_markdown();
    var toMarkdown = require_to_markdown();
    var warningIssued;
    module.exports = footnotes;
    function footnotes(options) {
      var data = this.data();
      if (!warningIssued && (this.Parser && this.Parser.prototype && this.Parser.prototype.blockTokenizers || this.Compiler && this.Compiler.prototype && this.Compiler.prototype.visitors)) {
        warningIssued = true;
        console.warn(
          "[remark-footnotes] Warning: please upgrade to remark 13 to use this plugin"
        );
      }
      add("micromarkExtensions", syntax(options));
      add("fromMarkdownExtensions", fromMarkdown);
      add("toMarkdownExtensions", toMarkdown);
      function add(field, value) {
        if (data[field]) data[field].push(value);
        else data[field] = [value];
      }
    }
  }
});
export default require_remark_footnotes();
/*! Bundled license information:

repeat-string/index.js:
  (*!
   * repeat-string <https://github.com/jonschlinkert/repeat-string>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
*/
//# sourceMappingURL=remark-footnotes.js.map
