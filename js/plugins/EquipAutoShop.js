/*:
* @plugindesc 装备整合配套批量贩售
* @author 江湖梦网 Fanzi
*
* @param 窗口宽高
* @parent ----窗口----
* @desc 界面窗口尺寸，用英文逗号隔开
* @default 816,624
*
* @param 窗口透明度
* @parent ----窗口----
* @type number
* @min 0
* @desc 界面窗口透明度，配合背景图美化界面
* @default 255
*
* @param 背景图片
* @parent ----窗口----
* @dir img/pictures/
* @type file
* @desc 界面背景图片文件名，留空无背景
* @default bgd
*
* @param 列表表头
* @parent ----窗口----
* @dir img/pictures/
* @type file
* @desc 装备列表的表头栏目图片
* @default list1
*
* @param 用Mac浮窗
* @parent ---窗口---
* @type boolean
* @on 用
* @off 不用
* @desc 是否使用Mac浮动窗口？不用 - false，用 - true
* @default false
*

* @param 兑换游戏币
* @parent ----数据----
* @type boolean

* @on 批量贩售
* @off 捐献兑换
* @desc 功能选择：true - 批量贩售，false - 捐献兑换
* @default false
*
* @param 兑换变量一
* @parent ----数据----
* @type number
* @min 0
* @desc 设置捐献装备所兑换的变量 ID
* @default 1
*
* @param 变量一汇率
* @parent ----数据----
* @type number
* @min 0
* @max 100
* @desc 设定百分比，捐献按商店价格比例兑换
* @default 1
*
* @param 变量一称谓
* @parent ----数据----
* @desc 变量一在游戏里面的用途称谓
* @default 威望
*
* @param 兑换变量二
* @parent ----数据----
* @type number
* @min 0
* @desc 设置捐献装备所兑换的变量 ID，留空不启用
* @default 2
*
* @param 变量二汇率
* @parent ----数据----
* @type number
* @min 0
* @max 100
* @desc 设定百分比，捐献按商店价格比例兑换
* @default 1
*
* @param 变量二称谓
* @parent ----数据----
* @desc 变量一在游戏里面的用途称谓，留空不启用
* @default 贡献
*
* @help
*=============================帮助文件===========================
* 本插件为MAC随机属性装备插件的配套插件，用于将白色独立装备批量出售，
* 可设置返回游戏币或者变量值(可以作为第二货币、贡献等，支持两个变量)。
*
* 进入界面的脚本指令：SceneManager.push(Scene_AutoShop);
*/

var EquipAutoShop = EquipAutoShop || {};
EquipAutoShop.WindowXY = PluginManager.parameters('EquipAutoShop')["窗口宽高"].split(",");
EquipAutoShop.Opacity = parseInt(PluginManager.parameters('EquipAutoShop')["窗口透明度"]);
EquipAutoShop.WindowBgd = String(PluginManager.parameters('EquipAutoShop')["背景图片"]);
EquipAutoShop.ListHead = String(PluginManager.parameters('EquipAutoShop')["列表表头"]);
EquipAutoShop.FloatWin = PluginManager.parameters('EquipAutoShop')['用Mac浮窗'].toLowerCase() == 'true';
EquipAutoShop.GameGold = PluginManager.parameters('EquipAutoShop')['兑换游戏币'].toLowerCase() == 'true';
EquipAutoShop.Prestige = parseInt(PluginManager.parameters('EquipAutoShop')["兑换变量一"]);
EquipAutoShop.FirstWord = String(PluginManager.parameters('EquipAutoShop')["变量一称谓"]);
EquipAutoShop.FirstRate = String(PluginManager.parameters('EquipAutoShop')["变量一汇率"]);
EquipAutoShop.Reputation = parseInt(PluginManager.parameters('EquipAutoShop')["兑换变量二"]);
EquipAutoShop.SecondWord = String(PluginManager.parameters('EquipAutoShop')["变量二称谓"]);
EquipAutoShop.SecondRate = String(PluginManager.parameters('EquipAutoShop')["变量二汇率"]);
EquipAutoShop.Width = parseInt(EquipAutoShop.WindowXY[0]);
EquipAutoShop.Height = parseInt(EquipAutoShop.WindowXY[1]);

