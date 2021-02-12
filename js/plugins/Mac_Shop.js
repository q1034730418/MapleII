/*:
* @plugindesc 装备整合配套商店系统
* @author MaRcoLi Revise by Fanzi
*
* @param 窗口宽高
* @parent ----总项----
* @desc 界面窗口尺寸，用英文逗号隔开
* @default 816,624
*
* @param 窗口透明度
* @parent ----总项----
* @type number
* @min 0
* @desc 界面窗口透明度，配合背景图美化界面
* @default 255
*
* @param 背景图片
* @parent ----总项----
* @dir img/pictures/
* @type file
* @desc 界面背景图片文件名，留空无背景
* @default bgd
*
* @param 列表分栏
* @parent ----总项----
* @dir img/pictures/
* @type file
* @desc 物品列表的表头栏目图片
* @default list
*
* @param 输数背景
* @parent ----总项----
* @dir img/pictures/
* @type file
* @desc 买卖输入数量背景图片
* @default numbgd
*
* @param 输数按钮
* @parent ----总项----
* @dir img/pictures/
* @type file
* @desc 买卖输入数量按钮图片
* @default numbtn
*
* @help
*==============================帮助文件===========================
*/

var Mac_Shop = Mac_Shop || {};
Mac_Shop.WindowXY = PluginManager.parameters('Mac_Shop')["窗口宽高"].split(",");
Mac_Shop.Opacity = parseInt(PluginManager.parameters('Mac_Shop')["窗口透明度"]);
Mac_Shop.WindowBgd = String(PluginManager.parameters('Mac_Shop')["背景图片"]);
Mac_Shop.TableList = String(PluginManager.parameters('Mac_Shop')["列表分栏"]);
Mac_Shop.NumBgd = String(PluginManager.parameters('Mac_Shop')["输数背景"]);
Mac_Shop.NumBtn = String(PluginManager.parameters('Mac_Shop')["输数按钮"]);
Mac_Shop.Width = parseInt(Mac_Shop.WindowXY[0]);
Mac_Shop.Height = parseInt(Mac_Shop.WindowXY[1]);

function Scene_Shop() {
    this.initialize.apply(this, arguments);
};

Scene_Shop.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Shop.prototype.constructor = Scene_Shop;

Scene_Shop.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
    this._goods = goods;
    this._purchaseOnly = purchaseOnly;
    this._item = null;
    this._total = 0;
};

Scene_Shop.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createGoldWindow();
    this.createHelpWindow();
    this.createCommandWindow();
    this.createCategoryWindow();
    this.createBuyWindow();
    this.createSellWindow();
    this.createNumberWindow();
    this.createGoldBuy();
    this.createFloatwin();
    this.MenuBgp();
    this.setwin();
};

Scene_Shop.prototype.createGoldWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Shop.Width) / 2;
    var wy = (Graphics.boxHeight - Mac_Shop.Height) / 2;
    this._goldWindow = new Window_Gold(wx, wy);
    this._goldWindow.y = -200;
    this._goldWindow.opacity = Mac_Shop.Opacity;
    this.addWindow(this._goldWindow);
};

Scene_Shop.prototype.createHelpWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Shop.Width) / 2 + 240;
    var wy = (Graphics.boxHeight - Mac_Shop.Height) / 2;
    var ww = Mac_Shop.Width - 480;
    this._helpWindow = new Mac_WinHelp(wx, wy, ww, 1);
    this._helpWindow.y = -200;
    this._helpWindow.opacity = Mac_Shop.Opacity;
    this.addWindow(this._helpWindow);
};

Scene_Shop.prototype.createGoldBuy = function() {
    var wx = (Graphics.boxWidth + Mac_Shop.Width) / 2 - 240;
    var wy = (Graphics.boxHeight - Mac_Shop.Height) / 2;
    this._GoldBuy = new Mac_GoldBuy(wx, wy);
    this._GoldBuy.y = -200;
    this._GoldBuy.opacity = Mac_Shop.Opacity;
    this.addWindow(this._GoldBuy);
};

