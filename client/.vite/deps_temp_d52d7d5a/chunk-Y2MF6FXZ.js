import {
  modulo,
  toDegrees,
  toFixed,
  toRadians
} from "./chunk-FWEAJCOQ.js";

// node_modules/ol/extent/Relationship.js
var Relationship_default = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};

// node_modules/ol/extent.js
function boundingExtent(coordinates) {
  const extent = createEmpty();
  for (let i = 0, ii = coordinates.length; i < ii; ++i) {
    extendCoordinate(extent, coordinates[i]);
  }
  return extent;
}
function _boundingExtentXYs(xs, ys, dest) {
  const minX = Math.min.apply(null, xs);
  const minY = Math.min.apply(null, ys);
  const maxX = Math.max.apply(null, xs);
  const maxY = Math.max.apply(null, ys);
  return createOrUpdate(minX, minY, maxX, maxY, dest);
}
function buffer(extent, value, dest) {
  if (dest) {
    dest[0] = extent[0] - value;
    dest[1] = extent[1] - value;
    dest[2] = extent[2] + value;
    dest[3] = extent[3] + value;
    return dest;
  }
  return [
    extent[0] - value,
    extent[1] - value,
    extent[2] + value,
    extent[3] + value
  ];
}
function clone(extent, dest) {
  if (dest) {
    dest[0] = extent[0];
    dest[1] = extent[1];
    dest[2] = extent[2];
    dest[3] = extent[3];
    return dest;
  }
  return extent.slice();
}
function closestSquaredDistanceXY(extent, x, y) {
  let dx, dy;
  if (x < extent[0]) {
    dx = extent[0] - x;
  } else if (extent[2] < x) {
    dx = x - extent[2];
  } else {
    dx = 0;
  }
  if (y < extent[1]) {
    dy = extent[1] - y;
  } else if (extent[3] < y) {
    dy = y - extent[3];
  } else {
    dy = 0;
  }
  return dx * dx + dy * dy;
}
function containsCoordinate(extent, coordinate) {
  return containsXY(extent, coordinate[0], coordinate[1]);
}
function containsExtent(extent1, extent2) {
  return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
}
function containsXY(extent, x, y) {
  return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}
