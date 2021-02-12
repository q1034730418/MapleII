/*:
* @plugindesc 随机物品基本程序
* @author MaRcoLi Revise by Fanzi
*
* @param 浮窗背景
* @parent ---浮窗---
* @dir img/pictures/
* @type file
* @desc 浮动窗口背景图头名字，不同品质加 ID 后缀区分
* @default float_Title
*
* @param 浮窗停留
* @parent ---浮窗---
* @type number
* @min 0
* @desc 浮动窗口停留时长(单位帧)
* @default 600
*
* @param 参数命名
* @desc 给追加能力值自定义名字(用英文逗号隔开)
* @default 命中率,闪避率,暴击率,暴击闪避,魔法闪避,生命回复,魔法回复
*
* @help
=================================帮助文件======================================
*/
var Mac_BaseFun = Mac_BaseFun || {};
Mac_BaseFun.Parameters = PluginManager.parameters('Mac_BaseFun');
Mac_BaseFun.Param = Mac_BaseFun.Param || {};

Mac_BaseFun.Param.Bgd = String(Mac_BaseFun.Parameters['浮窗背景']);
Mac_BaseFun.Param.LayTime = parseInt(Mac_BaseFun.Parameters['浮窗停留'] || 0);
Mac_BaseFun.AddParam = Mac_BaseFun.Parameters['参数命名'].split(',');
//==============随机范围整数=============
function Mac_RandomNum(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range);
    return num;
};
//==============随机范围 2位小数=============
function Mac_RandomDec(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var dec = Rand * Range;
    var num = Math.round((Min + dec) * 100) / 100;
    return num;
};
//==============数组名字排序=========
function Mac_compare(property) {
    return function(a,b) {
        var aa = a[property];
        var bb = b[property];
        if (aa < bb) return -1;
        if (aa > bb) return 1;
        return 0;
    }
};
//==============判定基础装备==========
Game_Actor.prototype.isBaseEquipped = function(item) {
    var state = false;
    this.equips().forEach(function(equip) {
        if (!equip || !equip.baseItemId) {
        } else {
            console.log(equip.etypeId, item.etypeId, equip.baseItemId, item.id);
            if (((!item.etypeId && !equip.etypeId) || (item.etypeId == equip.etypeId)) && equip.baseItemId == item.id)
                state = true;
        }
    });
    return this.equips().contains(item) || state;
};
//==================黑色=================
Window_Base.prototype.Color15 = function() {
    return this.textColor(15);
};
function Mac_WinHelp() {
    this.initialize.apply(this, arguments);
};
function Mac_itemWindow() {
    this.initialize.apply(this, arguments);
};
function Mac_floatWin() {
    this.initialize.apply(this, arguments);
};
//===========================HelpWindow=================

Mac_WinHelp.prototype = Object.create(Window_Base.prototype);
Mac_WinHelp.prototype.constructor = Mac_WinHelp;

Mac_WinHelp.prototype.initialize = function(x, y, width, numLines) {
    var height = this.fittingHeight(numLines || 2);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._text = '';
};

Mac_WinHelp.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Mac_WinHelp.prototype.clear = function() {
    this.setText('');
};

Mac_WinHelp.prototype.setItem = function(item) {
    this.setText(item ? item.description : '');
};

Mac_WinHelp.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(this._text, this.textPadding(), 0);
};
//===========================物品基本Window==========================

Mac_itemWindow.prototype = Object.create(Window_ItemList.prototype);
Mac_itemWindow.prototype.constructor = Mac_itemWindow;

Mac_itemWindow.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._data = [];
};

//================物品栏间隔=======================
Mac_itemWindow.prototype.spacing = function() {
    return 1;
};

Mac_itemWindow.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};
Mac_itemWindow.prototype.setFloatWin = function(floatwin) {
    this._floatwin = floatwin;
};
Mac_itemWindow.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Mac_itemWindow.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//======================物品绘制=================================

Mac_itemWindow.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
//        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width );
        if (!EqManager.isIndependent(item)) {
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
        }
        this.changePaintOpacity(1);
    }
};

Mac_itemWindow.prototype.drawItemNumber = function(item, x, y, width) {
    if (this.needsNumber()) {
        this.drawText(':', x, y, width - this.textWidth('00'), 'right');
        this.drawText($gameParty.numItems(item), x, y, width, 'right');
    }
};