Scene_Shop.prototype.createCommandWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Shop.Width) / 2;
    var wy = (Graphics.boxHeight - Mac_Shop.Height) / 2 + this._goldWindow.height;
    this._commandWindow = new Mac_ShopCommand(wx, wy, this._purchaseOnly);
    this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
    this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandWindow.y = 518;
    this._commandWindow.opacity = Mac_Shop.Opacity;
    this.addWindow(this._commandWindow);
};

Scene_Shop.prototype.createNumberWindow = function() {
    this._numberWindow = new Mac_ShopNumber(0, 0);
    this._numberWindow.hide();
    this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
    this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
    this.addChild(this._numberWindow);
};

Scene_Shop.prototype.createBuyWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Shop.Width) / 2;
    var wy = (Graphics.boxHeight - Mac_Shop.Height) / 2 + this._goldWindow.height +80;
    var wh = this._commandWindow.height - 80;
    this._buyWindow = new Mac_ShopBuy(wx, wy, wh, this._goods);
    this._buyWindow.deselect();
    this._buyWindow.setHandler('ok',     this.onBuyOk.bind(this));
    this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
    this._buyWindow.opacity = 0;
    this._buyWindow.hide();
    this.addChild(this._buyWindow);
    this._buyWindow.setMoney(this.money());
};

Scene_Shop.prototype.createSellWindow = function() {
    var wx = Graphics.boxWidth / 2;
    var wy = (Graphics.boxHeight - Mac_Shop.Height) / 2 + this._goldWindow.height + 80;
    var ww = this._buyWindow.width;
    var wh = this._buyWindow.height;
    this._sellWindow = new Mac_ShopSell(wx, wy, ww, wh);
    this._sellWindow.setHandler('ok',     this.onSellOk.bind(this));
    this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
    this._sellWindow.opacity = 0;
    this._sellWindow.hide();
    this.addChild(this._sellWindow);
};

Scene_Shop.prototype.createCategoryWindow = function(){
    var wx = Graphics.boxWidth / 2;
    var wy = (Graphics.boxHeight - Mac_Shop.Height) / 2 + this._goldWindow.height;
    var wh = Mac_Shop.Height - this._goldWindow.height;
    this._itemCmdwin = new Mac_ItemCmdWin(wx, wy, wh);
    this._itemCmdwin.setHandler('ok',     this.onItemCmdOK.bind(this));
    this._itemCmdwin.setHandler('cancel', this.onItemCmdCancel.bind(this));
    this._itemCmdwin.y = 518;
    this._itemCmdwin.opacity = Mac_Shop.Opacity;
    this.addWindow(this._itemCmdwin);
};

Scene_Shop.prototype.createFloatwin = function() {  
    this._floatwin = new Mac_floatWin();
    this.addChild(this._floatwin);
}
Scene_Shop.prototype.setwin = function() {
    this._itemCmdwin.setItemWindow(this._sellWindow);
    this._sellWindow.setHelpWindow(this._helpWindow);
    this._sellWindow.setFloatWin(this._floatwin);
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setFloatWin(this._floatwin);
    this._floatwin.setItemWindow(this._buyWindow); 
};

Scene_Shop.prototype.activateBuyWindow = function() {
    this._buyWindow.setMoney(this.money());
    this._floatwin.setItemWindow(this._buyWindow);
    this._buyWindow.activate();
};

Scene_Shop.prototype.activateSellWindow = function() {
    this._sellWindow.refresh();
    this._sellWindow.activate();
};

Scene_Shop.prototype.commandBuy = function() {
    this.activateBuyWindow();
    this._itemCmdwin.refresh();
    this._buyWindow.select(0);
};

Scene_Shop.prototype.commandSell = function() {
    this._itemCmdwin.refresh(this._commandWindow.currentSymbol());
    this._sellWindow.deselect();
    this._sellWindow.refresh();
    this._floatwin.setItemWindow(this._sellWindow);
};

