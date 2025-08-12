import {
  markdownSpace
} from "./chunk-TT67PRVE.js";

// node_modules/micromark-factory-space/dev/index.js
function factorySpace(effects, ok, type, max) {
  const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
  let size = 0;
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

export {
  factorySpace
};
//# sourceMappingURL=chunk-J6TDPGU4.js.map
