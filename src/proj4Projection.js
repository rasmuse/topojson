import {default as proj4} from 'proj4';
import {geoProjection as geoProjection} from 'd3-geo';

export default function(srs) {
  var proj4Proj = proj4(srs);
  var toDeg = 180 / Math.PI;
  var toRad = 1 / toDeg;

  var rawProj = function(lambda, phi) {
    var projected = proj4Proj.forward([lambda * toDeg, phi * toDeg]);
    return [projected[0], projected[1]];
  }
  rawProj.invert = function(x, y) {
    var degreeResult = proj4Proj.inverse([x, y]);
    return [degreeResult[0] * toRad, degreeResult[1] * toRad];
  }

  return geoProjection(rawProj).scale(1).translate([0, 0]);
}