Scene_Shop.prototype.onBuyOk = function() {
    this._item = this._buyWindow.item();    
    this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    var num = this.NumPlace();
    this._numberWindow.refresh(num);
    this._numberWindow.show();
    this._numberWindow.activate();
    this._floatwin.hide();
};

Scene_Shop.prototype.onBuyCancel = function() {
    this._commandWindow.activate();
    this._buyWindow.deactivate();
    this._buyWindow.deselect();
    this._helpWindow.clear();
    this._floatwin.hide();
};

Scene_Shop.prototype.onItemCmdOK = function() {
    this.activateSellWindow();
    this._sellWindow.select(0);
};

Scene_Shop.prototype.onItemCmdCancel = function() {
    this._commandWindow.activate();
    this._itemCmdwin.deactivate();
    this._itemCmdwin.select(0);
};

Scene_Shop.prototype.onSellOk = function() {
    this._item = this._sellWindow.item();   
    this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    var num = this.NumPlace();
    this._numberWindow.refresh(num);
    this._numberWindow.show();
    this._numberWindow.activate();
    this._floatwin.hide();   
};

Scene_Shop.prototype.onSellCancel = function() {
    this._sellWindow.deselect();
    this._sellWindow.deactivate();
    this._itemCmdwin.activate();    
    this._helpWindow.clear();
    this._floatwin.hide()
};

Scene_Shop.prototype.onNumberOk = function() {
    SoundManager.playShop();
    switch (this._commandWindow.currentSymbol()) {
    case 'buy':
        this.doBuy(this._numberWindow.number());
        this._sellWindow.refresh();
        break;
    case 'sell':
        this.doSell(this._numberWindow.number());
        this._buyWindow.refresh();
        break;
    }
    this.endNumberInput();
    this._goldWindow.refresh();
    this._numberWindow.total=0;
};

Scene_Shop.prototype.onNumberCancel = function() {
    SoundManager.playCancel();
    this._numberWindow.total=0;
    this.endNumberInput();
};

Scene_Shop.prototype.NumPlace = function() {
    var num = {};
    switch (this._commandWindow.currentSymbol()) {
    case 'buy':
        num.x = Graphics.boxWidth / 2 - Mac_Shop.Width * 2 / 5;
        var shopWindow=this._buyWindow;
        break;
    case 'sell':
        num.x = Graphics.boxWidth / 2 + Mac_Shop.Width / 10;
        var shopWindow=this._sellWindow;
        break;
    }
    var itmindex = shopWindow._index;
    var itemRect = shopWindow.itemRect(itmindex);
    num.y = shopWindow.y + itemRect.y +38;
    if (num.y+68 >(shopWindow.y + shopWindow.height)) {
    	num.y = shopWindow.y + itemRect.y -38;
    }
    return num;
};

Scene_Shop.prototype.doBuy = function(number) {
    if (Imported.YEP_ItemCore) $gameTemp.enableVarianceStock();
    $gameParty.loseGold(number * this.buyingPrice());
    $gameParty.gainItem(this._item, number);
    if (Imported.YEP_ItemCore) $gameTemp.disableVarianceStock();
};

Scene_Shop.prototype.doSell = function(number) {
    $gameParty.gainGold(number * this.sellingPrice());
    $gameParty.gainItem(this._item, -number);
    if (!EqManager.isIndependent(this._item)) return;
    EqManager.deleteIndependentItem(this._item);
    if (Imported.YEP_ItemCore) {
        if (!DataManager.isIndependent(this._item)) return;
        DataManager.removeIndependentItem(this._item);
    }
};

Scene_Shop.prototype.endNumberInput = function() {
    this._numberWindow.hide();
    switch (this._commandWindow.currentSymbol()) {
    case 'buy':
        this.activateBuyWindow();
        break;
    case 'sell':
        this.activateSellWindow();
        break;
    }
};

