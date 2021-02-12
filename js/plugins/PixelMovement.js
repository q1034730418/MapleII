//=============================================================================
// PixelMovement.js
//=============================================================================
 
/*:
 * @plugindesc Like you don't know what this does.
 */
 
(function () {
    //-----------------------------------------------------------------------------
 
    // An even number between 2 and 48, inclusive
    var tileSection = 4;
    // Gives you precise collision mask but can significantly compromise the performance
    var analyzeTilesetBitmap = true;
    // A section of the bitmap will be masked impassable if the valid pixel rate reaches this threshold
    var bitmapAnalysisThreshold = 0.5;
    // (x, y, width, height)
    var characterCollisionBox = new Rectangle(1, 2, 2, 2);
    // Tiles with this terrain tag are forced to be passable
    var forcePassableTerrainTag = 3;
    // Max distance between two followers
    var followerDistance = 1;
    // For debugging
    var drawCollisionMask = true;
    // [map, ladder, bush, counter, damageFloor, boat, ship], for debugging
    var collisionMaskLayerColors = ['red', 'grey', 'green', 'yellow', 'crimson', 'lightBlue', 'blue'];
 
    //-----------------------------------------------------------------------------
    var toPixel = function (t) {
        return t * tileSection;
    };
 
    var toTile = function (p) {
        return p / tileSection;
    };
 
    //-----------------------------------------------------------------------------
    // Table2
 
    function Table2(xSize, ySize) {
        this.initialize.apply(this, arguments);
    }
 
    Table2.prototype.initialize = function (xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.data = [];
    };
 
    Table2.prototype.get = function (x, y) {
        return this.data[y * this.xSize + x];
    };
 
    Table2.prototype.set = function (x, y, data) {
        this.data[y * this.xSize + x] = data;
    };
 
    //-----------------------------------------------------------------------------
    // Table3
 
    function Table3() {
        this.initialize.apply(this, arguments);
    }
 
    Table3.prototype.initialize = function (xSize, ySize, zSize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.zSize = zSize;
        this.data = [];
    };
 
    Table3.prototype.get = function (x, y, z) {
        return this.data[z * this.ySize * this.xSize + y * this.xSize + x];
    };
 
    Table3.prototype.set = function (x, y, z, data) {
        return this.data[z * this.ySize * this.xSize + y * this.xSize + x] = data;
    };
 
    //-----------------------------------------------------------------------------
    // Bitmap
 
    Bitmap.prototype.isOccupied = function (x, y, w, h, threshold) {
        var data = this._context.getImageData(x, y, w, h).data;
        var occupied = 0;
        for (var i = 3; i < data.length; i += 4) {
            if (data[i] === 255) {
                occupied++;
            }
        }
        return (occupied / (data.length / 4)) > threshold;
    };
 
    //-----------------------------------------------------------------------------
    // Tilemap
 
    var aliasTilemapPrototypeUpdate = Tilemap.prototype.update;
    Tilemap.prototype.update = function () {
        aliasTilemapPrototypeUpdate.apply(this, arguments);
        if (this._needRefreshCollisionMask && this.isReady()) {
            this._needRefreshCollisionMask = false;
            this.refreshCollisionMask();
        }
    };
 
    var aliasTilemapPrototypeRefresh = Tilemap.prototype.refresh;
    Tilemap.prototype.refresh = function () {
        aliasTilemapPrototypeRefresh.apply(this, arguments);
        this._needRefreshCollisionMask = true;
    };
 
    Tilemap.prototype.refreshCollisionMask = function () {
        console.time('Collision Mask Generation');
        $gameMap.collisionMask = new Table3($gameMap.widthPx(), $gameMap.heightPx(), 8);
        this._tileCollisionMaskCaches = {};
        for (var tx = 0; tx < this._mapWidth; tx++) {
            for (var ty = 0; ty < this._mapHeight; ty++) {
                this.drawTileCollisionMask(tx, ty);
            }
        }
        this._tileCollisionMaskCaches = null;
        console.timeEnd('Collision Mask Generation');
        if (drawCollisionMask) {
            this.debugDrawCollisionMask();
        }
    };
 
    Tilemap.prototype.drawTileCollisionMask = function (tx, ty) {
        var forcePassable = $gameMap.terrainTag(tx, ty) === forcePassableTerrainTag;
 
        var mcm = $gameMap.collisionMask;
 
        var flags = this.flags;
        var tileIds = $gameMap.layeredTiles(tx, ty);
 
        var impassableSections = [];
        var totalSections = tileSection * tileSection;
 
        for (var tileId, flag, i = 0; i < tileIds.length; i++) {
            tileId = tileIds[i];
 
            if (!Tilemap.isVisibleTile(tileId)) {
                continue;
            }
 
            var tcm = this._tileCollisionMaskCaches[tileId];
            if (tcm) {
                if (!forcePassable) {
                    for (var sx = 0; sx < tileSection; sx++) {
                        for (var sy = 0; sy < tileSection; sy++) {
                            for (var z = 0; z < 8; z++) {
                                var bit = tcm.get(sx, sy, z);
                                if (bit === 1) {
                                    mcm.set(toPixel(tx) + sx, toPixel(ty) + sy, z, bit);
                                    if (z === 0) { // tile collision layer
                                        var sectionId = sy * tileSection + sx;
                                        if (!impassableSections.contains(sectionId)) {
                                            impassableSections.push(sectionId);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (impassableSections.length >= totalSections) {
                        break;
                    } else {
                        continue;
                    }
                }
            } else {
                tcm = new Table3(tileSection, tileSection, 8);
                this._tileCollisionMaskCaches[tileId] = tcm;
            }
 
            flag = flags[tileId];
 
            // other layers of the collision mask
            for (var bp = 5; bp < 9; bp++) { // ladder, bush, counter, damageFloor
                if ((flag & (1 << bp)) !== 0) {
                    for (var sx = 0; sx < tileSection; sx++) {
                        for (var sy = 0; sy < tileSection; sy++) {
                            var z = bp - 4;
                            mcm.set(toPixel(tx) + sx, toPixel(ty) + sy, z, 1);
                            tcm.set(sx, sy, z, 1);
                        }
                    }
                }
            }
            if (!forcePassable) {
                for (var bp = 9; bp < 12; bp++) { // boat, ship, airship
                    if ((flag & (1 << bp)) === 0) {
                        for (var sx = 0; sx < tileSection; sx++) {
                            for (var sy = 0; sy < tileSection; sy++) {
                                var z = bp - 4;
                                mcm.set(toPixel(tx) + sx, toPixel(ty) + sy, z, 1);
                                tcm.set(sx, sy, z, 1);
                            }
                        }
                    }
                }
            }
 
            if (forcePassable) {
                break;
            }
 
            // 0th layer of the collision mask
            if ((flag & 0xf) === 0xf) { // all dirs are not passable
                if (analyzeTilesetBitmap) {
                    if (Tilemap.isAutotile(tileId)) { // TODO: need to check the collision masks for autotiles too
                        for (var sx = 0; sx < tileSection; sx++) {
                            for (var sy = 0; sy < tileSection; sy++) {
                                mcm.set(toPixel(tx) + sx, toPixel(ty) + sy, 0, 1);
                                tcm.set(sx, sy, 0, 1);
                            }
                        }
                        break;
                    } else {
                        var bitmap = this.bitmaps[Tilemap.isTileA5(tileId) ? 4 : 5 + Math.floor(tileId / 256)];
                        var tw = this._tileWidth;
                        var th = this._tileHeight;
                        var sw = $gameMap.tileWidthPx();
                        var sh = $gameMap.tileHeightPx();
                        var bx = (Math.floor(tileId / 128) % 2 * 8 + tileId % 8) * tw;
                        var by = (Math.floor(tileId % 256 / 8) % 16) * th;
                        for (var sx = 0; sx < tileSection; sx++) {
                            for (var sy = 0; sy < tileSection; sy++) {
                                if (bitmap.isOccupied(bx + sx * sw, by + sy * sh, sw, sh, bitmapAnalysisThreshold)) {
                                    mcm.set(toPixel(tx) + sx, toPixel(ty) + sy, 0, 1);
                                    tcm.set(sx, sy, 0, 1);
                                    var sectionId = sy * tileSection + sx;
                                    if (!impassableSections.contains(sectionId)) {
                                        impassableSections.push(sectionId);
                                    }
                                }
                            }
                        }
                        if (impassableSections.length >= totalSections) {
                            break;
                        }
                    }
                } else {
                    for (var sx = 0; sx < tileSection; sx++) {
                        for (var sy = 0; sy < tileSection; sy++) {
                            mcm.set(toPixel(tx) + sx, toPixel(ty) + sy, 0, 1);
                            tcm.set(sx, sy, 0, 1);
                        }
                    }
                    break;
                }
            } else if ((flag & 0xf) !== 0) { // some dirs are passable, but not all
                for (var bp = 0; bp < 4; bp++) {
                    if ((flag & (1 << bp)) !== 0) {
                        switch (bp) {
                            case 0: // down
                                for (var sx = 0; sx < tileSection; sx++) {
                                    mcm.set(toPixel(tx) + sx, toPixel(ty) + tileSection - 1, 0, 1);
                                    tcm.set(sx, tileSection - 1, 0, 1)
                                }
                                break;
                            case 1: // left
                                for (var sy = 0; sy < tileSection; sy++) {
                                    mcm.set(toPixel(tx), toPixel(ty) + sy, 0, 1);
                                    tcm.set(0, sy, 0, 1)
                                }
                                break;
                            case 2: // right
                                for (var sy = 0; sy < tileSection; sy++) {
                                    mcm.set(toPixel(tx) + tileSection - 1, toPixel(ty) + sy, 0, 1);
                                    tcm.set(tileSection - 1, sy, 0, 1)
                                }
                                break;
                            case 3: // up
                                for (var sx = 0; sx < tileSection; sx++) {
                                    mcm.set(toPixel(tx) + sx, toPixel(ty), 0, 1);
                                    tcm.set(sx, 0, 0, 1)
                                }
                                break;
                        }
                    }
                }
            }
        }
    };
 
    Tilemap.prototype.debugDrawCollisionMask = function () {
        var cm = $gameMap.collisionMask;
        var sw = $gameMap.tileWidthPx();
        var sh = $gameMap.tileHeightPx();
        for (var layerIndex = 0; layerIndex < 7; layerIndex++) {
            var sprite = new Sprite(new Bitmap(this._mapWidth * this._tileWidth, this._mapHeight * this._tileHeight));
            sprite.pivot = this.origin;
            sprite.opacity = 80;
            for (var px = 0; px < cm.xSize; px++) {
                for (var py = 0; py < cm.ySize; py++) {
                    if (cm.get(px, py, layerIndex) === 1) {
                        sprite.bitmap.fillRect(px * sw, py * sh, sw, sh, collisionMaskLayerColors[layerIndex]);
                    }
                }
            }
            this.parent.addChild(sprite);
        }
    };
 
    //------------------------------------------------------------
    // Game_Temp
 
    var aliasGameTempPrototypeInitialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function () {
        aliasGameTempPrototypeInitialize.apply(this, arguments);
        this._destinationPx = null;
        this._destinationPy = null;
        this._route = null;
    };
 
    Game_Temp.prototype.isDestinationValid = function () {
        return this._route && this._route.length > 0;
    };
 
    Game_Temp.prototype.setDestination = function (px, py) {
        if (!this._route || px !== this._destinationPx || py !== this._destinationPy) {
            this._destinationPx = px;
            this._destinationPy = py;
            this._route = $gamePlayer.findRouteTo(px, py);
        }
    };
 
    Game_Temp.prototype.clearDestination = function () {
        this._destinationPx = null;
        this._destinationPy = null;
        this._route = null;
    };
 
    Game_Temp.prototype.destinationPx = function () {
        return this._destinationPx;
    };
 
    Game_Temp.prototype.destinationPy = function () {
        return this._destinationPy;
    };
 
    Game_Temp.prototype.nextDirection = function () {
        return this._route ? this._route.pop() : 0;
    };
 
    //------------------------------------------------------------
    // Game_Actor
 
    /* TODO: Only damage characters that are on the damage floor
    Game_Actor.prototype.checkFloorEffect = function () {
        if ($gamePlayer.isOnDamageFloor()) {
            this.executeFloorDamage();
        }
    };
    */
 
    //------------------------------------------------------------
    // Game_Map
 
    Object.defineProperty(Game_Map.prototype, 'collisionMask', {
        get: function () {
            return this._collisionMask;
        },
        set: function (value) {
            this._collisionMask = value;
        },
        configurable: true
    });
 
    Game_Map.prototype.isCollisionMaskSet = function () {
        return this._collisionMask !== null;
    };
 
    var aliasGameMapPrototypeInitialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function () {
        aliasGameMapPrototypeInitialize.apply(this, arguments);
        this._collisionMask = null;
    };
 
    Game_Map.prototype.tileWidthPx = function () {
        return this.tileWidth() / tileSection;
    };
 
    Game_Map.prototype.tileHeightPx = function () {
        return this.tileHeight() / tileSection;
    };
 
    Game_Map.prototype.widthPx = function () {
        return $dataMap.width * tileSection;
    };
 
    Game_Map.prototype.heightPx = function () {
        return $dataMap.height * tileSection;
    };
 
    Game_Map.prototype.adjustPx = function (px) {
        return toPixel(this.adjustX(toTile(px)));
    };
 
    Game_Map.prototype.adjustPy = function (py) {
        return toPixel(this.adjustY(toTile(py)));
    };
 
    Game_Map.prototype.roundPx = function (px) {
        return this.isLoopHorizontal() ? px.mod(this.widthPx()) : px;
    };
 
    Game_Map.prototype.roundPy = function (py) {
        return this.isLoopVertical() ? py.mod(this.heightPx()) : py;
    };
 
    Game_Map.prototype.pxWithDirection = function (px, d) {
        return px + (d === 6 ? 1 : d === 4 ? -1 : 0);
    };
 
    Game_Map.prototype.pyWithDirection = function (py, d) {
        return py + (d === 2 ? 1 : d === 8 ? -1 : 0);
    };
 
    Game_Map.prototype.roundPxWithDirection = function (px, d) {
        return this.roundPx(px + (d === 6 ? 1 : d === 4 ? -1 : 0));
    };
 
    Game_Map.prototype.roundPyWithDirection = function (py, d) {
        return this.roundPy(py + (d === 2 ? 1 : d === 8 ? -1 : 0));
    };
 
    Game_Map.prototype.deltaPx = function (px1, px2) {
        var result = px1 - px2;
        if (this.isLoopHorizontal() && Math.abs(result) > this.widthPx() / 2) {
            result += result < 0 ? this.widthPx() : -this.widthPx();
        }
        return result;
    };
 
    Game_Map.prototype.deltaPy = function (py1, py2) {
        var result = py1 - py2;
        if (this.isLoopVertical() && Math.abs(result) > this.heightPx() / 2) {
            result += result < 0 ? this.heightPx() : -this.heightPx();
        }
        return result;
    };
 
    Game_Map.prototype.distancePx = function (px1, py1, px2, py2) {
        return Math.abs(this.deltaPx(px1, px2)) + Math.abs(this.deltaPy(py1, py2));
    };
 
    Game_Map.prototype.canvasToMapPx = function (x) {
        return this.roundPx(Math.round((this._displayX * this.tileWidth() + x) / $gameMap.tileWidthPx()));
    };
 
    Game_Map.prototype.canvasToMapPy = function (y) {
        return this.roundPy(Math.round((this._displayY * this.tileHeight() + y) / $gameMap.tileHeightPx()));
    };
 
    Game_Map.prototype.collidedEventsPx = function (px, py, cm) {
        return this.events().filter(function (event) {
            return $gameMap.areTwoCollisionMasksCollided(px, py, cm, event.px, event.py, event.collisionMask);
        });
    };
 
    Game_Map.prototype.areTwoCollisionMasksCollided = function (px1, py1, cm1, px2, py2, cm2) {
        var xs1 = cm1.xSize;
        var ys1 = cm1.ySize;
        var xs2 = cm2.xSize;
        var ys2 = cm2.ySize;
        var spx1 = px1 - xs1 / 2;
        var spy1 = py1 - ys1;
        var spx2 = px2 - xs2 / 2;
        var spy2 = py2 - ys2;
        if (spx1 > spx2 + xs2 || spx1 + xs1 < spx2 || spy1 > spy2 + ys2 || spy1 + ys1 < spy2) {
            return false;
        }
        var mpw = this.widthPx();
        var poses1 = [];
        var poses2 = [];
        for (var cmx1 = 0; cmx1 < xs1; cmx1++) {
            for (var cmy1 = 0; cmy1 < ys1; cmy1++) {
                cm1.get(cmx1, cmy1) && poses1.push(this.roundPy(spy1 + cmy1) * mpw + this.roundPx(spx1 + cmx1));
            }
        }
        for (var cmx2 = 0; cmx2 < xs2; cmx2++) {
            for (var cmy2 = 0; cmy2 < ys2; cmy2++) {
                cm2.get(cmx2, cmy2) && poses2.push(this.roundPy(spy2 + cmy2) * mpw + this.roundPx(spx2 + cmx2));
            }
        }
        for (var i = 0; i < poses1.length; i++) {
            for (var j = 0; j < poses2.length; j++) {
                if (poses1[i] === poses2[j]) {
                    return true;
                }
            }
        }
        return false;
    };
 
    Game_Map.prototype.isValidPx = function (px, py) {
        return px > -1 && px < this.widthPx() && py > -1 && py < this.heightPx();
    };
 
    Game_Map.prototype.isPassablePx = function (px, py) {
        return !this._collisionMask.get(px, py, 0);
    };
 
    Game_Map.prototype.isPassableWithCollisionMask = function (px, py, cm) {
        var spx = px - cm.xSize / 2;
        var spy = py - cm.ySize;
        for (var cmx = 0; cmx < cm.xSize; cmx++) {
            for (var cmy = 0; cmy < cm.ySize; cmy++) {
                if (cm.get(cmx, cmy)) {
                    var apx = this.roundPx(spx + cmx);
                    var apy = this.roundPy(spy + cmy);
                    if (!this.isValidPx(apx, apy) || !this.isPassablePx(apx, apy)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
 
    Game_Map.prototype.isBoatPassablePx = function (px, py) {
        return false;
    };
 
    Game_Map.prototype.isShipPassablePx = function (px, py) {
        return false;
    };
 
    Game_Map.prototype.isAirshipLandOkPx = function (px, py) {
        return false;
    };
 
    Game_Map.prototype.isLadderPx = function (px, py) {
        if (!this.isCollisionMaskSet()) {
            return false;
        }
        return this.isValidPx(px, py) && this._collisionMask.get(px, py, 1);
    };
 
    Game_Map.prototype.isBushPx = function (px, py) {
        if (!this.isCollisionMaskSet()) {
            return false;
        }
        return this.isValidPx(px, py) && this._collisionMask.get(px, py, 2);
    };
 
    Game_Map.prototype.isCounterPx = function (px, py) {
        if (!this.isCollisionMaskSet()) {
            return false;
        }
        return this.isValidPx(px, py) && this._collisionMask.get(px, py, 3);
    };
 
    Game_Map.prototype.isDamageFloorPx = function (px, py) {
        if (!this.isCollisionMaskSet()) {
            return false;
        }
        return this.isValidPx(px, py) && this._collisionMask.get(px, py, 4);
    };
 
    //------------------------------------------------------------
    // Game_CharacterBase
 
    Object.defineProperty(Game_CharacterBase.prototype, 'collisionMask', {
        get: function () {
            return this._collisionMask
        },
        set: function (value) {
            this._collisionMask = value
        },
        configurable: true
    });
 
    Object.defineProperty(Game_CharacterBase.prototype, 'px', {
        get: function () {
            return this._px
        },
        configurable: true
    });
 
    Object.defineProperty(Game_CharacterBase.prototype, 'py', {
        get: function () {
            return this._py
        },
        configurable: true
    });
 
    var aliasGameCharacterBasePrototypeInitMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function () {
        aliasGameCharacterBasePrototypeInitMembers.apply(this, arguments);
        this._px = 0;
        this._py = 0;
        this._realPx = 0;
        this._realPy = 0;
        this.createCollisionMask();
    };
 
    Game_CharacterBase.prototype.createCollisionMask = function () { // TODO: Support bitmap analysis and custom collision box
        this._collisionMask = new Table2(tileSection, tileSection);
        var box = characterCollisionBox;
        for (var x = box.x; x < box.x + box.width; x++) {
            for (var y = box.y; y < box.y + box.height; y++) {
                this._collisionMask.set(x, y, 1);
            }
        }
    };
 
    Game_CharacterBase.prototype.synchronizeTileCoordinate = function () {
        this._realX = toTile(this._realPx);
        this._realY = toTile(this._realPy);
        this._x = Math.floor(this._realX);
        this._y = Math.floor(this._realY);
    };
 
    Game_CharacterBase.prototype.isMoving = function () {
        return this._realPx !== this._px || this._realPy !== this._py;
    };
 
    Game_CharacterBase.prototype.canPassPx = function (px, py, d) {
        var npx = $gameMap.roundPxWithDirection(px, d);
        var npy = $gameMap.roundPyWithDirection(py, d);
        if (this.isThrough() || this.isDebugThrough()) {
            return true;
        }
        if (!this.isMapPassablePx(px, py, d)) {
            return false;
        }
        if (this.isCollidedWithCharactersPx(npx, npy)) {
            return false;
        }
        return true;
    };
 
    Game_CharacterBase.prototype.canPassDiagonallyPx = function (px, py, horz, vert) {
        var npx = $gameMap.roundPxWithDirection(px, horz);
        var npy = $gameMap.roundPyWithDirection(py, vert);
        if (this.canPassPx(px, py, vert) && this.canPassPx(px, npy, horz)) {
            return true;
        }
        if (this.canPassPx(px, py, horz) && this.canPassPx(npx, py, vert)) {
            return true;
        }
        return false;
    };
 
    Game_CharacterBase.prototype.isMapPassablePx = function (px, py, d) {
        /*
         var px2 = $gameMap.roundPxWithDirection(px, d);
         var py2 = $gameMap.roundPyWithDirection(py, d);
         return $gameMap.isPassableWithCollisionMask(px, py, this._collisionMask) && $gameMap.isPassableWithCollisionMask(px2, py2, this._collisionMask);
         */
        return $gameMap.isPassableWithCollisionMask($gameMap.roundPxWithDirection(px, d), $gameMap.roundPyWithDirection(py, d), this._collisionMask);
    };
 
    Game_CharacterBase.prototype.isCollidedWithCharactersPx = function (px, py) {
        return this.isCollidedWithEventsPx(px, py) || this.isCollidedWithVehiclesPx(px, py);
    };
 
    Game_CharacterBase.prototype.isCollidedWithEventsPx = function (px, py) {
        var events = $gameMap.events();
        var cm = this._collisionMask;
        var self = this;
        return events.some(function (event) {
            return event !== self && !event.isThrough() && event.isNormalPriority() && $gameMap.areTwoCollisionMasksCollided(px, py, cm, event.px, event.py, event.collisionMask);
        });
    };
 
    Game_CharacterBase.prototype.isCollidedWithVehiclesPx = function (px, py) {
        return false;
    };
 
    Game_CharacterBase.prototype.setPosition = function (tx, ty) {
        this.setPositionPx(toPixel(tx) + tileSection / 2, toPixel(ty) + tileSection);
    };
    Game_CharacterBase.prototype.setPositionPx = function (px, py) {
        this._px = Math.round(px);
        this._py = Math.round(py);
        this._realPx = px;
        this._realPy = py;
        this.synchronizeTileCoordinate();
    };
 
    Game_CharacterBase.prototype.copyPosition = function (character) {
        this._direction = character._direction;
        this._px = character._px;
        this._py = character._py;
        this._realPx = character._realPx;
        this._realPy = character._realPy;
        this.synchronizeTileCoordinate();
    };
 
    Game_CharacterBase.prototype.locate = function (tx, ty) {
        this.locatePx(toPixel(tx) + tileSection / 2, toPixel(ty) + tileSection);
    };
    Game_CharacterBase.prototype.locatePx = function (px, py) {
        this.setPositionPx(px, py);
        this.straighten();
        this.refreshBushDepth();
    };
 
    Game_CharacterBase.prototype.screenX = function () {
        return Math.round(toPixel(this.scrolledX()) * $gameMap.tileWidthPx());
    };
 
    Game_CharacterBase.prototype.screenY = function () {
        return Math.round(toPixel(this.scrolledY()) * $gameMap.tileHeightPx() - this.shiftY() - this.jumpHeight());
    };
 
    Game_CharacterBase.prototype.update = function() {
        this.updateAnimation();
        if (this.isStopping()) {
            this.updateStop();
        }
        if (this.isJumping()) {
            this.updateJump();
        } else if (this.isMoving()) {
            this.updateMove();
        }
    };
 
    Game_CharacterBase.prototype.updateJump = function () {
        this._jumpCount--;
        this._realPx = (this._realPx * this._jumpCount + this._px) / (this._jumpCount + 1.0);
        this._realPy = (this._realPy * this._jumpCount + this._py) / (this._jumpCount + 1.0);
        this.refreshBushDepth();
        if (this._jumpCount === 0) {
            this._realPx = this._px = $gameMap.roundPx(this._px);
            this._realPy = this._py = $gameMap.roundPy(this._py);
        }
        this.synchronizeTileCoordinate();
    };
 
    Game_CharacterBase.prototype.updateMove = function () {
        var dpf = toPixel(this.distancePerFrame());
        if (this._px < this._realPx) {
            this._realPx = Math.max(this._realPx - dpf, this._px);
        }
        if (this._px > this._realPx) {
            this._realPx = Math.min(this._realPx + dpf, this._px);
        }
        if (this._py < this._realPy) {
            this._realPy = Math.max(this._realPy - dpf, this._py);
        }
        if (this._py > this._realPy) {
            this._realPy = Math.min(this._realPy + dpf, this._py);
        }
        this.synchronizeTileCoordinate();
        if (!this.isMoving()) {
            this.refreshBushDepth();
        }
    };
 
    Game_CharacterBase.prototype.isOnLadder = function () {
        var cm = this._collisionMask;
        var xs = cm.xSize;
        var ys = cm.ySize;
        var spx = this._px - xs / 2;
        var spy = this._py - ys;
        for (var cmx = 0; cmx < xs; cmx++) {
            for (var cmy = 0; cmy < ys; cmy++) {
                if ($gameMap.isLadderPx(spx + cmx, spy + cmy)) {
                    return true;
                }
            }
        }
        return false;
    };
 
    Game_CharacterBase.prototype.isOnBush = function () {
        var cm = this._collisionMask;
        var xs = cm.xSize;
        var ys = cm.ySize;
        var spx = this._px - xs / 2;
        var spy = this._py - ys;
        for (var cmx = 0; cmx < xs; cmx++) {
            for (var cmy = 0; cmy < ys; cmy++) {
                if (!$gameMap.isBushPx(spx + cmx, spy + cmy)) {
                    return false;
                }
            }
        }
        return true;
    };
 
    Game_CharacterBase.prototype.isOnDamageFloor = function () {
        var cm = this._collisionMask;
        var xs = cm.xSize;
        var ys = cm.ySize;
        var spx = this._px - xs / 2;
        var spy = this._py - ys;
        for (var cmx = 0; cmx < xs; cmx++) {
            for (var cmy = 0; cmy < ys; cmy++) {
                if ($gameMap.isDamageFloorPx(spx + cmx, spy + cmy)) {
                    return true;
                }
            }
        }
        return false;
    };
 
    Game_CharacterBase.prototype.isFacingCounter = function () {
        var cm = this._collisionMask;
        var direction = this.direction();
        var npx = $gameMap.roundPxWithDirection(this._px, direction);
        var npy = $gameMap.roundPyWithDirection(this._py, direction);
        var xs = cm.xSize;
        var ys = cm.ySize;
        var spx = npx - xs / 2;
        var spy = npy - ys;
        for (var cmx = 0; cmx < xs; cmx++) {
            for (var cmy = 0; cmy < ys; cmy++) {
                if ($gameMap.isCounterPx(spx + cmx, spy + cmy)) {
                    return true;
                }
            }
        }
        return false;
    };
 
    Game_CharacterBase.prototype.checkEventTriggerTouchFrontPx = function (d) {
        this.checkEventTriggerTouchPx($gameMap.roundPxWithDirection(this._px, d), $gameMap.roundPyWithDirection(this._py, d));
    };
 
    Game_CharacterBase.prototype.checkEventTriggerTouchPx = function (px, py) {
        return false;
    };
 
    Game_CharacterBase.prototype.moveStraight = function (d) {
        this.setMovementSuccess(this.canPassPx(this._px, this._py, d));
        if (this.isMovementSucceeded()) {
            this.setDirection(d);
            this._px = $gameMap.roundPxWithDirection(this._px, d);
            this._py = $gameMap.roundPyWithDirection(this._py, d);
            this._realPx = $gameMap.pxWithDirection(this._px, this.reverseDir(d));
            this._realPy = $gameMap.pyWithDirection(this._py, this.reverseDir(d));
            this.increaseSteps();
        } else {
            this.setDirection(d);
            this.checkEventTriggerTouchFrontPx(d);
        }
    };
 
    Game_CharacterBase.prototype.moveDiagonally = function (horz, vert) {
        this.setMovementSuccess(this.canPassDiagonallyPx(this._px, this._py, horz, vert));
        if (this.isMovementSucceeded()) {
            this._px = $gameMap.roundPxWithDirection(this._px, horz);
            this._py = $gameMap.roundPyWithDirection(this._py, vert);
            this._realPx = $gameMap.pxWithDirection(this._px, this.reverseDir(horz));
            this._realPy = $gameMap.pyWithDirection(this._py, this.reverseDir(vert));
            this.increaseSteps();
        }
        if (this._direction === this.reverseDir(horz)) this.setDirection(horz);
        if (this._direction === this.reverseDir(vert)) this.setDirection(vert);
    };
 
    Game_CharacterBase.prototype.moveDir8 = function (d) {
        switch (d) {
            case 2:
            case 4:
            case 6:
            case 8:
                this.moveStraight(d);
                break;
            case 1:
                this.moveDiagonally(4, 2);
                break;
            case 3:
                this.moveDiagonally(6, 2);
                break;
            case 7:
                this.moveDiagonally(4, 8);
                break;
            case 9:
                this.moveDiagonally(6, 8);
                break;
        }
    };
 
    Game_CharacterBase.prototype.jump = function (xPlus, yPlus) {
        if (Math.abs(xPlus) > Math.abs(yPlus)) {
            if (xPlus !== 0) {
                this.setDirection(xPlus < 0 ? 4 : 6);
            }
        } else {
            if (yPlus !== 0) {
                this.setDirection(yPlus < 0 ? 8 : 2);
            }
        }
        this._px += toPixel(xPlus);
        this._py += toPixel(yPlus);
        var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
        this._jumpPeak = 10 + distance - this._moveSpeed;
        this._jumpCount = this._jumpPeak * 2;
        this.resetStopCount();
        this.straighten();
    };
 
    //------------------------------------------------------------
    // Game_Character
    Game_Character.prototype.deltaPxFrom = function (px) {
        return $gameMap.deltaPx(this._px, px);
    };
 
    Game_Character.prototype.deltaPyFrom = function (py) {
        return $gameMap.deltaPy(this._py, py);
    };
 
    Game_Character.prototype.moveRandom = function () {
        var d = 2 + Math.randomInt(4) * 2;
        if (this.canPassPx(this.px, this.py, d)) {
            this.moveStraight(d);
        }
    };
 
    Game_Character.prototype.moveTowardCharacter = function (character) {
        var dpx = this.deltaPxFrom(character.px);
        var dpy = this.deltaPyFrom(character.py);
        if (Math.abs(dpx) > Math.abs(dpy)) {
            this.moveStraight(dpx > 0 ? 4 : 6);
            if (!this.isMovementSucceeded() && dpy !== 0) {
                this.moveStraight(dpy > 0 ? 8 : 2);
            }
        } else if (dpy !== 0) {
            this.moveStraight(dpy > 0 ? 8 : 2);
            if (!this.isMovementSucceeded() && dpx !== 0) {
                this.moveStraight(dpx > 0 ? 4 : 6);
            }
        }
    };
 
    Game_Character.prototype.moveAwayFromCharacter = function (character) {
        var dpx = this.deltaPxFrom(character.px);
        var dpy = this.deltaPyFrom(character.py);
        if (Math.abs(dpx) > Math.abs(dpy)) {
            this.moveStraight(dpx > 0 ? 6 : 4);
            if (!this.isMovementSucceeded() && dpy !== 0) {
                this.moveStraight(dpy > 0 ? 2 : 8);
            }
        } else if (dpy !== 0) {
            this.moveStraight(dpy > 0 ? 2 : 8);
            if (!this.isMovementSucceeded() && dpx !== 0) {
                this.moveStraight(dpx > 0 ? 6 : 4);
            }
        }
    };
 
    Game_Character.prototype.turnTowardCharacter = function (character) {
        var dpx = this.deltaPxFrom(character.px);
        var dpy = this.deltaPyFrom(character.py);
        if (Math.abs(dpx) > Math.abs(dpy)) {
            this.setDirection(dpx > 0 ? 4 : 6);
        } else if (dpy !== 0) {
            this.setDirection(dpy > 0 ? 8 : 2);
        }
    };
 
    Game_Character.prototype.turnAwayFromCharacter = function (character) {
        var dpx = this.deltaPxFrom(character.px);
        var dpy = this.deltaPyFrom(character.py);
        if (Math.abs(dpx) > Math.abs(dpy)) {
            this.setDirection(dpx > 0 ? 6 : 4);
        } else if (dpy !== 0) {
            this.setDirection(dpy > 0 ? 2 : 8);
        }
    };
 
    Game_Character.prototype.findRouteTo = function (goalPx, goalPy) {
        var searchLimit = toPixel(Math.max($gameMap.screenTileX(), $gameMap.screenTileY()));
 
        var px = this._px;
        var py = this._py;
 
        if (px === goalPx && py === goalPy) {
            return [];
        }
 
        var makeNode = function (parent, px, py, gScore, fScore, direction) {
            return {
                parent: parent,
                px: px,
                py: py,
                gScore: gScore,
                fScore: fScore,
                direction: direction
            };
        };
        var makeId = function (px, py) {
            return py * $gameMap.widthPx() + px;
        };
        var estimateCost = function (px1, py1, px2, py2) {
            return $gameMap.distancePx(px1, py1, px2, py2);
        };
 
        var reconstructPath = function (node) {
            var current = node;
            var path = [current.direction];
            while (current.parent !== start) {
                current = current.parent;
                path.push(current.direction);
            }
            return path;
        };
 
        var start = makeNode(null, px, py, 0, estimateCost(px, py, goalPx, goalPy), 0);
 
        var openSet = [start];
        var closedSet = [];
 
        var reserveSet = []; // used when failed
 
        while (openSet.length > 0) {
            var current = openSet[0];
            var currentIndex = 0;
 
            for (var i = 1; i < openSet.length; i++) {
                if (openSet[i].fScore < current.fScore) {
                    current = openSet[i];
                    currentIndex = i;
                }
            }
 
            if (current.px === goalPx && current.py === goalPy) {
                return reconstructPath(current);
            }
 
            openSet.splice(currentIndex, 1);
            closedSet.push(makeId(current.px, current.py));
 
            reserveSet.push(current);
 
            if (current.gScore > searchLimit) {
                continue;
            }
 
            for (var direction = 2; direction <= 8; direction += 2) {
                var npx = $gameMap.roundPxWithDirection(current.px, direction);
                var npy = $gameMap.roundPyWithDirection(current.py, direction);
 
                if (closedSet.indexOf(makeId(npx, npy)) > -1) {
                    continue;
                }
 
                if (!this.canPassPx(current.px, current.py, direction)) {
                    closedSet.push(makeId(npx, npy));
                    continue;
                }
 
                var tentativeGScore = current.gScore + 1;
 
                var nodeFound = null;
                for (var i = 0; i < openSet.length; i++) {
                    var node = openSet[i];
                    if (node.px === npx && node.py === npy) {
                        nodeFound = node;
                    }
                }
 
                if (!nodeFound || tentativeGScore < nodeFound.gScore) {
                    var neighbor;
                    if (!nodeFound) {
                        neighbor = {
                            px: npx,
                            py: npy
                        };
                        openSet.push(neighbor);
                    } else {
                        neighbor = nodeFound;
                    }
 
                    neighbor.parent = current;
                    neighbor.gScore = tentativeGScore;
                    neighbor.fScore = tentativeGScore + estimateCost(npx, npy, goalPx, goalPy);
                    neighbor.direction = direction;
                }
            }
        }
 
        // when failed
        var closest = reserveSet[0];
        for (var i = 1; i < reserveSet.length; i++) {
            var current = reserveSet[i];
            if (current.fScore - current.gScore < closest.fScore - closest.gScore) {
                closest = current;
            }
        }
 
        var goalDirection;
        var dpx = $gameMap.deltaPx(closest.px, goalPx);
        var dpy = $gameMap.deltaPy(closest.py, goalPy);
        if (Math.abs(dpx) > Math.abs(dpy)) {
            goalDirection = dpx > 0 ? 4 : 6;
        } else if (dpy !== 0) {
            goalDirection = dpy > 0 ? 8 : 2;
        }
 
        if (closest === start) {
            return [goalDirection];
        } else {
            var path = reconstructPath(closest);
            path.unshift(goalDirection);
            return path;
        }
    };
 
    //------------------------------------------------------------
    // Game_Player
 
    Game_Player.prototype.moveByInput = function () {
        if (!this.isMoving() && this.canMove()) {
            var direction = this.getInputDirection();
            if (direction > 0) {
                $gameTemp.clearDestination();
            } else if ($gameTemp.isDestinationValid()) {
                direction = $gameTemp.nextDirection();
            }
            if (direction > 0) {
                this.executeMove(direction);
                if (!this.isMovementSucceeded()) {
                    switch (direction) {
                        case 2:
                            this.executeMove(1);
                            if (!this.isMovementSucceeded()) {
                                this.executeMove(3)
                            }
                            break;
                        case 4:
                            this.executeMove(1);
                            if (!this.isMovementSucceeded()) {
                                this.executeMove(7)
                            }
                            break;
                        case 6:
                            this.executeMove(3);
                            if (!this.isMovementSucceeded()) {
                                this.executeMove(9)
                            }
                            break;
                        case 8:
                            this.executeMove(7);
                            if (!this.isMovementSucceeded()) {
                                this.executeMove(9)
                            }
                            break;
                    }
                }
            }
        }
    };
 
    Game_Player.prototype.getInputDirection = function () {
        return Input.dir8;
    };
 
    Game_Player.prototype.executeMove = function (direction) {
        this.moveDir8(direction);
    };
 
    Game_Player.prototype.updateNonmoving = function (wasMoving) {
        if (!$gameMap.isEventRunning()) {
            if (wasMoving) {
                $gameParty.onPlayerWalk();
                this.checkEventTriggerHere([1, 2]);
                if ($gameMap.setupStartingEvent()) {
                    return;
                }
            }
            if (this.triggerAction()) {
                return;
            }
            if (wasMoving) {
                this.updateEncounterCount();
            } else if (!$gameTemp.isDestinationValid()) {
                $gameTemp.clearDestination();
            }
        }
    };
 
    Game_Player.prototype.triggerTouchAction = function () {
        return false;
    };
 
    Game_Player.prototype.checkEventTriggerHere = function (triggers) {
        if (this.canStartLocalEvents()) {
            this.startCollidedEventsPx(this._px, this._py, triggers, false);
        }
    };
 
    Game_Player.prototype.checkEventTriggerThere = function (triggers) { // front, literally
        if (this.canStartLocalEvents()) {
            var direction = this.direction();
            var npx = $gameMap.roundPxWithDirection(this._px, direction);
            var npy = $gameMap.roundPyWithDirection(this._py, direction);
            this.startCollidedEventsPx(npx, npy, triggers, true);
            if (!$gameMap.isEventRunning() && this.isFacingCounter()) {
                if (direction === 2 || direction === 8) {
                    this.startCollidedEventsPx(npx, npy + (direction === 2 ? tileSection : -tileSection), triggers, true);
                } else if (direction === 4 || direction === 6) {
                    this.startCollidedEventsPx(npx + (direction === 4 ? -tileSection : tileSection), npy, triggers, true);
                }
            }
        }
    };
 
    Game_Player.prototype.checkEventTriggerTouchPx = function (px, py) {
        if (this.canStartLocalEvents()) {
            this.startCollidedEventsPx(px, py, [1, 2], true);
        }
    };
 
    Game_Player.prototype.startCollidedEventsPx = function (px, py, triggers, normal) {
        if (!$gameMap.isEventRunning()) {
            $gameMap.collidedEventsPx(px, py, this._collisionMask).forEach(function (event) {
                if (event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
                    event.start();
                }
            });
        }
    };
 
    Game_Player.prototype.isOnDamageFloor = function () {
        var cm = this._collisionMask;
        var xs = cm.xSize;
        var ys = cm.ySize;
        var spx = this._px - xs / 2;
        var spy = this._py - ys;
        for (var cmx = 0; cmx < xs; cmx++) {
            for (var cmy = 0; cmy < ys; cmy++) {
                if ($gameMap.isDamageFloorPx(spx + cmx, spy + cmy)) {
                    return true;
                }
            }
        }
        return false;
    };
 
    Game_Player.prototype.moveStraight = function (d) {
        Game_Character.prototype.moveStraight.call(this, d);
        if (this.isMovementSucceeded()) {
            this._followers.updateMove();
        }
    };
 
    Game_Player.prototype.moveDiagonally = function (horz, vert) {
        Game_Character.prototype.moveDiagonally.call(this, horz, vert);
        if (this.isMovementSucceeded()) {
            this._followers.updateMove();
        }
    };
 
    //------------------------------------------------------------
    // Game_Follower
 
    Game_Follower.prototype.canPassPx = function (px, py, d) {
        /*
         if (this.isThrough() || this.isDebugThrough()) {
         return true;
         }
         */
        if (!this.isMapPassablePx(px, py, d)) {
            return false;
        }
        if (this.isCollidedWithCharactersPx($gameMap.roundPxWithDirection(px, d), $gameMap.roundPyWithDirection(py, d))) {
            return false;
        }
        return true;
    };
 
    Game_Follower.prototype.chaseCharacter = function (character) {
        var dpx = this.deltaPxFrom(character.px);
        var dpy = this.deltaPyFrom(character.py);
        dpx = Math.abs(dpx) > followerDistance ? dpx : 0;
        dpy = Math.abs(dpy) > followerDistance ? dpy : 0;
        if (dpx !== 0 || dpy !== 0) {
            if (dpx !== 0 && dpy !== 0) {
                this.moveDiagonally(dpx > 0 ? 4 : 6, dpy > 0 ? 8 : 2);
            } else if (dpx !== 0) {
                this.moveStraight(dpx > 0 ? 4 : 6);
            } else if (dpy !== 0) {
                this.moveStraight(dpy > 0 ? 8 : 2);
            }
            if (!this.isMovementSucceeded()) {
                this.moveDir8(this.findChaseDirection(character));
            }
            this.setMoveSpeed($gamePlayer.realMoveSpeed());
        }
    };
 
    Game_Follower.prototype.findChaseDirection = function (character) {
        var nodes = [];
 
        var px = this._px;
        var py = this._py;
 
        var makeNode = function (px, py, gScore, fScore, direction) {
            return {
                px: px,
                py: py,
                g: gScore,
                f: fScore,
                direction: direction
            };
        };
 
        for (var direction = 1; direction <= 9; direction++) {
            if (direction === 5) {
                continue;
            }
            var npx = px;
            var npy = py;
            switch (direction) {
                case 2:
                case 4:
                case 6:
                case 8:
                    npx = $gameMap.roundPxWithDirection(npx, direction);
                    npy = $gameMap.roundPyWithDirection(npy, direction);
                    break;
                case 1:
                    npx--;
                    npy++;
                    break;
                case 3:
                    npx++;
                    npy++;
                    break;
                case 7:
                    npx--;
                    npy--;
                    break;
                case 9:
                    npx++;
                    npy--;
                    break;
            }
            if (direction % 2 === 0) {
                if (!this.canPassPx(px, py, direction)) {
                    continue;
                }
            } else {
                if (!this.canPassDiagonallyPx(px, py, npx - px > 0 ? 6 : 4, npy - py > 0 ? 2 : 8)) {
                    continue;
                }
            }
            nodes.push(makeNode(npx, npy, 1, 1 + $gameMap.distancePx(npx, npy, character.px, character.py), direction));
        }
 
        if (nodes.length < 1) {
            return 0;
        }
 
        var best = nodes[0];
        for (var i = 1; i < nodes.length; i++) {
            var current = nodes[i];
            if (current.f < best.f) {
                best = current;
            }
        }
        return best.direction;
    };
 
    //-----------------------------------------------------------------------------
    // Game_Followers
 
    Game_Followers.prototype.jumpAll = function () {
        if ($gamePlayer.isJumping()) {
            for (var i = 0; i < this._data.length; i++) {
                var follower = this._data[i];
                var sx = toTile($gamePlayer.deltaPxFrom(follower.px));
                var sy = toTile($gamePlayer.deltaPyFrom(follower.py));
                follower.jump(sx, sy);
            }
        }
    };
 
    /*
     Game_Followers.prototype.isSomeoneCollided = function(x, y) {
     return this.visibleFollowers().some(function(follower) {
     return follower.pos(x, y);
     }, this);
     };
     */
 
    //-----------------------------------------------------------------------------
    // Game_Vehicle
 
    // TODO: Support vehicles
 
    //-----------------------------------------------------------------------------
    // Sprite_Character
 
    var aliasSpriteCharacterPrototypeSetCharacter = Sprite_Character.prototype.setCharacter;
    Sprite_Character.prototype.setCharacter = function () {
        aliasSpriteCharacterPrototypeSetCharacter.apply(this, arguments);
        if (drawCollisionMask && this._character) {
            this.debugDrawCollisionMask();
        }
    };
 
    Sprite_Character.prototype.debugDrawCollisionMask = function () {
        var sprite = new Sprite(new Bitmap($gameMap.tileWidth(), $gameMap.tileHeight()));
        sprite.anchor = this.anchor;
        sprite.opacity = 80;
        var cm = this._character.collisionMask;
        var sw = $gameMap.tileWidthPx();
        var sh = $gameMap.tileHeightPx();
        for (var sx = 0; sx < cm.xSize; sx++) {
            for (var sy = 0; sy < cm.ySize; sy++) {
                if (cm.get(sx, sy)) {
                    sprite.bitmap.fillRect(sx * sw, sy * sh, sw, sh, this._character.isThrough() || !this._character.isNormalPriority() ? 'green' : 'red');
                }
            }
        }
        this.addChild(sprite);
    };
 
    //------------------------------------------------------------
    // Sprite_Destination
 
    Sprite_Destination.prototype.updatePosition = function () {
        var dpx = $gameTemp.destinationPx();
        var dpy = $gameTemp.destinationPy();
        this.x = $gameMap.adjustX(toTile(dpx)) * tileSection * $gameMap.tileWidthPx();
        this.y = ($gameMap.adjustY(toTile(dpy)) * tileSection - 1) * $gameMap.tileHeightPx();
    };
 
    //------------------------------------------------------------
    // Scene_Map
    Scene_Map.prototype.processMapTouch = function () {
        if (TouchInput.isTriggered()) {
            $gameTemp.setDestination($gameMap.canvasToMapPx(TouchInput.x), $gameMap.canvasToMapPy(TouchInput.y));
        }
    };
 
    var aliasSceneMapPrototypeUpdate = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        if ($gameMap.isCollisionMaskSet()) {
            aliasSceneMapPrototypeUpdate.apply(this, arguments);
        } else {
            Scene_Base.prototype.update.call(this);
        }
    };
})();
\