function coordinateRelationship(extent, coordinate) {
  const minX = extent[0];
  const minY = extent[1];
  const maxX = extent[2];
  const maxY = extent[3];
  const x = coordinate[0];
  const y = coordinate[1];
  let relationship = Relationship_default.UNKNOWN;
  if (x < minX) {
    relationship = relationship | Relationship_default.LEFT;
  } else if (x > maxX) {
    relationship = relationship | Relationship_default.RIGHT;
  }
  if (y < minY) {
    relationship = relationship | Relationship_default.BELOW;
  } else if (y > maxY) {
    relationship = relationship | Relationship_default.ABOVE;
  }
  if (relationship === Relationship_default.UNKNOWN) {
    relationship = Relationship_default.INTERSECTING;
  }
  return relationship;
}
function createEmpty() {
  return [Infinity, Infinity, -Infinity, -Infinity];
}
function createOrUpdate(minX, minY, maxX, maxY, dest) {
  if (dest) {
    dest[0] = minX;
    dest[1] = minY;
    dest[2] = maxX;
    dest[3] = maxY;
    return dest;
  }
  return [minX, minY, maxX, maxY];
}
function createOrUpdateEmpty(dest) {
  return createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, dest);
}
function createOrUpdateFromCoordinate(coordinate, dest) {
  const x = coordinate[0];
  const y = coordinate[1];
  return createOrUpdate(x, y, x, y, dest);
}
function createOrUpdateFromFlatCoordinates(flatCoordinates, offset2, end, stride, dest) {
  const extent = createOrUpdateEmpty(dest);
  return extendFlatCoordinates(extent, flatCoordinates, offset2, end, stride);
}
function equals(extent1, extent2) {
  return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
}
function approximatelyEquals(extent1, extent2, tolerance) {
  return Math.abs(extent1[0] - extent2[0]) < tolerance && Math.abs(extent1[2] - extent2[2]) < tolerance && Math.abs(extent1[1] - extent2[1]) < tolerance && Math.abs(extent1[3] - extent2[3]) < tolerance;
}
function extend(extent1, extent2) {
  if (extent2[0] < extent1[0]) {
    extent1[0] = extent2[0];
  }
  if (extent2[2] > extent1[2]) {
    extent1[2] = extent2[2];
  }
  if (extent2[1] < extent1[1]) {
    extent1[1] = extent2[1];
  }
  if (extent2[3] > extent1[3]) {
    extent1[3] = extent2[3];
  }
  return extent1;
}
function extendCoordinate(extent, coordinate) {
  if (coordinate[0] < extent[0]) {
    extent[0] = coordinate[0];
  }
  if (coordinate[0] > extent[2]) {
    extent[2] = coordinate[0];
  }
  if (coordinate[1] < extent[1]) {
    extent[1] = coordinate[1];
  }
  if (coordinate[1] > extent[3]) {
    extent[3] = coordinate[1];
  }
}
function extendFlatCoordinates(extent, flatCoordinates, offset2, end, stride) {
  for (; offset2 < end; offset2 += stride) {
    extendXY(extent, flatCoordinates[offset2], flatCoordinates[offset2 + 1]);
  }
  return extent;
}
function extendXY(extent, x, y) {
  extent[0] = Math.min(extent[0], x);
  extent[1] = Math.min(extent[1], y);
  extent[2] = Math.max(extent[2], x);
  extent[3] = Math.max(extent[3], y);
}
function forEachCorner(extent, callback) {
  let val;
  val = callback(getBottomLeft(extent));
  if (val) {
    return val;
  }
  val = callback(getBottomRight(extent));
  if (val) {
    return val;
  }
  val = callback(getTopRight(extent));
  if (val) {
    return val;
  }
  val = callback(getTopLeft(extent));
  if (val) {
    return val;
  }
  return false;
}
function getArea(extent) {
  let area = 0;
  if (!isEmpty(extent)) {
    area = getWidth(extent) * getHeight(extent);
  }
  return area;
}
function getBottomLeft(extent) {
  return [extent[0], extent[1]];
}
function getBottomRight(extent) {
  return [extent[2], extent[1]];
}
function getCenter(extent) {
  return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
}
function getCorner(extent, corner) {
  let coordinate;
  if (corner === "bottom-left") {
    coordinate = getBottomLeft(extent);
  } else if (corner === "bottom-right") {
    coordinate = getBottomRight(extent);
  } else if (corner === "top-left") {
    coordinate = getTopLeft(extent);
  } else if (corner === "top-right") {
    coordinate = getTopRight(extent);
  } else {
    throw new Error("Invalid corner");
  }
  return coordinate;
}
function getForViewAndSize(center, resolution, rotation, size, dest) {
  const [x0, y0, x1, y1, x2, y2, x3, y3] = getRotatedViewport(
    center,
    resolution,
    rotation,
    size
  );
  return createOrUpdate(
    Math.min(x0, x1, x2, x3),
    Math.min(y0, y1, y2, y3),
    Math.max(x0, x1, x2, x3),
    Math.max(y0, y1, y2, y3),
    dest
  );
}
function getRotatedViewport(center, resolution, rotation, size) {
  const dx = resolution * size[0] / 2;
  const dy = resolution * size[1] / 2;
  const cosRotation = Math.cos(rotation);
  const sinRotation = Math.sin(rotation);
  const xCos = dx * cosRotation;
  const xSin = dx * sinRotation;
  const yCos = dy * cosRotation;
  const ySin = dy * sinRotation;
  const x = center[0];
  const y = center[1];
  return [
    x - xCos + ySin,
    y - xSin - yCos,
    x - xCos - ySin,
    y - xSin + yCos,
    x + xCos - ySin,
    y + xSin + yCos,
    x + xCos + ySin,
    y + xSin - yCos,
    x - xCos + ySin,
    y - xSin - yCos
  ];
}
function getHeight(extent) {
  return extent[3] - extent[1];
}
function getIntersection(extent1, extent2, dest) {
  const intersection = dest ? dest : createEmpty();
  if (intersects(extent1, extent2)) {
    if (extent1[0] > extent2[0]) {
      intersection[0] = extent1[0];
    } else {
      intersection[0] = extent2[0];
    }
    if (extent1[1] > extent2[1]) {
      intersection[1] = extent1[1];
    } else {
      intersection[1] = extent2[1];
    }
    if (extent1[2] < extent2[2]) {
      intersection[2] = extent1[2];
    } else {
      intersection[2] = extent2[2];
    }
    if (extent1[3] < extent2[3]) {
      intersection[3] = extent1[3];
    } else {
      intersection[3] = extent2[3];
    }
  } else {
    createOrUpdateEmpty(intersection);
  }
  return intersection;
}
function getTopLeft(extent) {
  return [extent[0], extent[3]];
}
function getTopRight(extent) {
  return [extent[2], extent[3]];
}
function getWidth(extent) {
  return extent[2] - extent[0];
}
function intersects(extent1, extent2) {
  return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
}
function isEmpty(extent) {
  return extent[2] < extent[0] || extent[3] < extent[1];
}
function returnOrUpdate(extent, dest) {
  if (dest) {
    dest[0] = extent[0];
    dest[1] = extent[1];
    dest[2] = extent[2];
    dest[3] = extent[3];
    return dest;
  }
  return extent;
}
function intersectsSegment(extent, start, end) {
  let intersects2 = false;
  const startRel = coordinateRelationship(extent, start);
  const endRel = coordinateRelationship(extent, end);
  if (startRel === Relationship_default.INTERSECTING || endRel === Relationship_default.INTERSECTING) {
    intersects2 = true;
  } else {
    const minX = extent[0];
    const minY = extent[1];
    const maxX = extent[2];
    const maxY = extent[3];
    const startX = start[0];
    const startY = start[1];
    const endX = end[0];
    const endY = end[1];
    const slope = (endY - startY) / (endX - startX);
    let x, y;
    if (!!(endRel & Relationship_default.ABOVE) && !(startRel & Relationship_default.ABOVE)) {
      x = endX - (endY - maxY) / slope;
      intersects2 = x >= minX && x <= maxX;
    }
    if (!intersects2 && !!(endRel & Relationship_default.RIGHT) && !(startRel & Relationship_default.RIGHT)) {
      y = endY - (endX - maxX) * slope;
      intersects2 = y >= minY && y <= maxY;
    }
    if (!intersects2 && !!(endRel & Relationship_default.BELOW) && !(startRel & Relationship_default.BELOW)) {
      x = endX - (endY - minY) / slope;
      intersects2 = x >= minX && x <= maxX;
    }
    if (!intersects2 && !!(endRel & Relationship_default.LEFT) && !(startRel & Relationship_default.LEFT)) {
      y = endY - (endX - minX) * slope;
      intersects2 = y >= minY && y <= maxY;
    }
  }
  return intersects2;
}
function applyTransform(extent, transformFn, dest, stops) {
  if (isEmpty(extent)) {
    return createOrUpdateEmpty(dest);
  }
  let coordinates = [];
  if (stops > 1) {
    const width = extent[2] - extent[0];
    const height = extent[3] - extent[1];
    for (let i = 0; i < stops; ++i) {
      coordinates.push(
        extent[0] + width * i / stops,
        extent[1],
        extent[2],
        extent[1] + height * i / stops,
        extent[2] - width * i / stops,
        extent[3],
        extent[0],
        extent[3] - height * i / stops
      );
    }
  } else {
    coordinates = [
      extent[0],
      extent[1],
      extent[2],
      extent[1],
      extent[2],
      extent[3],
      extent[0],
      extent[3]
    ];
  }
  transformFn(coordinates, coordinates, 2);
  const xs = [];
  const ys = [];
  for (let i = 0, l = coordinates.length; i < l; i += 2) {
    xs.push(coordinates[i]);
    ys.push(coordinates[i + 1]);
  }
  return _boundingExtentXYs(xs, ys, dest);
}
function wrapX(extent, projection) {
  const projectionExtent = projection.getExtent();
  const center = getCenter(extent);
  if (projection.canWrapX() && (center[0] < projectionExtent[0] || center[0] >= projectionExtent[2])) {
    const worldWidth = getWidth(projectionExtent);
    const worldsAway = Math.floor(
      (center[0] - projectionExtent[0]) / worldWidth
    );
    const offset2 = worldsAway * worldWidth;
    extent[0] -= offset2;
    extent[2] -= offset2;
  }
  return extent;
}
function wrapAndSliceX(extent, projection, multiWorld) {
  if (projection.canWrapX()) {
    const projectionExtent = projection.getExtent();
    if (!isFinite(extent[0]) || !isFinite(extent[2])) {
      return [[projectionExtent[0], extent[1], projectionExtent[2], extent[3]]];
    }
    wrapX(extent, projection);
    const worldWidth = getWidth(projectionExtent);
    if (getWidth(extent) > worldWidth && !multiWorld) {
      return [[projectionExtent[0], extent[1], projectionExtent[2], extent[3]]];
    }
    if (extent[0] < projectionExtent[0]) {
      return [
        [extent[0] + worldWidth, extent[1], projectionExtent[2], extent[3]],
        [projectionExtent[0], extent[1], extent[2], extent[3]]
      ];
    }
    if (extent[2] > projectionExtent[2]) {
      return [
        [extent[0], extent[1], projectionExtent[2], extent[3]],
        [projectionExtent[0], extent[1], extent[2] - worldWidth, extent[3]]
      ];
    }
  }
  return [extent];
}