Scene_Shop.prototype.maxBuy = function() {
    var max = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item);
    var price = this.buyingPrice();
    if (price > 0) {
        return Math.min(max, Math.floor(this.money() / price));
    } else {
        return max;
    }
};

Scene_Shop.prototype.maxSell = function() {
    return $gameParty.numItems(this._item);
};

Scene_Shop.prototype.money = function() {
    return this._goldWindow.value();
};

Scene_Shop.prototype.currencyUnit = function() {
    return this._goldWindow.currencyUnit();
};

Scene_Shop.prototype.buyingPrice = function() {
    return this._buyWindow.price(this._item);
};

Scene_Shop.prototype.sellingPrice = function() {
    return Math.floor(this._item.price / 2);
};

Scene_Shop.prototype.MenuBgp = function(){
    if (Mac_Shop.WindowBgd) {
        this._MenuBgp = new Sprite();
        this._MenuBgp.bitmap = ImageManager.loadPicture(Mac_Shop.WindowBgd);
        this.addChildAt(this._MenuBgp,1);
    }
};

Scene_Shop.prototype.refreshPrice = function(){
    if (this._total !== this._numberWindow.total) {
        this._total = this._numberWindow.total;
        this._GoldBuy.refresh(this._total);
    }
};

Scene_Shop.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this.refreshPrice();
    var wy = (Graphics.boxHeight - Mac_Shop.Height) / 2 + this._goldWindow.height;
    if (this._goldWindow.y != (Graphics.boxHeight - Mac_Shop.Height) / 2) {
        if (this._goldWindow.y >= (Graphics.boxHeight - Mac_Shop.Height) / 2) {
            this._goldWindow.y = (Graphics.boxHeight - Mac_Shop.Height) / 2;
        } else {
            this._goldWindow.y += 9;
        }
    }
    if (this._GoldBuy.y != (Graphics.boxHeight - Mac_Shop.Height) / 2) {
        if (this._GoldBuy.y >= (Graphics.boxHeight - Mac_Shop.Height) / 2) {
            this._GoldBuy.y = (Graphics.boxHeight - Mac_Shop.Height) / 2;
        } else {
            this._GoldBuy.y += 9;
        }
    }
    if (this._commandWindow.y != wy) {
        if (this._commandWindow.y <= wy) {
            this._commandWindow.y = wy;
            this._buyWindow.show();
        } else {
            this._commandWindow.y -= 20;
        }
    }
    if (this._itemCmdwin.y != wy) {
        if (this._itemCmdwin.y <= wy) {
            this._itemCmdwin.y = wy;
            this._sellWindow.show();
        } else {
            this._itemCmdwin.y -= 20;
        }
    }
    if (this._helpWindow.y != (Graphics.boxHeight - Mac_Shop.Height) / 2) {
        if (this._helpWindow.y >= (Graphics.boxHeight - Mac_Shop.Height) / 2) {
            this._helpWindow.y = (Graphics.boxHeight - Mac_Shop.Height) / 2;
        } else {
            this._helpWindow.y += 9;
        }
    }
};
//==========================================================
function Mac_ShopCommand() {
    this.initialize.apply(this, arguments);
}

Mac_ShopCommand.prototype = Object.create(Window_HorzCommand.prototype);
Mac_ShopCommand.prototype.constructor = Mac_ShopCommand;

Mac_ShopCommand.prototype.initialize = function(x, y, purchaseOnly) {
    this._purchaseOnly = purchaseOnly;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this._line = new Sprite();
    this.createline();
    this.drawWinName();
};

Mac_ShopCommand.prototype.windowWidth = function() {
    return Mac_Shop.Width / 2;
};

Mac_ShopCommand.prototype.windowHeight = function() {
    return Mac_Shop.Height - this.fittingHeight(1);
};
Mac_ShopCommand.prototype.numVisibleRows = function() {
    return 1;
};
Mac_ShopCommand.prototype.maxCols = function() {
    return 3;
};
Mac_ShopCommand.prototype.drawWinName = function() {
    this.makeFontSmaller();
    this.changeTextColor(this.textColor(11));
    this.drawText('商店', 155, 37);
    this.resetTextColor();
    this.makeFontBigger();
};
Mac_ShopCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.buy,    'buy');
    this.addCommand(TextManager.sell,   'sell',   !this._purchaseOnly);
    this.addCommand(TextManager.cancel, 'cancel');
};