function Scene_AutoShop() {
    this.initialize.apply(this, arguments);
};

Scene_AutoShop.prototype = Object.create(Scene_MenuBase.prototype);
Scene_AutoShop.prototype.constructor = Scene_AutoShop;

Scene_AutoShop.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this._goods = [];
    this._item = null;
    this._total = 0;
};

Scene_AutoShop.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createReturnWindow();
    this.createItemWindow();
    this.createArmorsWindow();
    this.createWeaponsWindow();
    if (EquipAutoShop.FloatWin) this.createFloatwin();
    this.createBgp();
    if (EquipAutoShop.FloatWin) this.setwin();
};

Scene_AutoShop.prototype.createReturnWindow = function() {
    var wx = (Graphics.boxWidth + EquipAutoShop.Width) / 2 - 240;
    var wy = (Graphics.boxHeight + EquipAutoShop.Height) / 2 - 144;
    this._returnWindow = new Window_AutoCmd(wx, wy);
    this._returnWindow.y += 200;
    this._returnWindow.opacity = EquipAutoShop.Opacity;
    this._returnWindow.setHandler('ok',  this.commandSell.bind(this));
    this._returnWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._returnWindow);
};

Scene_AutoShop.prototype.createItemWindow = function() {
    var wx = (Graphics.boxWidth - EquipAutoShop.Width) / 2;
    var wy = (Graphics.boxHeight + EquipAutoShop.Height) / 2 - 144;
    var ww = EquipAutoShop.Width - this._returnWindow.width;
    this._itemWindow = new Window_AutoShop(wx, wy, ww);
    this._itemWindow.y += 200;
    this._itemWindow.opacity = EquipAutoShop.Opacity;
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this.addWindow(this._itemWindow);
};

Scene_AutoShop.prototype.createArmorsWindow = function() {
    var wx = (Graphics.boxWidth - EquipAutoShop.Width) / 2;
    var wy = (Graphics.boxHeight - EquipAutoShop.Height) / 2;
    var ww = EquipAutoShop.Width / 2;
    var wh = EquipAutoShop.Height - this._itemWindow.height;
    this._armorsWindow = new Window_AutoEquip(wx, wy, ww, wh);
    this._armorsWindow.x -= 500;
    this._armorsWindow.opacity = EquipAutoShop.Opacity;
    this._armorsWindow.setHandler('ok',     this.onArmorsOk.bind(this));
    this._armorsWindow.setCategory('armor');
    this.addWindow(this._armorsWindow);
};

Scene_AutoShop.prototype.createWeaponsWindow = function() {
    var wx = Graphics.boxWidth / 2;
    var wy = (Graphics.boxHeight - EquipAutoShop.Height) / 2;
    var ww = EquipAutoShop.Width / 2;
    var wh = EquipAutoShop.Height - this._itemWindow.height;
    this._weaponsWindow = new Window_AutoEquip(wx, wy, ww, wh);
    this._weaponsWindow.x += 500;
    this._weaponsWindow.opacity = EquipAutoShop.Opacity;
    this._weaponsWindow.setHandler('ok',     this.onWeaponsOk.bind(this));
    this._weaponsWindow.setCategory('weapon');
    this.addWindow(this._weaponsWindow);
};

Scene_AutoShop.prototype.createFloatwin = function() {
    this._floatwin = new Mac_floatWin();
    this.addChildAt(this._floatwin, 2);
};