// node_modules/ol/proj/Units.js
var METERS_PER_UNIT = {
  // use the radius of the Normal sphere
  "radians": 6370997 / (2 * Math.PI),
  "degrees": 2 * Math.PI * 6370997 / 360,
  "ft": 0.3048,
  "m": 1,
  "us-ft": 1200 / 3937
};

// node_modules/ol/string.js
function padNumber(number, width, precision) {
  const numberString = precision !== void 0 ? number.toFixed(precision) : "" + number;
  let decimal = numberString.indexOf(".");
  decimal = decimal === -1 ? numberString.length : decimal;
  return decimal > width ? numberString : new Array(1 + width - decimal).join("0") + numberString;
}

// node_modules/ol/coordinate.js
function add(coordinate, delta) {
  coordinate[0] += +delta[0];
  coordinate[1] += +delta[1];
  return coordinate;
}
function degreesToStringHDMS(hemispheres, degrees, fractionDigits) {
  const normalizedDegrees = modulo(degrees + 180, 360) - 180;
  const x = Math.abs(3600 * normalizedDegrees);
  const decimals = fractionDigits || 0;
  let deg = Math.floor(x / 3600);
  let min = Math.floor((x - deg * 3600) / 60);
  let sec = toFixed(x - deg * 3600 - min * 60, decimals);
  if (sec >= 60) {
    sec = 0;
    min += 1;
  }
  if (min >= 60) {
    min = 0;
    deg += 1;
  }
  let hdms = deg + "°";
  if (min !== 0 || sec !== 0) {
    hdms += " " + padNumber(min, 2) + "′";
  }
  if (sec !== 0) {
    hdms += " " + padNumber(sec, 2, decimals) + "″";
  }
  if (normalizedDegrees !== 0) {
    hdms += " " + hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0);
  }
  return hdms;
}
function equals2(coordinate1, coordinate2) {
  let equals3 = true;
  for (let i = coordinate1.length - 1; i >= 0; --i) {
    if (coordinate1[i] != coordinate2[i]) {
      equals3 = false;
      break;
    }
  }
  return equals3;
}
function rotate(coordinate, angle) {
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  const y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  coordinate[0] = x;
  coordinate[1] = y;
  return coordinate;
}
function scale(coordinate, scale2) {
  coordinate[0] *= scale2;
  coordinate[1] *= scale2;
  return coordinate;
}
function wrapX2(coordinate, projection) {
  if (projection.canWrapX()) {
    const worldWidth = getWidth(projection.getExtent());
    const worldsAway = getWorldsAway(coordinate, projection, worldWidth);
    if (worldsAway) {
      coordinate[0] -= worldsAway * worldWidth;
    }
  }
  return coordinate;
}
function getWorldsAway(coordinate, projection, sourceExtentWidth) {
  const projectionExtent = projection.getExtent();
  let worldsAway = 0;
  if (projection.canWrapX() && (coordinate[0] < projectionExtent[0] || coordinate[0] > projectionExtent[2])) {
    sourceExtentWidth = sourceExtentWidth || getWidth(projectionExtent);
    worldsAway = Math.floor(
      (coordinate[0] - projectionExtent[0]) / sourceExtentWidth
    );
  }
  return worldsAway;
}