Mac_ShopCommand.prototype.createline = function() {
    this._line.bitmap=ImageManager.loadPicture(Mac_Shop.TableList);
    this._line.y=60;
    this.addChild(this._line);
};
//==========================================================
function Mac_GoldBuy() {
    this.initialize.apply(this, arguments);
}

Mac_GoldBuy.prototype = Object.create(Window_Base.prototype);
Mac_GoldBuy.prototype.constructor = Mac_GoldBuy;

Mac_GoldBuy.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.setTextwidth();
    this.refresh(0);
};

Mac_GoldBuy.prototype.windowWidth = function() {
    return 240;
};

Mac_GoldBuy.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};
Mac_GoldBuy.prototype.setTextwidth = function() {
    this.tx = this.textPadding();
    this.tw = this.contents.width - this.textPadding() * 2;
}
Mac_GoldBuy.prototype.refresh = function(value) {
    this.contents.clear();
    this.changeTextColor(this.systemColor());
    this.drawText('结算：', 0, 0);
    this.resetTextColor();
    this.drawCurrencyValue(value, this.currencyUnit(), this.tx, 0, this.tw);
};
var Mac_Window_Gold_refresh = Window_Gold.prototype.refresh;
Window_Gold.prototype.refresh = function() {
    Mac_Window_Gold_refresh.call(this);
    this.changeTextColor(this.systemColor());
    this.drawText('拥有：', 0, 0);
    this.resetTextColor();
};
Mac_GoldBuy.prototype.value = function() {
    return $gameParty.gold();
};

Mac_GoldBuy.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Mac_GoldBuy.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

//==========================================================
function Mac_ShopNumber() {
    this.initialize.apply(this, arguments);
}

Mac_ShopNumber.prototype = Object.create(Window_Selectable.prototype);
Mac_ShopNumber.prototype.constructor = Mac_ShopNumber;

Mac_ShopNumber.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this._max = 1;
    this._price = 0;
    this._number = 1;
    this._currencyUnit = TextManager.currencyUnit;//这个是 金币的 符号
    this.total = 0;
    this.opacity=0;
    this.createButtons();
    this.createBgp();
};

Mac_ShopNumber.prototype.windowWidth = function() {
    return 268;
};

Mac_ShopNumber.prototype.windowHeight = function() {
    return 75;
};

Mac_ShopNumber.prototype.number = function() {
    return this._number;
};

Mac_ShopNumber.prototype.setup = function(item, max, price) {
    this._item = item;
    this._max = Math.floor(max);
    this._price = price;
    this._number = 1;
    this.placeButtons();
    this.updateButtonsVisiblity();
    this.refresh();
};

Mac_ShopNumber.prototype.setCurrencyUnit = function(currencyUnit) {
    this._currencyUnit = currencyUnit;
    this.refresh();
};

Mac_ShopNumber.prototype.createButtons = function() {
    var bitmap = ImageManager.loadPicture(Mac_Shop.NumBtn);
    var buttonWidth = 32;
    var buttonHeight = 32;
    this._buttons = [];
    for (var i = 0; i < 5; i++) {
        var button = new Sprite_Button();        
        var x = buttonWidth *i;
        var w = buttonWidth * (i === 4 ? 2 : 1);
        button.bitmap = bitmap;
        button.setColdFrame(x, 0, w, buttonHeight);
        button.setHotFrame(x, buttonHeight, w, buttonHeight);
        button.visible = false;
        this._buttons.push(button);
        this.addChild(button);
    }
    this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
    this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
    this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
    this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
    this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
};