Scene_AutoShop.prototype.createBgp = function(){
    if (EquipAutoShop.WindowBgd) {
        this._MenuBgp = new Sprite();
        this._MenuBgp.bitmap = ImageManager.loadPicture(EquipAutoShop.WindowBgd);
        this.addChildAt(this._MenuBgp,1);
    }
};

Scene_AutoShop.prototype.setwin = function() {
    this._armorsWindow.setFloatWin(this._floatwin);
    this._weaponsWindow.setFloatWin(this._floatwin);
    this._itemWindow.setFloatWin(this._floatwin);
    this._floatwin.setItemWindow(this._armorsWindow);
};

Scene_AutoShop.prototype.onArmorsOk = function() {    
    this._item = this._armorsWindow.item();
    this._total += this._item.price;
    this._item.mark = true;
    this._goods.push(this._item);
    this._itemWindow.setGoods(this._goods);
    this._returnWindow.refresh(this._total);
    this._armorsWindow.refresh();
    this._armorsWindow.activate();
    if (EquipAutoShop.FloatWin) this._floatwin.hide();
};

Scene_AutoShop.prototype.onWeaponsOk = function() {
    this._item = this._weaponsWindow.item();
    this._total += this._item.price;
    this._item.mark = true;
    this._goods.push(this._item);
    this._itemWindow.setGoods(this._goods);
    this._returnWindow.refresh(this._total);
    this._weaponsWindow.refresh();
    this._weaponsWindow.activate();
    if (EquipAutoShop.FloatWin) this._floatwin.hide();
};

Scene_AutoShop.prototype.onItemOk = function() {
    var index = this._itemWindow._index;
    this._total -= this._item.price;
    if (index < 0) return;
    else if (index >= this._goods.length) return;
    else this._goods.splice(index, 1);
    this._item = this._itemWindow.item();
    this._item.mark = null;
    if (DataManager.isArmor(this._item)) this._armorsWindow.refresh();
    else this._weaponsWindow.refresh();
    this._itemWindow.setGoods(this._goods);
    this._returnWindow.refresh(this._total);
    this._itemWindow.refresh();
    this._itemWindow.activate();
    if (EquipAutoShop.FloatWin) this._floatwin.hide();
};

Scene_AutoShop.prototype.commandSell = function() {
    this.doSell();
    this._total = 0;
    this._goods = [];
    this._itemWindow.setGoods(this._goods);
    this._weaponsWindow.refresh();
    this._armorsWindow.refresh();
    this._returnWindow.refresh();
    this._returnWindow.activate();
};

Scene_AutoShop.prototype.popScene = function() {
    if (this._goods) this._goods.forEach(function(goods) {goods.mark = null;}, this);
    Scene_MenuBase.prototype.popScene.call(this);
};

Scene_AutoShop.prototype.doSell = function(number) {
    if (EquipAutoShop.GameGold) $gameParty.gainGold(Math.ceil(this._total / 2));
    else {
        if (EquipAutoShop.Prestige) {
            var num1 = Math.ceil(this._total * EquipAutoShop.FirstRate / 100);
            num1 += $gameVariables.value(EquipAutoShop.Prestige);
            $gameVariables.setValue(EquipAutoShop.Prestige, num1);
        }
        if (EquipAutoShop.Reputation) {
            var num2 = Math.ceil(this._total * EquipAutoShop.SecondRate / 100);
            num2 += $gameVariables.value(EquipAutoShop.Reputation);
            $gameVariables.setValue(EquipAutoShop.Reputation, num2);
        }
    }
    if (this._goods) this._goods.forEach(function(goods) {
        $gameParty.loseItem(goods, 1);
        if (!EquipAutoShop.FloatWin || !EqManager.isIndependent(goods)) return;
        EqManager.deleteIndependentItem(goods);
    }, this);
};

Scene_AutoShop.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this.updatePesition();
    this.updateActivate();
};

