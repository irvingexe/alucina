import p5 from "p5";

export default function sketch(p) {
  const radius = 300;
  const steps = 40000;
  let canvas;
  var locs = [];
  let circle = false;
  let lineSize = -20;
  let count = 0;

  p.setup = () => {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.pixelDensity(0.8);
    var res = 22;
    var countX = p.ceil(p.width / res) + 19;
    var countY = 25;

    for (var j = 0; j < countY; j++) {
      for (var i = 0; i < countX; i++) {
        if (i < 22) {
          locs.push(
            new p5.Vector(
              res * Math.pow(i, (i + 8 * res) * 0.005),
              res * Math.pow(j, (j + 4 * res) * 0.01) - res * (i % 2 ? 1.5 : 1)
            )
          );
        } else if (i <= 44) {
          locs.push(
            new p5.Vector(
              2 * (res * Math.pow(22, (22 + 8 * res) * 0.005)) -
                res * Math.pow(i - 22, (i - 22 + 8 * res) * 0.005),
              p.height -
                res * Math.pow(j, (j + 4 * res) * 0.01) -
                res * (i % 2 ? 0.5 : 0)
            )
          );
        } else if (i <= 66) {
          locs.push(
            new p5.Vector(
              2 * (res * Math.pow(22, (22 + 8 * res) * 0.005)) +
                res * Math.pow(i - 44, (i - 44 + 8 * res) * 0.005),
              res * Math.pow(j, (j + 4 * res) * 0.01) - res * (i % 2 ? 1.5 : 1)
            )
          );
        } else if (i <= 87) {
          locs.push(
            new p5.Vector(
              4 * (res * Math.pow(22, (22 + 8 * res) * 0.005)) -
                res * Math.pow(i - 66, (i - 66 + 8 * res) * 0.005),
              p.height -
                res * Math.pow(j, (j + 4 * res) * 0.01) -
                res * (i % 2 ? 0.5 : 0)
            )
          );
        }
      }
    }

    p.noFill();
    p.stroke(0, 0, 0);
    p.strokeWeight(2);
  };

  p.draw = () => {
    p.background(255, 255, 255);
    p.smooth();
    for (var i = locs.length - 1; i >= 0; i--) {
      var h = calcVec(
        false ? p.width / 2 : locs[i].x - p.mouseX,
        false ? p.height / 2 : locs[i].y - p.mouseY
      );
      let final = calcCircle(locs[i].x, locs[i].y);
      if (circle) {
        if (count < steps) count++;
        if (lineSize < 1) lineSize += 0.001;
      }
      //locs[i].x - ((locs[i].x - (p.width - final.x)) / steps) * count
      //locs[i].x - ((locs[i].x - final.x) / steps) * count
      p.push();
      p.translate(
        ...(circle
          ? [
              locs[i].x - ((locs[i].x - final.x) / steps) * count,
              locs[i].y - ((locs[i].y - final.y) / steps) * count,
            ]
          : [locs[i].x, locs[i].y])
      );
      p.rotate(h.heading());
      p.line(0, 0, 0, lineSize);
      p.pop();
    }
  };

  function calcVec(x, y) {
    return new p5.Vector(y - x, -x - y);
  }

  const calcCircle = (x, y) => {
    const teta = Math.atan((x - p.width / 2) / (y - p.height / 2));
    const direction = x > p.width / 2 ? 1 : -1;
    return {
      x: direction * radius * Math.cos(teta) + p.width / 2,
      y: direction * radius * Math.sin(teta) + p.height / 2,
    };
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
    if (canvas) {
      //Make sure the canvas has been created
      //p.fill(newProps.color);
      circle = true;
    }
  };
}