Mac_ShopNumber.prototype.placeButtons = function() {
    var numButtons = this._buttons.length;
    var spacing = 0;   //按钮间距
    var x = 18;     
    for (var j = 0; j < numButtons; j++) {
        var button = this._buttons[j];        
        button.x = (j >= 2 ? x+40 : x);
        button.y = 20;
        x += button.width + spacing;
    }
};

Mac_ShopNumber.prototype.updateButtonsVisiblity = function() {
        this.showButtons();
};

Mac_ShopNumber.prototype.showButtons = function() {
    for (var i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = true;
    }
};

Mac_ShopNumber.prototype.hideButtons = function() {
    for (var i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = false;
    }
};

Mac_ShopNumber.prototype.refresh = function(num) {
    this.num = num;
    this.contents.clear();
    if (num) {
        this.x = num.x;
        this.y = num.y;
    }
    this.drawNumber();
    this.drawTotalPrice();
};

Mac_ShopNumber.prototype.drawNumber = function() {
    var x = 66;
    var y = 0;    
    this.resetTextColor();
    this.drawText(this._number, x, y, 40, 'center');
};

Mac_ShopNumber.prototype.drawTotalPrice = function() {
    this.total = this._price * this._number;    
};

Mac_ShopNumber.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.processNumberChange();
};

Mac_ShopNumber.prototype.processNumberChange = function() {
    if (this.isOpenAndActive()) {
        if (Input.isRepeated('right')) {
            this.changeNumber(1);
        }
        if (Input.isRepeated('left')) {
            this.changeNumber(-1);
        }
        if (Input.isRepeated('up')) {
            this.changeNumber(10);
        }
        if (Input.isRepeated('down')) {
            this.changeNumber(-10);
        }
    }
};

Mac_ShopNumber.prototype.changeNumber = function(amount) {
    var lastNumber = this._number;
    this._number = (this._number + amount).clamp(1, this._max);
    if (this._number !== lastNumber) {
        SoundManager.playCursor();
        this.refresh(this.num);
    }
};

Mac_ShopNumber.prototype.onButtonUp = function() {
    this.changeNumber(1);
};

Mac_ShopNumber.prototype.onButtonUp2 = function() {
    this.changeNumber(10);
};

Mac_ShopNumber.prototype.onButtonDown = function() {
    this.changeNumber(-1);
};

Mac_ShopNumber.prototype.onButtonDown2 = function() {
    this.changeNumber(-10);
};

Mac_ShopNumber.prototype.onButtonOk = function() {
    this.processOk();
};

Mac_ShopNumber.prototype.createBgp = function() {    
	this._buttonbgp = new Sprite();
	this._buttonbgp.bitmap = ImageManager.loadPicture(Mac_Shop.NumBgd);
	this.addChildAt(this._buttonbgp,1);
};
//==========================================================
function Mac_ItemCmdWin() {
    this.initialize.apply(this, arguments);
}

Mac_ItemCmdWin.prototype = Object.create(Window_HorzCommand.prototype);
Mac_ItemCmdWin.prototype.constructor = Mac_ItemCmdWin;

Mac_ItemCmdWin.prototype.initialize = function(x, y, wh) { 
    this._line = new Sprite();
    this._height = wh;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this.select(0);
    this.deactivate();
    this.drawWinName();
};

Mac_ItemCmdWin.prototype.windowWidth = function() {
    return Mac_Shop.Width / 2;
};

Mac_ItemCmdWin.prototype.windowHeight = function() {
    return this._height;
};

Mac_ItemCmdWin.prototype.maxCols = function() {
    return 3;
};

Mac_ItemCmdWin.prototype.makeCommandList = function() {       
    this.addCommand(TextManager.item,    'item');
    this.addCommand(TextManager.weapon,  'weapon');
    this.addCommand(TextManager.armor,   'armor');   
};

Mac_ItemCmdWin.prototype.drawlist = function(Symbol) {
    Window_HorzCommand.prototype.refresh.call(this);
    if (Symbol === 'sell') {
        this.select(0);
        this.activate();
    } else {
        this.select(0);
        this.deactivate();
    }
};