Scene_AutoShop.prototype.updatePesition = function() {
    var wy = (Graphics.boxHeight + EquipAutoShop.Height) / 2 - this._itemWindow.height;
    if (this._armorsWindow.x != (Graphics.boxWidth - EquipAutoShop.Width) / 2) {
        if (this._armorsWindow.x >= (Graphics.boxWidth - EquipAutoShop.Width) / 2) {
            this._armorsWindow.x = (Graphics.boxWidth - EquipAutoShop.Width) / 2;
        } else {
            this._armorsWindow.x += 15;
        }
    }
    if (this._weaponsWindow.x != Graphics.boxWidth / 2) {
        if (this._weaponsWindow.x <= Graphics.boxWidth / 2) {
            this._weaponsWindow.x = Graphics.boxWidth / 2;
        } else {
            this._weaponsWindow.x -= 15;
        }
    }
    if (this._itemWindow.y != wy) {
        if (this._itemWindow.y <= wy) {
            this._itemWindow.y = wy;
        } else {
            this._itemWindow.y -= 9;
        }
    }
    if (this._returnWindow.y != wy) {
        if (this._returnWindow.y <= wy) {
            this._returnWindow.y = wy;
        } else {
            this._returnWindow.y -= 9;
        }
    }
};

Scene_AutoShop.prototype.updateActivate = function() {
    if (TouchInput.isTriggered()) {
        var x = TouchInput.x;
        var y = TouchInput.y;
        var wx = (Graphics.boxWidth + EquipAutoShop.Width) / 2;
        var wy = (Graphics.boxHeight + EquipAutoShop.Height) / 2;
        if (x > this._armorsWindow.x && x < Graphics.boxWidth / 2 && y > this._armorsWindow.y && y < this._itemWindow.y) {
            if (this._armorsWindow.active) return;
            SoundManager.playCursor();
            this.activateArmorsWin();
        } else if (x > Graphics.boxWidth / 2 && x < wx && y > this._weaponsWindow.y && y < this._itemWindow.y) {
            if (this._weaponsWindow.active) return;
            SoundManager.playCursor();
            this.activateWeaponsWin();
        } else if (x > this._itemWindow.x && x < this._returnWindow.x && y > this._itemWindow.y && y < wy) {
            if (this._itemWindow.active) return;
            SoundManager.playCursor();
            this.activateItemWin();
        } else if (x > this._returnWindow.x && x < wx && y > this._returnWindow.y && y < wy) {
            if (this._returnWindow.active) return;
            SoundManager.playCursor();
            this.activateReturnWin();
        }
    }
};

Scene_AutoShop.prototype.activateArmorsWin = function() {
    if (EquipAutoShop.FloatWin) this._floatwin.setItemWindow(this._armorsWindow);
    this._armorsWindow.activate();
    this._armorsWindow.select(0);
    this._weaponsWindow.deactivate();
    this._weaponsWindow.deselect();
    this._itemWindow.deactivate();
    this._itemWindow.deselect();
    this._returnWindow.deactivate();
    this._returnWindow.deselect();
};

Scene_AutoShop.prototype.activateWeaponsWin = function() {
    this._armorsWindow.deactivate();
    this._armorsWindow.deselect();
    if (EquipAutoShop.FloatWin) this._floatwin.setItemWindow(this._weaponsWindow);
    this._weaponsWindow.activate();
    this._weaponsWindow.select(0);
    this._itemWindow.deactivate();
    this._itemWindow.deselect();
    this._returnWindow.deactivate();
    this._returnWindow.deselect();
};

Scene_AutoShop.prototype.activateItemWin = function() {
    this._armorsWindow.deactivate();
    this._armorsWindow.deselect();
    this._weaponsWindow.deactivate();
    this._weaponsWindow.deselect();
    if (EquipAutoShop.FloatWin) this._floatwin.setItemWindow(this._itemWindow);
    this._itemWindow.activate();
    this._itemWindow.select(0);
    this._returnWindow.deactivate();
    this._returnWindow.deselect();
};