Mac_itemWindow.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.ItemColor(item);
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        this.resetTextColor();
    }
};

Mac_itemWindow.prototype.ItemColor = function(item) {
    if (DataManager.isItem(item)) return;
    var quality = item._quality;
    if (quality === 'Unique') this.changeTextColor(this.textColor(14));
    else if (quality === 'Rare') this.changeTextColor(this.textColor(30));
    else if (quality === 'Rumor') this.changeTextColor(this.textColor(1));
    else if (quality === 'Superior') this.changeTextColor(this.textColor(3));
    else this.changeTextColor(this.textColor(0));
};

Mac_itemWindow.prototype.drawActorHp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.makeFontSmaller();
    this.drawText(TextManager.hpA, x, y, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width, this.hpColor(actor), this.normalColor());
    this.makeFontBigger();
};

Mac_itemWindow.prototype.drawActorMp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
    this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.makeFontSmaller();
    this.drawText(TextManager.mpA, x, y, 44);
    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width, this.mpColor(actor), this.normalColor());
    this.makeFontBigger();
};

Mac_itemWindow.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
    if (this._actor && this._statusWindow) {
        var actor = JsonEx.makeDeepCopy(this._actor);
        actor.forceChangeEquip(this._slotId, this.item());
        this._statusWindow.setTempActor(actor);
    }
    if (this.active && this.isEquipItem(this.item())) {
        this._floatwin.setEqItem(this.item());
    } else {
        this._floatwin.setEqItem(null);
    }
    this.updateShopHelp();
};

Mac_itemWindow.prototype.updateShopHelp = function() {
    if (this._shop ===true && this.isEquipItem(this.item()) ) {
        var actorarry = [];
        var num = $gameParty.allMembers().length;
        for ( var i=0; i<num; i++) {
            var actor = $gameParty.allMembers()[i];
            var tempactor = JsonEx.makeDeepCopy(actor);
            var enabled = actor.canEquip(this.item());
            if (enabled) {
                tempactor.forceChangeEquip(this.item().etypeId-1, this.item());
                actorarry.push(tempactor);
            } else {
                actorarry.push(actor);
            }
        }
        if (this._statusWindow) {
            this._statusWindow.setItem(this.item());
            this._statusWindow.setTempActor(actorarry);
        }
    } else if (this.active && this._statusWindow && this._shop === true) {
        this._statusWindow.setItem(null);
        this._statusWindow.setTempActor(null);
    }
};
Mac_itemWindow.prototype.isEquipItem = function(item) {
    return DataManager.isWeapon(item) || DataManager.isArmor(item);
};

Mac_itemWindow.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//=================================================

Mac_floatWin.prototype = Object.create(Mac_itemWindow.prototype);
Mac_floatWin.prototype.constructor = Mac_floatWin;

Mac_floatWin.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Mac_itemWindow.prototype.initialize.call(this, 0, 0, width, height);
    this.active = false;
    this.timer=0;
    this.showwin=false;
    this.setTitlepic();
    this.hide();
    this.setFloatRect();
};

Mac_floatWin.prototype.windowWidth = function() {
    return 300;
};

Mac_floatWin.prototype.windowHeight = function() {
    return 640;
};

Mac_floatWin.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};
Mac_floatWin.prototype.setHideOnetime = function(a, b) {
    this._slotwin = a;
    this._slotwincmd = b;
};
Mac_floatWin.prototype.setTitlepic = function() {
    this.opacity=0;
    this.contentsOpacity = 0;
    this._title = new Sprite();
    this._title.x=18;
    this._title.y=18;
    this._title.opacity=0;
};
Mac_floatWin.prototype.setEqItem = function(item) {
    this.Eqitem = item;
    if (!this.Eqitem) {this.hide(); return;}
    else if (this.Eqitem._randomItem) {this.hide(); return;}
    this.contentsOpacity = Mac_BaseFun.Param.LayTime > 0 ? 180 : 0;
    this._title.opacity = Mac_BaseFun.Param.LayTime > 0 ? 180 : 0;
    this.winopen = false;
    this.refresh();
};
Mac_floatWin.prototype.setActor = function(actor) {
    if (this._actor !== actor) this._actor = actor;
};
Mac_floatWin.prototype.setFloatRect = function() {
    this.rect = new Rectangle();
    this.rect.y = 34;
    this.rect.width =160;
    // this.rect.opacity=50;
};
Mac_floatWin.prototype.refresh = function() {
    this.contents.clear();
    this.showwin=true;
    this.timer=0;
    this.show();
    this.drawFloatRect();
};