Mac_ItemCmdWin.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};

Mac_ItemCmdWin.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};

Mac_ItemCmdWin.prototype.createline = function() {
    this._line.bitmap=ImageManager.loadPicture(Mac_Shop.TableList);
    this._line.y=60;
    this.addChild(this._line);
};

Mac_ItemCmdWin.prototype.refresh = function(Symbol) {
    this.contents.clear();
    this.createline();
    this.drawlist(Symbol);
    this.drawWinName();
};
Mac_ItemCmdWin.prototype.drawWinName = function() {
    this.makeFontSmaller();
    this.changeTextColor(this.textColor(10));
    this.drawText('背包', 155, 37);
    this.resetTextColor();
    this.makeFontBigger();
};
//====================================================

function Mac_ShopBuy() {
    this.initialize.apply(this, arguments);
}

Mac_ShopBuy.prototype = Object.create(Mac_itemWindow.prototype);
Mac_ShopBuy.prototype.constructor = Mac_ShopBuy;

Mac_ShopBuy.prototype.initialize = function(x, y, height, shopGoods) {
    var width = this.windowWidth();
    Mac_itemWindow.prototype.initialize.call(this, x, y, width, height);
    this._shopGoods = shopGoods;
    this._money = 0;
    this._shop = true;
    this.refresh();
    this.select(0);
};

Mac_ShopBuy.prototype.windowWidth = function() {
    return Mac_Shop.Width / 2;
};

Mac_ShopBuy.prototype.maxCols = function() {
    return 1;
};

Mac_ShopBuy.prototype.setMoney = function(money) {
    this._money = money;
    this.refresh();
};

Mac_ShopBuy.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Mac_ShopBuy.prototype.price = function(item) {
    return this._price[this._data.indexOf(item)] || 0;
};

Mac_ShopBuy.prototype.isEnabled = function(item) {
    return (item && this.price(item) <= this._money &&
        !$gameParty.hasMaxItems(item));
};

Mac_ShopBuy.prototype.makeItemList = function() {
    this._data = [];
    this._price = [];
    this._shopGoods.forEach(function(goods) {
        var item = null;
        switch (goods[0]) {
        case 0:
            item = $dataItems[goods[1]];
            break;
        case 1:
            item = $dataWeapons[goods[1]];
            break;
        case 2:
            item = $dataArmors[goods[1]];
            break;
        }
        if (item) {
            this._data.push(item);
            this._price.push(goods[2] === 0 ? item.price : goods[3]);
        }
    }, this);
};

Mac_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    if(EqManager.isIndependent(item)) EqManager.setDisparams(item,item);
    var rect = this.itemRect(index);
    var priceWidth = 96;
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
    this.drawText(this.price(item), rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
    this.drawText(EqManager.numIndependentItems(item), rect.x + rect.width - priceWidth - 50, rect.y, 40, 'right');
    this.changePaintOpacity(true);
};

//====================================================
function Mac_ShopSell() {
    this.initialize.apply(this, arguments);
}

Mac_ShopSell.prototype = Object.create(Mac_itemWindow.prototype);
Mac_ShopSell.prototype.constructor = Mac_ShopSell;

Mac_ShopSell.prototype.initialize = function(x, y, width, height) {
    Mac_itemWindow.prototype.initialize.call(this, x, y, width, height);
    this._shop = true;
};

Mac_ShopSell.prototype.maxCols = function() {
    return 1;
};

Mac_ShopSell.prototype.isEnabled = function(item) {
    return item && item.price > 0;
};

Mac_ShopSell.prototype.drawItem = function(index) {
    var item = this._data[index];
    var price = item.price/2;
    var rect = this.itemRect(index);
    var priceWidth = 96;
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
    this.drawText(price, rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
    this.drawText($gameParty.numItems(item), rect.x + rect.width - priceWidth - 50, rect.y, 40, 'right');
    this.changePaintOpacity(true);
};