Scene_AutoShop.prototype.activateReturnWin = function() {
    this._armorsWindow.deactivate();
    this._armorsWindow.deselect();
    this._weaponsWindow.deactivate();
    this._weaponsWindow.deselect();
    this._itemWindow.deactivate();
    this._itemWindow.deselect();
    this._returnWindow.activate();
    this._returnWindow.select(0);
    if (EquipAutoShop.FloatWin) this._floatwin.hide();
};

//==========================================================
function Window_AutoCmd() {
    this.initialize.apply(this, arguments);
}

Window_AutoCmd.prototype = Object.create(Window_HorzCommand.prototype);
Window_AutoCmd.prototype.constructor = Window_AutoCmd;

Window_AutoCmd.prototype.initialize = function(x, y) {
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this.select(-1);
    this.deactivate();
};

Window_AutoCmd.prototype.windowHeight = function() {
    if (EquipAutoShop.GameGold) return this.fittingHeight(3);
    else {
        if (EquipAutoShop.FirstWord && EquipAutoShop.SecondWord) return this.fittingHeight(4);
        else  return this.fittingHeight(3);
    }
};

Window_AutoCmd.prototype.maxCols = function() {
    return 1;
};

Window_AutoCmd.prototype.itemRect = function(index) {
    var rect = Window_Selectable.prototype.itemRect.call(this, index);
    if (EquipAutoShop.GameGold) rect.y += this.lineHeight() * 2;
    else {
        if (EquipAutoShop.FirstWord && EquipAutoShop.SecondWord) rect.y += this.lineHeight() * 3;
        else  rect.y += this.lineHeight() * 2;
    }
    return rect;
};

Window_AutoCmd.prototype.makeCommandList = function() {
    this.addCommand("确定", 'ok');
};

Window_AutoCmd.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};

Window_AutoCmd.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};

Window_AutoCmd.prototype.refresh = function(value) {
    this.contents.clear();
    Window_HorzCommand.prototype.refresh.call(this);
    var text = EquipAutoShop.GameGold ? '贩售结算：' : '捐献结算：';
    var num = value ? value : 0;
    this.changeTextColor(this.systemColor());
    this.drawText(text, 0, 0, this.contents.width, 'center');
    if (EquipAutoShop.GameGold) this.drawText(TextManager.currencyUnit, 120, 36, this.contents.width - 120);
    else {
        if (EquipAutoShop.FirstWord) this.drawText(EquipAutoShop.FirstWord, 120, 36, this.contents.width - 120);
        if (EquipAutoShop.SecondWord) this.drawText(EquipAutoShop.SecondWord, 120, 72, this.contents.width - 120);
    }
    this.resetTextColor();
    if (EquipAutoShop.GameGold)  this.drawText(Math.ceil(num / 2), 10, 36, 100, 'right');
    else {
        if (EquipAutoShop.Prestige) this.drawText(Math.ceil(num * EquipAutoShop.FirstRate / 100), 10, 36, 100, 'right');
        if (EquipAutoShop.Reputation) this.drawText(Math.ceil(num * EquipAutoShop.SecondRate / 100), 10, 72, 100, 'right');
    }
};

//====================================================
function Window_AutoShop() {
    this.initialize.apply(this, arguments);
}

if (EquipAutoShop.FloatWin)
    Window_AutoShop.prototype = Object.create(Mac_itemWindow.prototype);
else Window_AutoShop.prototype = Object.create(Window_ItemList.prototype);
Window_AutoShop.prototype.constructor = Window_AutoShop;

Window_AutoShop.prototype.initialize = function(x, y, width) {
    var height = this.windowHeight();
    if (EquipAutoShop.FloatWin) Mac_itemWindow.prototype.initialize.call(this, x, y, width, height);
    else Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this._shopGoods = null;
    this.refresh();
    this.select(-1);
};

