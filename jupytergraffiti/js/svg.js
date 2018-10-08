define([], () => {
  // Thanks to https://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
  const svg = {
    makeElementHtml: (tag, attr, innerHtml) => {
      let svgHtml = '<' + tag + ' ';
      if (tag === 'svg') {
        svgHtml += 'xmlns="http://www.w3.org/2000/svg" version="1.1" class="graffitiSvg" ';
      }
      let attrHtml = '';
      if (attr !== undefined) {
        attrHtml = $.map(attr, (val, key) => { return (key + '="' + val + '"') } ).join(' ');
      }
      if (innerHtml !== undefined) {
        svgHtml += attrHtml + '>' + innerHtml + '</' + tag + '>';
      } else {
        svgHtml += attrHtml + '></' + tag + '>';
      }
      return svgHtml;
    },
    
    makeSvgElement: (tag, attrs) => {
      const el= document.createElementNS('http://www.w3.org/2000/svg', tag);
      if (tag === 'svg') {
        el.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        el.setAttribute('version', "1.1");
      }
      for (let k in attrs) {
        el.setAttribute(k, attrs[k]);
      }
      return el;
    },

    renderSvg: (svgChildren, x, y, width, height, viewBox) => {
      const container = svg.makeSvgElement('svg', {
        'viewbox': viewBox,
        'class':"graffitiSvg",
        'width': width,
        'height': height,
        'style' : 'left:' + x + 'px;top:' + y + 'px;',
        'preserveAspectRatio':"none"
      });
      
      let innerSvg;
      for (let svgChild of svgChildren) {
        innerSvg = svg.makeSvgElement('svg', {
          'viewbox': svgChild.viewBox,
          'class':"graffitiSvg",
          'width': svgChild.width,
          'height': svgChild.height,
          'style' : 'left:' + svgChild.x + 'px;top:' + svgChild.y + 'px;',
          'preserveAspectRatio':"none"
        });
        innerSvg.appendChild(svgChild.el);
        container.appendChild(innerSvg);
      }
      let svgGenerator = $('#graffitiSvgGenerator');
      if (svgGenerator.length === 0) {
        $('body').append($('<div id="graffitiSvgGenerator"></div>'));
        svgGenerator = $('#graffitiSvgGenerator');
      }
      svgGenerator[0].appendChild(container);
      const containerHtml = svgGenerator[0].innerHTML;
      svgGenerator.empty();

      return containerHtml;
    },

    makeEllipse: (x,y,width,height) => {
    },

    makeRectangle: (x,y,width,height) => {
    },

    makeArrow: (x1,y1,x2,y2) => {
      // Cf : https://www.beyondjava.net/how-to-connect-html-elements-with-an-arrow-using-svg
      const arrowHeadDef = 
        '<defs>' +
        '  <marker id="arrowHead" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="strokeWidth" markerWidth="10" markerHeight="8" orient="auto">' +
        '    <path d="M 0 0 L 10 5 L 0 10 z"></path>' +
        '  </marker>' +
        '</defs>';
    },

    makeCheckmark: (x, y, height) => {
      const checkMark = svg.makeSvgElement('path', 
                                           {
                                             d: 'M 0 ' + height * 0.6 + ' ' + height * 0.35 + ' ' + height + ' ' + height * 0.7 + ' 0',
                                             fill:'none',
                                             'stroke-width':'8',
                                             'stroke':'green',
                                             'width': '25'
                                           }
      );
      return checkMark;
    },

    makeLeftBracket: (x, y, width,height) => {
    },

    makeRightBracket: (x, y, width,height) => {
    },
    
    // need to use html injection, not code generation to make stuff work, 
    // cf my post: https://stackoverflow.com/questions/52675823/preserveaspectratio-ignored-by-code-generation-but-not-html-injection-for-svg-p

    makeLeftCurlyBrace: (x, y, height) => {
      const leftCurlyBrace =
        svg.makeSvgElement('path',
                           {
                             fill: "none",
                             stroke: "#000",
                             "vector-effect": "non-scaling-stroke",
                             "stroke-width" : "2",
                             d: "M0,0 A100, 173.20508075688772 0 0 1  100, 173.20508075688772 A100, " +
                                "173.20508075688772 0 0 0 200 346.41016151377545 A100, " +
                                "173.20508075688772 0 0 0 100, 519.6152422706632 A100, " +
                                "173.20508075688772 0 0 1 0, 692.8203230275509"
                           }
        );
      return svg.renderSvg(leftCurlyBrace,x,y,8,height,"0 0 200 692", "scale(-1,1) translate(-100,10)");
    },

    makeRightCurlyBrace: (x, y, height) => {
      const rightCurlyBrace =
        svg.makeSvgElement('path',
                           {
                             fill: "none",
                             stroke: "#000",
                             "vector-effect": "non-scaling-stroke",
                             "stroke-width" : "2",
                             d: "M0,0 A100, 173.20508075688772 0 0 1  100, 173.20508075688772 A100, " +
                                "173.20508075688772 0 0 0 200 346.41016151377545 A100, " +
                                "173.20508075688772 0 0 0 100, 519.6152422706632 A100, " +
                                "173.20508075688772 0 0 1 0, 692.8203230275509"
                           }
        );
      return svg.renderSvg([rightCurlyBrace], x, y, 8, height, "0 0 200 692");

    },

    makeSymmetricCurlyBraces: (x, y, width, height) => {
      const halfWidth = width / 2;
      const leftCurlyBrace =
        svg.makeSvgElement('path',
                           {
                             fill: "none",
                             stroke: "#000",
                             "vector-effect": "non-scaling-stroke",
                             "stroke-width" : "2",
                             d: "M0,0 A100, 173.20508075688772 0 0 1  100, 173.20508075688772 A100, " +
                                "173.20508075688772 0 0 0 200 346.41016151377545 A100, " +
                                "173.20508075688772 0 0 0 100, 519.6152422706632 A100, " +
                                "173.20508075688772 0 0 1 0, 692.8203230275509",
//                             transform:"scale(-1,1)" // flip horizontally
                           }
        );
      const rightCurlyBrace =
        svg.makeSvgElement('path',
                           {
                             fill: "none",
                             stroke: "#000",
                             "vector-effect": "non-scaling-stroke",
                             "stroke-width" : "2",
                             d: "M0,0 A100, 173.20508075688772 0 0 1  100, 173.20508075688772 A100, " +
                                "173.20508075688772 0 0 0 200 346.41016151377545 A100, " +
                                "173.20508075688772 0 0 0 100, 519.6152422706632 A100, " +
                                "173.20508075688772 0 0 1 0, 692.8203230275509"
                           }
        );
      const curlyViewBox = '0 0 200 692';
      const renderedSvg = svg.renderSvg([
        { 
          el: leftCurlyBrace, 
          viewBox: curlyViewBox,
          width: 8,
          height: height,
          x: 0,
          y : 0
        },
        { 
          el: rightCurlyBrace, 
          viewBox: curlyViewBox,
          width: 8,
          height: height,
          x: width - 10,
          y : 0
        }
      ], x,y,width,height,'0 0 ' + width + ' ' + height);
      console.log(renderedSvg);
      return renderedSvg;
    },

    
    
  };
  
  return (svg);
});