Mac_floatWin.prototype.setwinplace = function() {
    var itmindex = this._itemWindow._index;
    var itemRect = this._itemWindow.itemRect(itmindex);
    if (this._slotwin) this._itemWindow.x +=40;
    if (this._slotwincmd) {this.hide(); this._slotwincmd=false;}
    this.x = this._itemWindow.x +itemRect.x+60;
    this.y = this._itemWindow.y +itemRect.y +36;
    if (this.y+this.rect.height+18+34 > Graphics.boxHeight)
        this.y = Math.max(this._itemWindow.y +itemRect.y - (this.rect.height+250), 0);
};

Mac_floatWin.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.Color15();
    this.contents.paintOpacity =240;
    this.contents.fillRect(dx, dy, dw, dh, color);
    this.changePaintOpacity(true);
};
Mac_floatWin.prototype.drawFloatRect = function() {
    this.makeParamList();
    this.makeEquipCusList();
    var Eqlength = this._param.length;
    Eqlength += this._equipcus.length;
    Eqlength += this._cuseffect.length;
    if (Imported.YEP_X_ItemUpgrades) {
        var num = this.Eqitem.upgradeSlots + this.Eqitem.slotsApplied.length;
        if (this.Eqitem.upgradeSlots > 0 || this.Eqitem.slotsApplied.length > 0) Eqlength += 1;
        if (this.Eqitem.slotsApplied.length > 0 && num <= 5) Eqlength += this.Eqitem.slotsApplied.length;
    }
    if (Imported.YEP_X_AttachAugments) {
        ItemManager.checkAugmentSlots(this.Eqitem);
        Eqlength += this.Eqitem.augmentSlotItems ? this.Eqitem.augmentSlotItems.length : 0;
    }
    var height=20;
    this.rect.height = 30 + Eqlength * height;
    this.setwinplace();
    this.selectTitlepic();
    this.drawDarkRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    this.makeFontSmaller();
    this.drawItemName(this.Eqitem, 0, 0, this.rect.width);
    this.darwitemRank();
    if (Eqlength) {
        var midnum = this._param.length + this._equipcus.length + this._cuseffect.length;
        for (var i = 0; i < Eqlength; i++) {
            if (i < this._param.length) {
                var text = this._param[i].type > 0 ? Mac_BaseFun.AddParam[this._param[i].id] : TextManager.param(this._param[i].id);
                this.changeTextColor(this.mpGaugeColor1());
                this.drawText(text + ' ', 0, 30 + height*(i + 1), 100, 'right');
            } else if (i < this._param.length + this._equipcus.length) {
            } else if (i < midnum) {
                var text = this._cuseffect[i - this._param.length - this._equipcus.length].info;
                var state = this._cuseffect[i - this._param.length - this._equipcus.length].state;
                if (state) this.changeTextColor(this.textColor(24));
                else this.changeTextColor(this.textColor(7));
                this.drawText(text, 0, 30 + height*(i + 1), 160, 'center');
            } else if (Imported.YEP_X_ItemUpgrades) {
                var num = this.Eqitem.upgradeSlots + this.Eqitem.slotsApplied.length;
                if ((this.Eqitem.upgradeSlots > 0 || this.Eqitem.slotsApplied.length > 0) && i == midnum) {
                    var text = Yanfly.Param.IUSSlotsText + this.Eqitem.upgradeSlots + '/' + num;
                    this.drawText(text, 0, 30 + height*(i + 1), 160, 'center');
                }
                if (this.Eqitem.slotsApplied.length > 0 && num <= 5 && i <= midnum + this.Eqitem.slotsApplied.length) {
                    var text = this.Eqitem.slotsApplied[i - midnum - 1];
                    this.drawTextItem(text, 0, 30 + height*(i + 1));
                }
            }
            this.resetTextColor();
            if (i < this._param.length)
                this.drawText('+' + this._param[i].value, 100, 30+height*(i+1), this.rect.width - 100);
            else if (i < this._param.length + this._equipcus.length) {
                this.drawEquipCus(this._equipcus[i - this._param.length], 0, 30+height*(i+1));
            } else if (i < midnum) {
            } else if (!Imported.YEP_X_ItemUpgrades || i > midnum) {
                var num = Imported.YEP_X_ItemUpgrades ? this.Eqitem.upgradeSlots + this.Eqitem.slotsApplied.length || 0 : 0;
                if (num == 0) this.drawSmallItem(this.Eqitem.augmentSlotItems[i - midnum], 0, 30+height*(i+1));
                else if (num <= 5 && i > midnum + this.Eqitem.slotsApplied.length) {
                    var count = this.Eqitem.slotsApplied ? this.Eqitem.slotsApplied.length + 1 : 1;
                    this.drawSmallItem(this.Eqitem.augmentSlotItems[i - midnum - count], 0, 30+height*(i+1));
                } else if (num > 5 && i > midnum + 1) {
                    var count = (this.Eqitem.upgradeSlots > 0 || this.Eqitem.slotsApplied.length > 0) ? 1 : 0;
                    this.drawSmallItem(this.Eqitem.augmentSlotItems[i - midnum - count], 0, 30+height*(i+1));
                }
            }
        }
    }
    this.makeFontBigger();
    this.resetTextColor();
};
Mac_floatWin.prototype.makeParamList = function() {
    this._param = [];
    if (this.Eqitem) {
        for (var i = 0; i < 8; i++) {
            if (this.Eqitem.params[i] > 0) {
                var obj = {}; obj.type = 0; obj.id = i; obj.value = this.Eqitem.params[i]; this._param.push(obj);
            }
        }
        this.Eqitem.traits.forEach(function(param) {
            if (param.code == 22 && param.value != 0) {
                var obj = {};
                if (param.dataId > 6) {
                    obj.type = 1;
                    obj.id = param.dataId - 2;
                    obj.value = Math.round(param.value * 1000);
                    this._param.push(obj);
                } else {
                    obj.type = 1;
                    obj.id = param.dataId;
                    obj.value = Math.floor(param.value * 100);
                    this._param.push(obj);
                }
            }
        }, this);
    }
};
Mac_floatWin.prototype.makeEquipCusList = function() {
    this._equipcus = [];
    this._cuseffect = [];
    if (this.Eqitem) {
        if (this.Eqitem.cusequipneed) {
            var cusnum = this.Eqitem.cusequipneed.length;
            if (cusnum > 0) this._equipcus.push(this.Eqitem._cusquip2[cusnum]);
            this.Eqitem.cusequipneed.forEach(function(equip) {
                this._equipcus.push(equip);
            }, this);
        }
        if (this.Eqitem._cusquip2) {
            this.Eqitem._cusquip2.forEach(function(equip) {
                if (equip._itemId > 0) {
                    if (equip._dataClass == 'weapon') var item = $dataWeapons[equip._itemId];
                    else if (equip._dataClass == 'armor') var item = $dataArmors[equip._itemId];
                    else var item = $dataItems[equip._itemId];
                    var obj = {};
                    obj.info = item.description;
                    obj.state = this._actor ? this._actor.isEquipped(item) : false;
                    this._cuseffect.push(obj);
                }
            }, this);
        }
    }
};
Mac_floatWin.prototype.darwitemRank = function() {
    if (this.Eqitem._quality === 'Unique') {
        this.changeTextColor(this.textColor(14));
        this.drawText('史诗', 0, 30, 100,'center');
    } else if (this.Eqitem._quality === 'Rare') {
        this.changeTextColor(this.textColor(30));
        this.drawText('稀有', 0, 30, 100,'center');
    } else if (this.Eqitem._quality === 'Rumor') {
        this.changeTextColor(this.textColor(1));
        this.drawText('传说', 0, 30, 100,'center');
    } else if (this.Eqitem._quality === 'Superior') {
        this.changeTextColor(this.textColor(3));
        this.drawText('精良', 0, 30, 100,'center');
    } else this.drawText('普通', 0, 30, 100,'center');
    if (this.Eqitem._rank == 3) {
        this.changeTextColor(this.textColor(10));
        this.drawText('极品', 60, 30, this.rect.width - 60,'center');
    } else if (this.Eqitem._rank == 2) {
        this.changeTextColor(this.textColor(20));
        this.drawText('精华', 60, 30, this.rect.width - 60,'center');
    } else if (this.Eqitem._rank == 1) {
        this.changeTextColor(this.textColor(27));
        this.drawText('优秀', 60, 30, this.rect.width - 60,'center');
    } else {
        this.changeTextColor(this.textColor(8));
        this.drawText('一般', 60, 30, this.rect.width - 60,'center');
    }
};
Mac_floatWin.prototype.drawItemName = function(item, x, y, width) {
    if (item) {
        this.ItemColor(item);
        this.contents.fontSize = 16;
        this.drawText(item.name, x , y, width, 'center');
        this.resetTextColor();
    }
};
Mac_floatWin.prototype.drawTextItem = function(text, x, y) {
    if (text) {
        var value = text.split(']');
        var iconIndex = value[0].replace(/[^0-9]/ig,"");
        this.drawSmallIcon(iconIndex, x + 30, y + 10);
        this.drawText(value[1], x + 52, y, 208 - x);
    }
};
Mac_floatWin.prototype.drawSmallItem = function(info, x, y) {
    if (info == 'none') {
        var index = Yanfly.Param.AugmentRemoveText.replace(/[^0-9]/ig,"");
        this.drawSmallIcon(index, x + 30, y + 10);
        this.drawText(Yanfly.Param.AugmentNoneText, x + 52, y, 208 - x);
    } else {
        var value = info.split(' ');
        if (value[0] == 'item') var item = $dataItems[parseInt(value[1])];
        else if (value[0] == 'armor') var item = $dataArmors[parseInt(value[1])];
        else var item = $dataWeapons[parseInt(value[1])];
        if (item) {
            this.ItemColor(item);
            this.drawSmallIcon(item.iconIndex, x + 30, y + 10);
            this.drawText(item.name, x + 52, y, 208 - x);
            this.resetTextColor();
        }
    }
};
Mac_floatWin.prototype.drawEquipCus = function(equip, x, y) {
    if (equip) {
        if (equip._dataClass == 'weapon') var item = $dataWeapons[equip._itemId];
        else if (equip._dataClass == 'armor') var item = $dataArmors[equip._itemId];
        else var item = $dataItems[equip._itemId];
        this.drawSmallIcon(item.iconIndex, x + 30, y + 10);
        if ((this._actor && this._actor.isBaseEquipped(item)) || item.meta.ISCUSEQUIP) this.changeTextColor(this.textColor(24));
        else this.changeTextColor(this.textColor(7));
        this.drawText(item.name, x + 52, y, 208 - x);
    }
};
Mac_floatWin.prototype.drawSmallIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, 20, 20);
};
Mac_floatWin.prototype.update = function() {
    if (this.showwin && Mac_BaseFun.Param.LayTime > 0) {
        this.timer++;
        if (this.contentsOpacity < 255 && this.winopen == false ) {
            this.contentsOpacity += 4;
            this._title.opacity += 4;
        } else {this.winopen = true;};
        if (this.timer > Mac_BaseFun.Param.LayTime) {
            if (this.contentsOpacity > 0) {
                this.contentsOpacity -= 12;
                this._title.opacity -= 12;
            } else {
                this.hide();
                this.timer=0;
                this.showwin=false;
            }
        }
    }
};

Mac_floatWin.prototype.selectTitlepic = function() {
    var picfile='';
    var quality=this.Eqitem._quality;
    if (this.Eqitem) {
        if (quality === 'Unique') {
            picfile = Mac_BaseFun.Param.Bgd + '4';
        } else if (quality === 'Rare') {
            picfile = Mac_BaseFun.Param.Bgd + '3';
        } else if (quality === 'Rumor') {
            picfile = Mac_BaseFun.Param.Bgd + '2';
        } else if (quality === 'Superior') {
            picfile = Mac_BaseFun.Param.Bgd + '1';
        } else {
            picfile = Mac_BaseFun.Param.Bgd + '0';
        }
        this._title.bitmap = ImageManager.loadPicture(picfile);
        this.addChildAt(this._title,1);
    }
};