Window_AutoShop.prototype.windowHeight = function() {
    if (EquipAutoShop.GameGold) return this.fittingHeight(3);
    else {
        if (EquipAutoShop.FirstWord && EquipAutoShop.SecondWord) return this.fittingHeight(4);
        else  return this.fittingHeight(3);
    }
};

Window_AutoShop.prototype.maxCols = function() {
    return 3;
};

Window_AutoShop.prototype.setGoods = function(shopGoods) {
    this._shopGoods = shopGoods;
    this.refresh();
};

Window_AutoShop.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_AutoShop.prototype.isEnabled = function(item) {
    return !!item;
};

Window_AutoShop.prototype.makeItemList = function() {
    this._data = [];
    if (this._shopGoods)
        this._shopGoods.forEach(function(goods) {this._data.push(goods);}, this);
};

Window_AutoShop.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (EquipAutoShop.FloatWin && EqManager.isIndependent(item)) EqManager.setDisparams(item, item);
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.drawItemName(item, rect.x, rect.y, rect.width);
};

Window_AutoShop.prototype.callUpdateHelp = function() {
    if (this.active) this.updateHelp();
};
if (EquipAutoShop.FloatWin) {
Window_AutoShop.prototype.updateHelp = function() {
    if (this.active && this.isEquipItem(this.item())) {
        this._floatwin.setEqItem(this.item());
    } else {
        this._floatwin.setEqItem(null);
    }
};
}
//====================================================
function Window_AutoEquip() {
    this.initialize.apply(this, arguments);
}

if (EquipAutoShop.FloatWin)
    Window_AutoEquip.prototype = Object.create(Mac_itemWindow.prototype);
else Window_AutoEquip.prototype = Object.create(Window_ItemList.prototype);
Window_AutoEquip.prototype.constructor = Window_AutoEquip;

Window_AutoEquip.prototype.initialize = function(x, y, width, height) {
    if (EquipAutoShop.FloatWin) Mac_itemWindow.prototype.initialize.call(this, x, y, width, height);
    else Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this._line = new Sprite();
    this.createline();
};

Window_AutoEquip.prototype.maxCols = function() {
    return 1;
};

Window_AutoEquip.prototype.isEnabled = function(item) {
    return item && !item.mark;
};

Window_AutoEquip.prototype.drawItem = function(index) {
    var item = this._data[index];
    var price1 = Math.ceil(item.price * EquipAutoShop.FirstRate / 100);
    var price2 = Math.ceil(item.price * EquipAutoShop.SecondRate / 100);
    var rect = this.itemRect(index);
    var priceWidth = 96;
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
    if (EquipAutoShop.GameGold) this.drawText(item.price / 2, rect.x + rect.width - priceWidth, rect.y, 80, 'right');
    else {
        if (EquipAutoShop.Prestige) this.drawText(price2, rect.x + rect.width - priceWidth, rect.y, 60, 'right');
        if (EquipAutoShop.Reputation) this.drawText(price1, -50+rect.x + rect.width - priceWidth, rect.y, 40, 'right');
    }
    this.changePaintOpacity(true);
};

Window_AutoEquip.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = (Math.floor(index / maxCols) + 1) * rect.height - this._scrollY;
    return rect;
};

Window_AutoEquip.prototype.createline = function() {
    if (EquipAutoShop.ListHead) {
        this._line.bitmap=ImageManager.loadPicture(EquipAutoShop.ListHead);
        this._line.y=10;
        this.addChildAt(this._line, 1);
    }
};

Window_AutoEquip.prototype.callUpdateHelp = function() {
    if (this.active) this.updateHelp();
};
if (EquipAutoShop.FloatWin) {
Window_AutoEquip.prototype.updateHelp = function() {
    if (this.active && this.isEquipItem(this.item())) {
        this._floatwin.setEqItem(this.item());
    } else {
        this._floatwin.setEqItem(null);
    }
};
}