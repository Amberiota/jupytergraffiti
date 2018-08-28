define([], function() {
  // From npm package: serialize-selection, MIT license
  // restore the selection specified by the given state and reference node, and
  // return the new selection object
  const selectionSerializer = {
    // serialize the current selection offsets using given node as a reference point
    save: (referenceNode) => {
      referenceNode = referenceNode || document.body;

      const sel = window.getSelection();
      const range = sel.rangeCount ? sel.getRangeAt(0).cloneRange() : document.createRange();
      const startContainer = range.startContainer;
      const startOffset = range.startOffset;
      let state = { 
        content: range.toString() 
      };

      // move the range to select the contents up to the selection
      // so we can find its character offset from the reference node
      range.selectNodeContents(referenceNode);
      range.setEnd(startContainer, startOffset);

      state.start = range.toString().length;
      state.end = state.start + state.content.length;

      return state;
    },

    restore: (state, referenceNode) => {
      referenceNode = referenceNode || document.body;

      let currentNodeCharIndex = 0;
      let nodes = [referenceNode];
      let sel = window.getSelection();
      let range = document.createRange();
      let node;
      let nextNodeCharIndex;

      range.setStart(referenceNode, 0);
      range.collapse(true);

      while (node = nodes.pop()) {
        if (node.nodeType === 3) { // text_node
          nextNodeCharIndex = currentNodeCharIndex + node.length;

          // if this node contains the character at the start index, set this as the
          // starting node with the correct offset
          if (state.start >= currentNodeCharIndex && state.start <= nextNodeCharIndex) {
            range.setStart(node, state.start - currentNodeCharIndex);
          }

          // if this node contains the character at the end index, set this as the
          // ending node with the correct offset and stop looking
          if (state.end >= currentNodeCharIndex && state.end <= nextNodeCharIndex) {
            range.setEnd(node, state.end - currentNodeCharIndex);
            break;
          }

          currentNodeCharIndex = nextNodeCharIndex;
        } else {

          // get child nodes if the current node is not a text node
          let i = node.childNodes.length;
          while (i--) {
            nodes.push(node.childNodes[i]);
          }
        }
      }

      sel.removeAllRanges();
      sel.addRange(range);
      return sel;
    }
  }

  return (selectionSerializer);

});