// node_modules/ol/proj/Projection.js
var Projection = class {
  /**
   * @param {Options} options Projection options.
   */
  constructor(options) {
    this.code_ = options.code;
    this.units_ = /** @type {import("./Units.js").Units} */
    options.units;
    this.extent_ = options.extent !== void 0 ? options.extent : null;
    this.worldExtent_ = options.worldExtent !== void 0 ? options.worldExtent : null;
    this.axisOrientation_ = options.axisOrientation !== void 0 ? options.axisOrientation : "enu";
    this.global_ = options.global !== void 0 ? options.global : false;
    this.canWrapX_ = !!(this.global_ && this.extent_);
    this.getPointResolutionFunc_ = options.getPointResolution;
    this.defaultTileGrid_ = null;
    this.metersPerUnit_ = options.metersPerUnit;
  }
  /**
   * @return {boolean} The projection is suitable for wrapping the x-axis
   */
  canWrapX() {
    return this.canWrapX_;
  }
  /**
   * Get the code for this projection, e.g. 'EPSG:4326'.
   * @return {string} Code.
   * @api
   */
  getCode() {
    return this.code_;
  }
  /**
   * Get the validity extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the units of this projection.
   * @return {import("./Units.js").Units} Units.
   * @api
   */
  getUnits() {
    return this.units_;
  }
  /**
   * Get the amount of meters per unit of this projection.  If the projection is
   * not configured with `metersPerUnit` or a units identifier, the return is
   * `undefined`.
   * @return {number|undefined} Meters.
   * @api
   */
  getMetersPerUnit() {
    return this.metersPerUnit_ || METERS_PER_UNIT[this.units_];
  }
  /**
   * Get the world extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getWorldExtent() {
    return this.worldExtent_;
  }
  /**
   * Get the axis orientation of this projection.
   * Example values are:
   * enu - the default easting, northing, elevation.
   * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
   *     or south orientated transverse mercator.
   * wnu - westing, northing, up - some planetary coordinate systems have
   *     "west positive" coordinate systems
   * @return {string} Axis orientation.
   * @api
   */
  getAxisOrientation() {
    return this.axisOrientation_;
  }
  /**
   * Is this projection a global projection which spans the whole world?
   * @return {boolean} Whether the projection is global.
   * @api
   */
  isGlobal() {
    return this.global_;
  }
  /**
   * Set if the projection is a global projection which spans the whole world
   * @param {boolean} global Whether the projection is global.
   * @api
   */
  setGlobal(global) {
    this.global_ = global;
    this.canWrapX_ = !!(global && this.extent_);
  }
  /**
   * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
   */
  getDefaultTileGrid() {
    return this.defaultTileGrid_;
  }
  /**
   * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
   */
  setDefaultTileGrid(tileGrid) {
    this.defaultTileGrid_ = tileGrid;
  }
  /**
   * Set the validity extent for this projection.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */
  setExtent(extent) {
    this.extent_ = extent;
    this.canWrapX_ = !!(this.global_ && extent);
  }
  /**
   * Set the world extent for this projection.
   * @param {import("../extent.js").Extent} worldExtent World extent
   *     [minlon, minlat, maxlon, maxlat].
   * @api
   */
  setWorldExtent(worldExtent) {
    this.worldExtent_ = worldExtent;
  }
  /**
   * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
   * for this projection.
   * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
   * @api
   */
  setGetPointResolution(func) {
    this.getPointResolutionFunc_ = func;
  }
  /**
   * Get the custom point resolution function for this projection (if set).
   * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
   * resolution function (if set).
   */
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_;
  }
};
var Projection_default = Projection;

// node_modules/ol/proj/epsg3857.js
var RADIUS = 6378137;
var HALF_SIZE = Math.PI * RADIUS;
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
var WORLD_EXTENT = [-180, -85, 180, 85];
var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
var EPSG3857Projection = class extends Projection_default {
  /**
   * @param {string} code Code.
   */
  constructor(code) {
    super({
      code,
      units: "m",
      extent: EXTENT,
      global: true,
      worldExtent: WORLD_EXTENT,
      getPointResolution: function(resolution, point) {
        return resolution / Math.cosh(point[1] / RADIUS);
      }
    });
  }
};
var PROJECTIONS = [
  new EPSG3857Projection("EPSG:3857"),
  new EPSG3857Projection("EPSG:102100"),
  new EPSG3857Projection("EPSG:102113"),
  new EPSG3857Projection("EPSG:900913"),
  new EPSG3857Projection("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new EPSG3857Projection("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function fromEPSG4326(input, output, dimension) {
  const length = input.length;
  dimension = dimension > 1 ? dimension : 2;
  if (output === void 0) {
    if (dimension > 2) {
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }
  for (let i = 0; i < length; i += dimension) {
    output[i] = HALF_SIZE * input[i] / 180;
    let y = RADIUS * Math.log(Math.tan(Math.PI * (+input[i + 1] + 90) / 360));
    if (y > MAX_SAFE_Y) {
      y = MAX_SAFE_Y;
    } else if (y < -MAX_SAFE_Y) {
      y = -MAX_SAFE_Y;
    }
    output[i + 1] = y;
  }
  return output;
}
function toEPSG4326(input, output, dimension) {
  const length = input.length;
  dimension = dimension > 1 ? dimension : 2;
  if (output === void 0) {
    if (dimension > 2) {
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }
  for (let i = 0; i < length; i += dimension) {
    output[i] = 180 * input[i] / HALF_SIZE;
    output[i + 1] = 360 * Math.atan(Math.exp(input[i + 1] / RADIUS)) / Math.PI - 90;
  }
  return output;
}

// node_modules/ol/proj/epsg4326.js
var RADIUS2 = 6378137;
var EXTENT2 = [-180, -90, 180, 90];
var METERS_PER_UNIT2 = Math.PI * RADIUS2 / 180;
var EPSG4326Projection = class extends Projection_default {
  /**
   * @param {string} code Code.
   * @param {string} [axisOrientation] Axis orientation.
   */
  constructor(code, axisOrientation) {
    super({
      code,
      units: "degrees",
      extent: EXTENT2,
      axisOrientation,
      global: true,
      metersPerUnit: METERS_PER_UNIT2,
      worldExtent: EXTENT2
    });
  }
};
var PROJECTIONS2 = [
  new EPSG4326Projection("CRS:84"),
  new EPSG4326Projection("EPSG:4326", "neu"),
  new EPSG4326Projection("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new EPSG4326Projection("urn:ogc:def:crs:OGC:2:84"),
  new EPSG4326Projection("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new EPSG4326Projection("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new EPSG4326Projection("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];

// node_modules/ol/proj/projections.js
var cache = {};
function get(code) {
  return cache[code] || cache[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function add2(code, projection) {
  cache[code] = projection;
}

// node_modules/ol/proj/transforms.js
var transforms = {};
function add3(source, destination, transformFn) {
  const sourceCode = source.getCode();
  const destinationCode = destination.getCode();
  if (!(sourceCode in transforms)) {
    transforms[sourceCode] = {};
  }
  transforms[sourceCode][destinationCode] = transformFn;
}
function get2(sourceCode, destinationCode) {
  let transform2;
  if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
    transform2 = transforms[sourceCode][destinationCode];
  }
  return transform2;
}

// node_modules/ol/sphere.js
var DEFAULT_RADIUS = 63710088e-1;
function getDistance(c1, c2, radius) {
  radius = radius || DEFAULT_RADIUS;
  const lat1 = toRadians(c1[1]);
  const lat2 = toRadians(c2[1]);
  const deltaLatBy2 = (lat2 - lat1) / 2;
  const deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
  const a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function offset(c1, distance, bearing, radius) {
  radius = radius || DEFAULT_RADIUS;
  const lat1 = toRadians(c1[1]);
  const lon1 = toRadians(c1[0]);
  const dByR = distance / radius;
  const lat = Math.asin(
    Math.sin(lat1) * Math.cos(dByR) + Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing)
  );
  const lon = lon1 + Math.atan2(
    Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1),
    Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat)
  );
  return [toDegrees(lon), toDegrees(lat)];
}

// node_modules/ol/console.js
var levels = {
  info: 1,
  warn: 2,
  error: 3,
  none: 4
};
var level = levels.info;
function warn(...args) {
  if (level > levels.warn) {
    return;
  }
  console.warn(...args);
}

// node_modules/ol/proj.js
var showCoordinateWarning = true;
function disableCoordinateWarning(disable) {
  const hide = disable === void 0 ? true : disable;
  showCoordinateWarning = !hide;
}
function cloneTransform(input, output) {
  if (output !== void 0) {
    for (let i = 0, ii = input.length; i < ii; ++i) {
      output[i] = input[i];
    }
    output = output;
  } else {
    output = input.slice();
  }
  return output;
}
function identityTransform(input, output) {
  if (output !== void 0 && input !== output) {
    for (let i = 0, ii = input.length; i < ii; ++i) {
      output[i] = input[i];
    }
    input = output;
  }
  return input;
}
function addProjection(projection) {
  add2(projection.getCode(), projection);
  add3(projection, projection, cloneTransform);
}
function addProjections(projections) {
  projections.forEach(addProjection);
}
function get3(projectionLike) {
  return typeof projectionLike === "string" ? get(
    /** @type {string} */
    projectionLike
  ) : (
    /** @type {Projection} */
    projectionLike || null
  );
}
function getPointResolution(projection, resolution, point, units) {
  projection = get3(projection);
  let pointResolution;
  const getter = projection.getPointResolutionFunc();
  if (getter) {
    pointResolution = getter(resolution, point);
    if (units && units !== projection.getUnits()) {
      const metersPerUnit = projection.getMetersPerUnit();
      if (metersPerUnit) {
        pointResolution = pointResolution * metersPerUnit / METERS_PER_UNIT[units];
      }
    }
  } else {
    const projUnits = projection.getUnits();
    if (projUnits == "degrees" && !units || units == "degrees") {
      pointResolution = resolution;
    } else {
      const toEPSG43262 = getTransformFromProjections(
        projection,
        get3("EPSG:4326")
      );
      if (toEPSG43262 === identityTransform && projUnits !== "degrees") {
        pointResolution = resolution * projection.getMetersPerUnit();
      } else {
        let vertices = [
          point[0] - resolution / 2,
          point[1],
          point[0] + resolution / 2,
          point[1],
          point[0],
          point[1] - resolution / 2,
          point[0],
          point[1] + resolution / 2
        ];
        vertices = toEPSG43262(vertices, vertices, 2);
        const width = getDistance(vertices.slice(0, 2), vertices.slice(2, 4));
        const height = getDistance(vertices.slice(4, 6), vertices.slice(6, 8));
        pointResolution = (width + height) / 2;
      }
      const metersPerUnit = units ? METERS_PER_UNIT[units] : projection.getMetersPerUnit();
      if (metersPerUnit !== void 0) {
        pointResolution /= metersPerUnit;
      }
    }
  }
  return pointResolution;
}
function addEquivalentProjections(projections) {
  addProjections(projections);
  projections.forEach(function(source) {
    projections.forEach(function(destination) {
      if (source !== destination) {
        add3(source, destination, cloneTransform);
      }
    });
  });
}
function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
  projections1.forEach(function(projection1) {
    projections2.forEach(function(projection2) {
      add3(projection1, projection2, forwardTransform);
      add3(projection2, projection1, inverseTransform);
    });
  });
}
function createProjection(projection, defaultCode) {
  if (!projection) {
    return get3(defaultCode);
  }
  if (typeof projection === "string") {
    return get3(projection);
  }
  return (
    /** @type {Projection} */
    projection
  );
}
function equivalent(projection1, projection2) {
  if (projection1 === projection2) {
    return true;
  }
  const equalUnits = projection1.getUnits() === projection2.getUnits();
  if (projection1.getCode() === projection2.getCode()) {
    return equalUnits;
  }
  const transformFunc = getTransformFromProjections(projection1, projection2);
  return transformFunc === cloneTransform && equalUnits;
}
function getTransformFromProjections(sourceProjection, destinationProjection) {
  const sourceCode = sourceProjection.getCode();
  const destinationCode = destinationProjection.getCode();
  let transformFunc = get2(sourceCode, destinationCode);
  if (!transformFunc) {
    transformFunc = identityTransform;
  }
  return transformFunc;
}
function getTransform(source, destination) {
  const sourceProjection = get3(source);
  const destinationProjection = get3(destination);
  return getTransformFromProjections(sourceProjection, destinationProjection);
}
function transform(coordinate, source, destination) {
  const transformFunc = getTransform(source, destination);
  return transformFunc(coordinate, void 0, coordinate.length);
}
function transformExtent(extent, source, destination, stops) {
  const transformFunc = getTransform(source, destination);
  return applyTransform(extent, transformFunc, void 0, stops);
}
var userProjection = null;
function getUserProjection() {
  return userProjection;
}
function toUserCoordinate(coordinate, sourceProjection) {
  if (!userProjection) {
    return coordinate;
  }
  return transform(coordinate, sourceProjection, userProjection);
}
function fromUserCoordinate(coordinate, destProjection) {
  if (!userProjection) {
    if (showCoordinateWarning && !equals2(coordinate, [0, 0]) && coordinate[0] >= -180 && coordinate[0] <= 180 && coordinate[1] >= -90 && coordinate[1] <= 90) {
      showCoordinateWarning = false;
      warn(
        "Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates."
      );
    }
    return coordinate;
  }
  return transform(coordinate, userProjection, destProjection);
}
function toUserExtent(extent, sourceProjection) {
  if (!userProjection) {
    return extent;
  }
  return transformExtent(extent, sourceProjection, userProjection);
}
function fromUserExtent(extent, destProjection) {
  if (!userProjection) {
    return extent;
  }
  return transformExtent(extent, userProjection, destProjection);
}
function toUserResolution(resolution, sourceProjection) {
  if (!userProjection) {
    return resolution;
  }
  const sourceMetersPerUnit = get3(sourceProjection).getMetersPerUnit();
  const userMetersPerUnit = userProjection.getMetersPerUnit();
  return sourceMetersPerUnit && userMetersPerUnit ? resolution * sourceMetersPerUnit / userMetersPerUnit : resolution;
}
function addCommon() {
  addEquivalentProjections(PROJECTIONS);
  addEquivalentProjections(PROJECTIONS2);
  addEquivalentTransforms(
    PROJECTIONS2,
    PROJECTIONS,
    fromEPSG4326,
    toEPSG4326
  );
}
addCommon();

export {
  Relationship_default,
  boundingExtent,
  buffer,
  clone,
  closestSquaredDistanceXY,
  containsCoordinate,
  containsExtent,
  containsXY,
  coordinateRelationship,
  createEmpty,
  createOrUpdate,
  createOrUpdateEmpty,
  createOrUpdateFromCoordinate,
  createOrUpdateFromFlatCoordinates,
  equals,
  approximatelyEquals,
  extend,
  extendCoordinate,
  extendFlatCoordinates,
  forEachCorner,
  getArea,
  getBottomLeft,
  getBottomRight,
  getCenter,
  getCorner,
  getForViewAndSize,
  getRotatedViewport,
  getHeight,
  getIntersection,
  getTopLeft,
  getTopRight,
  getWidth,
  intersects,
  isEmpty,
  returnOrUpdate,
  intersectsSegment,
  applyTransform,
  wrapX,
  wrapAndSliceX,
  METERS_PER_UNIT,
  add,
  degreesToStringHDMS,
  equals2,
  rotate,
  scale,
  wrapX2,
  offset,
  warn,
  disableCoordinateWarning,
  identityTransform,
  get3 as get,
  getPointResolution,
  createProjection,
  equivalent,
  getTransformFromProjections,
  getTransform,
  transform,
  getUserProjection,
  toUserCoordinate,
  fromUserCoordinate,
  toUserExtent,
  fromUserExtent,
  toUserResolution
};
//# sourceMappingURL=chunk-Y2MF6FXZ.js.map
