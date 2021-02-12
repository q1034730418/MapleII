/*:
* @plugindesc 技能道具装备整合界面
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
* @param 左按钮图
* @parent ----总项----
* @dir img/pictures/
* @type file
* @desc 向左换人按钮图片
* @default left
*
* @param 右按钮图
* @parent ----总项----
* @dir img/pictures/
* @type file
* @desc 向右换人按钮图片
* @default right
*
* @param 角色立绘
* @parent ---总项---
* @dir img/pictures/
* @type file
* @desc 角色立绘图的头名字，不同角色加 ID 后缀区分
* @default actor
*
* @param 道具图标
* @parent ----总项----
* @type number
* @min 0
* @desc 道具指令图标，填 0 将不显示图标
* @default 168
*
* @param 技能图标
* @parent ----总项----
* @type number
* @min 0
* @desc 技能指令图标，填 0 将不显示图标
* @default 186
*
* @param 装备图标
* @parent ----总项----
* @type number
* @min 0
* @desc 装备指令图标，填 0 将不显示图标
* @default 188
*
* @param 分界线图
* @parent ----道具----
* @dir img/pictures/
* @type file
* @desc 道具界面分类与列表分界线图片
* @default line
*
* @param 货币单位
* @parent ----道具----
* @type text
* @desc 用作第一货币的显示名称
* @default 铜钱
*
* @param 货币图标
* @parent ----道具----
* @type number
* @min 0
* @desc 用作第一货币的图标
* @default 83
*
* @param 第二货币
* @parent ----道具----
* @desc 用作第二货币的显示名称
* @default 金币
*
* @param 变量ID
* @parent ----道具----
* @type number
* @min 1
* @desc 用作第二货币的变量号
* @default 1
*
* @param 显示图标
* @parent ----道具----
* @type number
* @min 0
* @desc 用作第二货币的图标
* @default 83
*
* @param 装备槽背景
* @parent ----装备----
* @dir img/pictures/
* @type file
* @desc 装备槽背景图片文件名，留空无背景
* @default equiplot
*
* @help
============================帮助文件=============================
*/
var Mac_Menu = Mac_Menu || {};
Mac_Menu.WindowXY = PluginManager.parameters('Mac_Menu')["窗口宽高"].split(",");
Mac_Menu.Opacity = parseInt(PluginManager.parameters('Mac_Menu')["窗口透明度"]);
Mac_Menu.WindowBgd = String(PluginManager.parameters('Mac_Menu')["背景图片"]);
Mac_Menu.LeftBtn = String(PluginManager.parameters('Mac_Menu')["左按钮图"]);
Mac_Menu.RightBtn = String(PluginManager.parameters('Mac_Menu')["右按钮图"]);
Mac_Menu.ActorPic = String(PluginManager.parameters('Mac_Menu')["角色立绘"]);
Mac_Menu.ItemIcon = parseInt(PluginManager.parameters('Mac_Menu')["道具图标"]);
Mac_Menu.SkillIcon = parseInt(PluginManager.parameters('Mac_Menu')["技能图标"]);
Mac_Menu.EquipIcon = parseInt(PluginManager.parameters('Mac_Menu')["装备图标"]);
Mac_Menu.ItemLine = String(PluginManager.parameters('Mac_Menu')["分界线图"]);
Mac_Menu.Money = String(PluginManager.parameters('Mac_Menu')["货币单位"]);
Mac_Menu.FirstIcon = parseInt(PluginManager.parameters('Mac_Menu')["货币图标"]);
Mac_Menu.Variable = parseInt(PluginManager.parameters('Mac_Menu')["变量ID"]);
Mac_Menu.ShowText = String(PluginManager.parameters('Mac_Menu')["第二货币"]);
Mac_Menu.SecondIcon = parseInt(PluginManager.parameters('Mac_Menu')["显示图标"]);
Mac_Menu.EquipIot = String(PluginManager.parameters('Mac_Menu')["装备槽背景"]);
Mac_Menu.Width = parseInt(Mac_Menu.WindowXY[0]);
Mac_Menu.Height = parseInt(Mac_Menu.WindowXY[1]);
var menucmd = menucmd || {};
menucmd._helpwin = ['学习的技能', '收集的物品', '武器和装备'];
//===========================主菜单=============================
Scene_Menu.prototype.commandPersonal = function() {
    SceneManager.push(Mac_Eqmenu);
};
Window_Base.prototype.drawTextJH = function(text, x, y) {
    if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
};
//========================整合的装备菜单===================================

function Mac_Eqmenu() {
    this.initialize.apply(this, arguments);
}

Mac_Eqmenu.prototype = Object.create(Scene_ItemBase.prototype);
Mac_Eqmenu.prototype.constructor = Mac_Eqmenu;

Mac_Eqmenu.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

Mac_Eqmenu.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createBgd();//背景图片
    this.createCmdWindow();//命令窗口
    this.createStatusWindow();//立绘窗口
    this.createitemTypeWindow();//物品分类
    this.createItemWindow();//物品列表
    this.createSkillTypeWindow();//技能分类
    this.createSkillWindow();//技能列表
    this.createFloatwin();//浮动窗口
    this.createSlotWindow();//装备选槽
    this.createEqItemWindow();//装备列表
    this.createActorWindow();//角色窗口
    this.createwinHelp();//提示窗口
    this.upButton();//前推按钮
    this.nextButton();//后翻按钮
    this.setwin();//窗口关联初始化
    this.refreshActor();//角色翻页
};
Mac_Eqmenu.prototype.start = function() {
    Scene_ItemBase.prototype.start.call(this);
    this._actorWindow.refresh();
};
Mac_Eqmenu.prototype.createCmdWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Menu.Width) / 2;
    var wy = (Graphics.boxHeight - Mac_Menu.Height) / 2;
    var ww = Mac_Menu.Width / 5 * 3;
    this._cmdWindow = new Mac_EqmenuCmd(wx, wy, ww);
    this._cmdWindow.x -= 500;
    this._cmdWindow.setHandler('equip',   this.onEqcmdOk.bind(this));
    this._cmdWindow.setHandler('item',     this.onitemcmdOk.bind(this));
    this._cmdWindow.setHandler('skill',      this.onskillcmdOk.bind(this));
    this._cmdWindow.setHandler('cancel',  this.popScene.bind(this));
    this._cmdWindow.opacity = Mac_Menu.Opacity;
    this.addWindow(this._cmdWindow);
    this._cmdWindow.select(1);
};
Mac_Eqmenu.prototype.createStatusWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Menu.Width) / 2 + this._cmdWindow.width;
    var wy = (Graphics.boxHeight - Mac_Menu.Height) / 2;
    this._statusWindow = new Mac_EquipStatus(wx, wy);
    this._statusWindow.opacity = Mac_Menu.Opacity;
    this._statusWindow.x += 500;
    this.addWindow(this._statusWindow);
    this._statusWindow.activate();
    this._statusWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._statusWindow.setHandler('pageup',   this.previousActor.bind(this));
};
Mac_Eqmenu.prototype.createitemTypeWindow = function() {
    this._itemTypeWindow = new Mac_itemCmd(this._cmdWindow.width);
    this._itemTypeWindow.x = (Graphics.boxWidth - Mac_Menu.Width) / 2 - 500;
    this._itemTypeWindow.y = (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72;
    this._itemTypeWindow.setHandler('ok',     this.onitemTypeOk.bind(this));
    this._itemTypeWindow.setHandler('cancel', this.onitemTypeCancel.bind(this));
    this._itemTypeWindow.opacity = Mac_Menu.Opacity;
    this.addChildAt(this._itemTypeWindow, 3);
    this._itemTypeWindow.activate();
    this._itemTypeWindow.select(0);
};
Mac_Eqmenu.prototype.createItemWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Menu.Width) / 2;
    var wy = (Graphics.boxHeight - Mac_Menu.Height) / 2 + 127;
    var wh = this._itemTypeWindow.height - 108;
    this._itemWindow = new Mac_itemWindow(wx, wy, this._cmdWindow.width, wh);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._itemWindow.opacity = 0;
    this.addChildAt(this._itemWindow, 4);
    this.setitemWin(this._itemWindow);
    this._itemWindow.setFloatWin(this._floatwin);
};
Mac_Eqmenu.prototype.createSkillTypeWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Menu.Width) / 2;
    var wy = (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72;
    this._skillTypeWindow = new Mac_SkillType(wx, wy);
    this._skillTypeWindow.setHandler('skill',    this.cmdSkillTypeOk.bind(this));
    this._skillTypeWindow.setHandler('cancel',   this.cmdSkillTypeCancel.bind(this));
    this._skillTypeWindow.opacity = Mac_Menu.Opacity;
    this.addWindow(this._skillTypeWindow);
    this.hideWindow(this._skillTypeWindow);
};
Mac_Eqmenu.prototype.createSkillWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Menu.Width) / 2 + this._skillTypeWindow.width;
    var wy = (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72;
    var ww = this._cmdWindow.width - this._skillTypeWindow.width;
    var wh = Mac_Menu.Height - 180;
    this._skillWindow = new Mac_SkillList(wx, wy, ww, wh);
    this._skillWindow.setHandler('ok',     this.onSkillOk.bind(this));
    this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
    this._skillWindow.opacity = Mac_Menu.Opacity;
    this.addWindow(this._skillWindow);
    this.hideWindow(this._skillWindow);
};
Mac_Eqmenu.prototype.createSlotWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Menu.Width) / 2;
    var wy = (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72;
    var wh = Mac_Menu.Height - 160;
    this._slotWindow = new Mac_EquipSlot(wx, wy, this._cmdWindow.width, wh);
    this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
    this._slotWindow.opacity = Mac_Menu.Opacity;
    this.addWindow(this._slotWindow);
    this._slotWindow.setFloatWin(this._floatwin);
    this.hideWindow(this._slotWindow);
};
Mac_Eqmenu.prototype.createEqItemWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Menu.Width) / 2;
    var wy = (Graphics.boxHeight + Mac_Menu.Height) / 2 - 288;
    this._EqitemWindow = new Mac_EquipItem(wx, wy, this._cmdWindow.width, 180);
    this._EqitemWindow.setHandler('ok',     this.onEqItemOk.bind(this));
    this._EqitemWindow.setHandler('cancel', this.onEqItemCancel.bind(this));
    this._EqitemWindow.opacity = Mac_Menu.Opacity;
    this.addWindow(this._EqitemWindow);
    this.hideWindow(this._EqitemWindow);
};
Mac_Eqmenu.prototype.createwinHelp = function() {
    var wx = (Graphics.boxWidth - Mac_Menu.Width) / 2;
    var wy = (Graphics.boxHeight + Mac_Menu.Height) / 2 - 108;
    this._helpWindow=new Mac_WinHelp(wx, wy, this._cmdWindow.width);
    this._helpWindow.opacity = Mac_Menu.Opacity;
    this._helpWindow.x -= 500;
    this.addChildAt(this._helpWindow, 3);
};
Mac_Eqmenu.prototype.createActorWindow = function() {
    var wx = (Graphics.boxWidth - Mac_Menu.Width) / 2 + this._cmdWindow.width;
    var wy = (Graphics.boxHeight - Mac_Menu.Height) / 2;
    this._actorWindow = new Mac_MenuActor(wx, wy);
    this._actorWindow.setHandler('ok',     this.onActorOk.bind(this));
    this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
    this._actorWindow.opacity = Mac_Menu.Opacity;
    this.addWindow(this._actorWindow);
};
Mac_Eqmenu.prototype.createFloatwin = function() {  
    this._floatwin = new Mac_floatWin();
    this.addChildAt(this._floatwin, 5);
}
Mac_Eqmenu.prototype.setwin = function() {
    this._slotWindow.setItemWindow(this._EqitemWindow); 
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._EqitemWindow.setHelpWindow(this._helpWindow);
    this._EqitemWindow.setStatusWindow(this._statusWindow);
    this._itemTypeWindow.setItemWindow(this._itemWindow);
    this._itemTypeWindow.setHelpWindow(this._helpWindow);        
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._skillTypeWindow.setSkillWindow(this._skillWindow);    
    this._skillTypeWindow.setHelpWindow(this._helpWindow);
    this._skillWindow.setHelpWindow(this._helpWindow);  
    this._EqitemWindow.setFloatWin(this._floatwin);
    this._itemWindow.setFloatWin(this._floatwin); 
    this._floatwin.setItemWindow(this._itemWindow);
    this._floatwin.setHideOnetime(false);
};

Mac_Eqmenu.prototype.user = function() {
    if(DataManager.isSkill(this.item())){
        return this.skillUser()
    }else{
        return this.itemUser()
    }
}
Mac_Eqmenu.prototype.itemUser = function() {        
    var members = $gameParty.movableMembers();
    var bestActor = members[0];
    var bestPha = 0;
    for (var i = 0; i < members.length; i++) {
        if (members[i].pha > bestPha) {
            bestPha = members[i].pha;
            bestActor = members[i];
        }
    }
    return bestActor;
};
Mac_Eqmenu.prototype.skillUser = function() {
    return this.actor();
};
Mac_Eqmenu.prototype.setitemWin = function(itemwin) {        
    this._itemwin = itemwin;
};
Mac_Eqmenu.prototype.item = function() {        
    return this._itemwin.item();
};
Mac_Eqmenu.prototype.onActorCancel = function() {
    this.hideSubWindow(this._actorWindow);
    this._upButton.show();
    this._nextButton.show();
};
//================================================
Mac_Eqmenu.prototype.determineItem = function() {
    var action = new Game_Action(this.user());
    var item = this.item();
    action.setItemObject(item);
    if (action.isForFriend()) {
        this.showWindow(this._actorWindow);
        this._actorWindow.selectForItem(item);
        this._upButton.hide();
        this._nextButton.hide();
    } else {
        this.useItem();
        this.activateItemWindow();
    }
};
Mac_Eqmenu.prototype.useItem = function() {
    this.setUse();
    if (DataManager.isItem(this.item())) {
        this.playSeForItem();
        this._itemWindow.redrawCurrentItem();
    } else {
        this.playSeForSkill();
    }
    this._skillWindow.refresh();
    this._statusWindow.refresh();
};
Mac_Eqmenu.prototype.setUse = function() {
    this.user().useItem(this.item());
    this.applyItem();
    this.checkCommonEvent();
    this.checkGameover();
    this._actorWindow.refresh();
};
Mac_Eqmenu.prototype.activateItemWindow = function() {
    if (DataManager.isItem(this.item())) {
        this._itemWindow.refresh();
        this._itemWindow.activate();
    } else {
        this._skillWindow.refresh();
        this._skillWindow.activate();
    }
};
Mac_Eqmenu.prototype.refreshActor = function() {
    var actor = this.actor();
    this._statusWindow.setActor(actor);
    this._skillTypeWindow.setActor(actor);
    this._skillWindow.setActor(actor);
    this._slotWindow.setActor(actor);
    this._EqitemWindow.setActor(actor);
//    this._itemWindow.setActor(actor);
};
Mac_Eqmenu.prototype.onActorChange = function() {
    this.refreshActor();
    if (this._slotWindow.active) {
        var a = this._slotWindow._index;
        this._floatwin.setHideOnetime(true, true);
        this._slotWindow.select(a);
    }
    if (this._EqitemWindow.active) {
        this._floatwin.setHideOnetime(false, true);
        this._EqitemWindow.select(0);
    }
    if (this._skillWindow.active) {
        this._skillWindow.select(0);
    }
};
//=======================装备栏=======================
Mac_Eqmenu.prototype.onEqcmdOk = function() {
    this.hideWindow(this._itemTypeWindow);
    this.hideWindow(this._itemWindow);
    this.hideWindow(this._skillTypeWindow);
    this.hideWindow(this._skillWindow);
    if (this._EquipIotBgp) this.removeChild(this._EquipIotBgp);
    this.EquipLotBgp();
    this.showWindow(this._slotWindow);
    this._EqitemWindow.show();
    this._floatwin.setItemWindow(this._slotWindow);
    this._floatwin.setHideOnetime(true, true);
    this._slotWindow.select(0);
    this._slotWindow.y -= 288;
    this._EqitemWindow.y += 336;
};

Mac_Eqmenu.prototype.onSlotOk = function() {
    this._floatwin.setItemWindow(this._EqitemWindow);
    this._floatwin.setHideOnetime(false);
    this._EqitemWindow.activate();
    this._EqitemWindow.select(0);
};

Mac_Eqmenu.prototype.onSlotCancel = function() {
    this._slotWindow.deselect();
    this._slotWindow.deactivate();
    this._cmdWindow.activate();
    this.hideWindow(this._floatwin);
};

Mac_Eqmenu.prototype.onEqItemOk = function() {
    if (Imported.BettleOnline && this.actor() instanceof Game_Hero) {
        SoundManager.playBuzzer();
        this._EqitemWindow.activate();
    } else {
        SoundManager.playEquip();
        this.actor().changeEquip(this._slotWindow.index(), this._EqitemWindow.item());
        this._floatwin.setItemWindow(this._slotWindow);
        this._floatwin.setHideOnetime(true);
        this._slotWindow.activate();
        this._slotWindow.refresh();
        this._EqitemWindow.deselect();
        this._EqitemWindow.refresh();
        this._statusWindow.refresh();
        this._actorWindow.refresh();
    }
};

Mac_Eqmenu.prototype.onEqItemCancel = function() {
    this._floatwin.setItemWindow(this._slotWindow);
    this._floatwin.setHideOnetime(true);
    this._slotWindow.activate();
    this._EqitemWindow.deselect();
    this._EqitemWindow.deactivate();
    this._statusWindow._tempActor = null;
    this._statusWindow.refresh();
};
//=========================物品栏==============================

Mac_Eqmenu.prototype.onitemcmdOk = function() {
    this.hideWindow(this._skillTypeWindow);
    this.hideWindow(this._skillWindow);
    this.hideWindow(this._slotWindow);
    if (this._EquipIotBgp) this.removeChild(this._EquipIotBgp);
    this.hideWindow(this._EqitemWindow);
    this.showWindow(this._itemTypeWindow);
    this.setitemWin(this._itemWindow); 
    this._floatwin.setItemWindow(this._itemWindow);
    this._floatwin.setHideOnetime(false);
    this._itemTypeWindow.select(0);
    this._itemTypeWindow.x -= 500;   
};

Mac_Eqmenu.prototype.onitemTypeOk = function() {
    this._itemWindow.activate();
    this._itemWindow.selectLast();
};
Mac_Eqmenu.prototype.onitemTypeCancel = function() {
    this._itemTypeWindow.deselect();
    this._itemTypeWindow.deactivate();
    this._cmdWindow.activate();
};
Mac_Eqmenu.prototype.onItemOk = function() {
    $gameParty.setLastItem(this._itemWindow.item());
    this.determineItem();  
};

Mac_Eqmenu.prototype.onItemCancel = function() {
    this._itemWindow.deselect();
    this._itemTypeWindow.activate();
    this.hideWindow(this._floatwin);
};

Mac_Eqmenu.prototype.playSeForItem = function() {
    SoundManager.playUseItem();
};
//===================技能栏========================   

Mac_Eqmenu.prototype.onskillcmdOk = function() {
    this.hideWindow(this._itemTypeWindow);        
    this.hideWindow(this._itemWindow); 
    this.hideWindow(this._slotWindow);
    if (this._EquipIotBgp) this.removeChild(this._EquipIotBgp);
    this.hideWindow(this._EqitemWindow);
    this.showWindow(this._skillTypeWindow);
    this._skillWindow.show(); 
    this.setitemWin(this._skillWindow); 
    this._skillTypeWindow.select(0);    
    this._skillTypeWindow.y -= 504;
    this._skillWindow.y += 552;        
};  

Mac_Eqmenu.prototype.cmdSkillTypeOk = function() {
    this._skillWindow.activate();
    this._skillWindow.selectLast();
};

Mac_Eqmenu.prototype.cmdSkillTypeCancel = function() {
    this._skillTypeWindow.deselect();
    this._skillTypeWindow.deactivate();
    this._cmdWindow.activate();
};

Mac_Eqmenu.prototype.onSkillOk = function() {
    this.actor().setLastMenuSkill(this._skillWindow.item());
    this.determineItem();        
};

Mac_Eqmenu.prototype.onSkillCancel = function() {
    this._skillWindow.deselect();
    this._skillWindow.deactivate();
    this._skillTypeWindow.activate();
};

Mac_Eqmenu.prototype.playSeForSkill = function() {
    //SoundManager.playUseSkill(); 
    SoundManager.playRecovery()      
};   
//======================按钮=============================
Mac_Eqmenu.prototype.upButton = function(){
    this._upButton = new Mac_SprButton();  
    this._upButton.setClickHandler(this.previousActor.bind(this));        
    this._upButton.bitmap=ImageManager.loadPicture(Mac_Menu.LeftBtn);
    this._upButton.x=505;        
    this._upButton.y=266;
    this._upButton.x+=400;               
    this.addChild(this._upButton);            
};
  
Mac_Eqmenu.prototype.nextButton = function(){
    this._nextButton = new Mac_SprButton();  
    this._nextButton.setClickHandler(this.nextActor.bind(this));
    this._nextButton.bitmap=ImageManager.loadPicture(Mac_Menu.RightBtn); 
    this._nextButton.x=764;       
    this._nextButton.y=266;
    this._nextButton.x+=400;              
    this.addChild(this._nextButton);       
};
Mac_Eqmenu.prototype.previousActor = function() {
    if ($gameParty.size() == 1) return;
    SoundManager.playOk();
    $gameParty.makeActorPrevious();
    this.updateActor();
    this.onActorChange();
    this._nextButton.x+=400;
    this._upButton.x+=400;  
    this._statusWindow.x += 400;
    this._statusWindow.activate();
};
Mac_Eqmenu.prototype.nextActor = function() {
    if ($gameParty.size() == 1) return;
    SoundManager.playOk();
    $gameParty.makeActorNext();
    this.updateActor();
    this.onActorChange();
    this._nextButton.x+=400;
    this._upButton.x+=400;  
    this._statusWindow.x += 400; 
    this._statusWindow.activate(); 
};
Mac_Eqmenu.prototype.showWindow = function(window) {          
    window.show();
    window.activate();
};
Mac_Eqmenu.prototype.hideWindow = function(window) {
    window.hide();
    window.deactivate();
};
Mac_Eqmenu.prototype.createBgd = function() {
    if (Mac_Menu.WindowBgd) {
        this._MenuBgp = new Sprite(); 
        this._MenuBgp.bitmap = ImageManager.loadPicture(Mac_Menu.WindowBgd);
        this.addChildAt(this._MenuBgp, 1);
    }
};
Mac_Eqmenu.prototype.EquipLotBgp = function() {
    if (Mac_Menu.EquipIot) {
        this._EquipIotBgp = new Sprite(); 
        this._EquipIotBgp.bitmap = ImageManager.loadPicture(Mac_Menu.EquipIot);
        this.addChildAt(this._EquipIotBgp, 2);
        var wx = (Graphics.boxWidth - Mac_Menu.Width) / 2;
        var wy = (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72;
        this._EquipIotBgp.move(wx, wy);
    }
};
//=============================================
Mac_Eqmenu.prototype.update = function() {
    Scene_ItemBase.prototype.update.call(this);
    if (this._cmdWindow.active){
        this._helpWindow.setText(menucmd._helpwin[this._cmdWindow._index]);
    }
//=================状态动画==============
    if (this._statusWindow.x != Graphics.boxWidth / 2 + Mac_Menu.Width / 10) {
        if (this._statusWindow.x <= Graphics.boxWidth / 2 + Mac_Menu.Width / 10) {
            this._statusWindow.x = Graphics.boxWidth / 2 + Mac_Menu.Width / 10;
        } else {
            this._statusWindow.x -=15;
        }
    }
    if (this._upButton.x != Graphics.boxWidth / 2 + Mac_Menu.Width / 10) {
        if (this._upButton.x <= Graphics.boxWidth / 2 + Mac_Menu.Width / 10) {
            this._upButton.x = Graphics.boxWidth / 2 + Mac_Menu.Width / 10;
        } else {
            this._upButton.x -=15;
        }
    }
    if (this._nextButton.x != (Graphics.boxWidth + Mac_Menu.Width) / 2 - 64) {
        if (this._nextButton.x <= (Graphics.boxWidth + Mac_Menu.Width) / 2 - 64) {
            this._nextButton.x = (Graphics.boxWidth + Mac_Menu.Width) / 2 - 64;
        } else {
            this._nextButton.x -=15;
        }
    }
    if (this._cmdWindow.x != (Graphics.boxWidth - Mac_Menu.Width) / 2) {
        if (this._cmdWindow.x >= (Graphics.boxWidth - Mac_Menu.Width) / 2) {
            this._cmdWindow.x = (Graphics.boxWidth - Mac_Menu.Width) / 2;
        } else {
            this._cmdWindow.x += 15;
        }
    }
    if (this._slotWindow.x != (Graphics.boxWidth - Mac_Menu.Width) / 2) {
        if (this._slotWindow.x >= (Graphics.boxWidth - Mac_Menu.Width) / 2) {
            this._slotWindow.x = (Graphics.boxWidth - Mac_Menu.Width) / 2;
        } else {
            this._slotWindow.x += 19;
        }
    }
    if (this._EqitemWindow.x != (Graphics.boxWidth - Mac_Menu.Width) / 2) {
        if (this._EqitemWindow.x >= (Graphics.boxWidth - Mac_Menu.Width) / 2) {
            this._EqitemWindow.x = (Graphics.boxWidth - Mac_Menu.Width) / 2;
        } else {
            this._EqitemWindow.x += 19;
        }
    }
    if (this._helpWindow.x != (Graphics.boxWidth - Mac_Menu.Width) / 2) {
        if (this._helpWindow.x >= (Graphics.boxWidth - Mac_Menu.Width) / 2) {
            this._helpWindow.x = (Graphics.boxWidth - Mac_Menu.Width) / 2;
        } else {
            this._helpWindow.x += 15;
        }
    }
//==============装备动画==============
    if (this._slotWindow.y != (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72) {
        if (this._slotWindow.y >= (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72) {
            this._slotWindow.y = (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72;
        } else {
            this._slotWindow.y += 14;
        }
    }

    if (this._EqitemWindow.y != (Graphics.boxHeight + Mac_Menu.Height) / 2 - 288) {
        if (this._EqitemWindow.y <= (Graphics.boxHeight + Mac_Menu.Height) / 2 - 288) {
            this._EqitemWindow.y = (Graphics.boxHeight + Mac_Menu.Height) / 2 - 288;
        } else {
            this._EqitemWindow.y -= 15;
        }
    }
//==============物品动画==============
    if (this._itemTypeWindow.x != (Graphics.boxWidth - Mac_Menu.Width) / 2) {
        if (this._itemTypeWindow.x >= (Graphics.boxWidth - Mac_Menu.Width) / 2) {
            this._itemTypeWindow.x = (Graphics.boxWidth - Mac_Menu.Width) / 2;
            this._itemWindow.show();
        } else {
            this.hideWindow(this._itemWindow);
            this._itemTypeWindow.x += 15;
        }
    }
//==============技能动画================
    if (this._skillTypeWindow.y != (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72) {
        if (this._skillTypeWindow.y >= (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72) {
            this._skillTypeWindow.y = (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72;
        } else {
            this._skillTypeWindow.y += 20;
        }
    }
    if (this._skillWindow.y != (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72) {
        if (this._skillWindow.y <= (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72) {
            this._skillWindow.y = (Graphics.boxHeight - Mac_Menu.Height) / 2 + 72;
        } else {
            this._skillWindow.y -= 22;
        }
    }
};
//==================================================
function Mac_EqmenuCmd() {
    this.initialize.apply(this, arguments);
}
Mac_EqmenuCmd.prototype = Object.create(Window_HorzCommand.prototype);
Mac_EqmenuCmd.prototype.constructor = Mac_EqmenuCmd;

Mac_EqmenuCmd.prototype.initialize = function(x, y, width) {
    this._windowWidth = width;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this.select(2);
    this.deactivate();
    this.createIcon();
};

Mac_EqmenuCmd.prototype.windowWidth = function() {
    return this._windowWidth;
};

Mac_EqmenuCmd.prototype.maxCols = function() {
    return 3;
};

Mac_EqmenuCmd.prototype.makeCommandList = function() {
    this.addCommand(TextManager.skill,  'skill');
    this.addCommand(TextManager.item,   'item');
    this.addCommand(TextManager.equip2, 'equip');
};
Mac_EqmenuCmd.prototype.createIcon = function() {
//更改 菜单的 图标
    var juli = (Mac_Menu.Width / 5 * 3 - 60) / 3 + 12;
    if (Mac_Menu.EquipIcon != 0) this.drawIcon(Mac_Menu.EquipIcon, juli * 2 + 8, 2); //装备
    if (Mac_Menu.ItemIcon != 0) this.drawIcon(Mac_Menu.ItemIcon, juli + 8, 2); //物品
    if (Mac_Menu.ItemIcon != 0) this.drawIcon(Mac_Menu.SkillIcon, 8, 2);   //技能
};
//=======================================================
function Mac_itemCmd() {
    this.initialize.apply(this, arguments);
}
Mac_itemCmd.prototype = Object.create(Window_ItemCategory.prototype);
Mac_itemCmd.prototype.constructor = Mac_itemCmd;

Mac_itemCmd.prototype.initialize = function(width) {
    this._windowWidth = width;        
    Window_ItemCategory.prototype.initialize.call(this);        
    this.deselect();
    this.createline();
    this.createline2();
    var wx = (this._windowWidth - 36) / 2;
    var wy = this.windowHeight() - 70;
    this.drawIcon(Mac_Menu.SecondIcon, 200, wy + 3);
    this.drawTextEx(Mac_Menu.ShowText, 30, wy, 80);
    this.drawText($gameVariables.value(Mac_Menu.Variable), 100, wy, 90, 'right');
    this.drawIcon(Mac_Menu.FirstIcon, wx + 195, wy + 3);
    this.drawTextEx(Mac_Menu.Money, wx + 20, wy, 100);
    this.drawText($gameParty.gold(), wx + 85, wy, 100, 'right');
};

Mac_itemCmd.prototype.windowWidth = function() {
    return this._windowWidth;
};
Mac_itemCmd.prototype.windowHeight = function() {
    return Mac_Menu.Height - 180;
};
Mac_itemCmd.prototype.maxCols = function() {
    return 4;
};

Mac_itemCmd.prototype.createline = function(itemWindow) {
    this._line = new Sprite(); 
    this._line.bitmap = ImageManager.loadPicture(Mac_Menu.ItemLine);
    this._line.y = 60;
    this.addChild(this._line);
};
Mac_itemCmd.prototype.createline2 = function(itemWindow) {
    this._line = new Sprite(); 
    this._line.bitmap = ImageManager.loadPicture(Mac_Menu.ItemLine);
    this._line.y = this.windowHeight() - 64;
    this.addChild(this._line);
};
//===============角色使用窗===========================  

function Mac_MenuActor() {
    this.initialize.apply(this, arguments);
}

Mac_MenuActor.prototype = Object.create(Window_MenuActor.prototype);
Mac_MenuActor.prototype.constructor = Mac_MenuActor;

Mac_MenuActor.prototype.initialize = function(x, y) {
    Window_MenuStatus.prototype.initialize.call(this, x, y);
    this.hide();
};

Mac_MenuActor.prototype.windowWidth = function() {
    return Mac_Menu.Width / 5 * 2;
};

Mac_MenuActor.prototype.windowHeight = function() {
    return Mac_Menu.Height;
};

Mac_MenuActor.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x +153 ;
    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    var width = rect.width - x - this.textPadding();
    this.drawActorSimpleStatus(actor, x, y, width);
};
Mac_MenuActor.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x;       
    var width2 = 115;        
    this.drawActorName(actor, x, y);     
    Mac_itemWindow.prototype.drawActorHp.call(this,actor, x2, y + lineHeight * 1, width2);
    Mac_itemWindow.prototype.drawActorMp.call(this,actor, x2, y + lineHeight * 2, width2);
};

Mac_MenuActor.prototype.numVisibleRows = function() {
    return $gameParty.maxBattleMembers();
};

Mac_MenuActor.prototype.maxItems = function() {
    return Math.min($gameParty.size(), $gameParty.maxBattleMembers());
};

Mac_MenuActor.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, this._faceWidth*0.8, this._faceHeight*0.8);
    this.changePaintOpacity(true);
};
//======================================================            
function Mac_EquipSlot() {
    this.initialize.apply(this, arguments);
}
Mac_EquipSlot.prototype = Object.create(Window_EquipSlot.prototype);
Mac_EquipSlot.prototype.constructor = Mac_EquipSlot;
Mac_EquipSlot.prototype.initialize = function(x, y, width, height) {
    Window_EquipSlot.prototype.initialize.call(this, x, y, width, height);
};
Mac_EquipSlot.prototype.setFloatWin = function(floatwin) {
    this._floatwin = floatwin;
};
Mac_EquipSlot.prototype.drawItem = function(index) {
    if (this._actor) {
        var rect = this.itemRectForText(index);
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(this.slotName(index), rect.x - 70, rect.y + 3, 60, this.lineHeight());
        Mac_itemWindow.prototype.drawItemName.call(this,
            this._actor.equips()[index], rect.x - 3, rect.y + 3);
        this.changePaintOpacity(true);
    }
};
Mac_EquipSlot.prototype.ItemColor = function(item) {
    Mac_itemWindow.prototype.ItemColor.call(this,item);
};
Mac_EquipSlot.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
    if (this.active && this.item()){
        EqManager.setDisparams(this.item(),this.item())
        this._floatwin.setActor(this._actor);
        this._floatwin.setEqItem(this.item());
    } else {
        this._floatwin.setEqItem(null);
    }
};
Mac_EquipSlot.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    switch(index) { //此处修改装备槽坐标，可按格式增加装备槽
        case 0: rect.x = 100; rect.y = 0; break;
        case 1: rect.x = 100; rect.y = 50; break;
        case 2: rect.x = 100; rect.y = 100; break;
        case 3: rect.x = 400; rect.y = 0; break;
        case 4: rect.x = 400; rect.y = 50; break;
        case 5: rect.x = 400; rect.y = 100; break;
    }
    rect.width = 40;
    rect.height = 40;
    return rect;
};
//===================================================
function Mac_EquipItem() {
    this.initialize.apply(this, arguments);
}

Mac_EquipItem.prototype = Object.create(Mac_itemWindow.prototype);
Mac_EquipItem.prototype.constructor = Mac_EquipItem;

Mac_EquipItem.prototype.initialize = function(x, y, width, height) {
    Mac_itemWindow.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this._slotId = 0;
};

Mac_EquipItem.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
        this.resetScroll();
    }
};

Mac_EquipItem.prototype.setSlotId = function(slotId) {
    if (this._slotId !== slotId) {
        this._slotId = slotId;
        this.refresh();
        this.resetScroll();
    }
};

Mac_EquipItem.prototype.includes = function(item) {
    if (item === null) return true;
    if (!item) return false;
    if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId])
        return false;
    return this._actor.canEquip(item);
};

Mac_EquipItem.prototype.isEnabled = function(item) {
    return true;
};
    
//===============技能窗口设置======================
function Mac_SkillType() {
    this.initialize.apply(this, arguments);
}

Mac_SkillType.prototype = Object.create(Window_SkillType.prototype);
Mac_SkillType.prototype.constructor = Mac_SkillType;

Mac_SkillType.prototype.initialize = function(x, y) {
    Window_SkillType.prototype.initialize.call(this, x, y);
};
Mac_SkillType.prototype.windowWidth = function() {
    return 160;
};
Mac_SkillType.prototype.windowHeight = function() {
    return Mac_Menu.Height - 180;
};
Mac_SkillType.prototype.maxCols = function() {
    return 1;
};
//=========================================================
function Mac_SkillList() {
    this.initialize.apply(this, arguments);
}

Mac_SkillList.prototype = Object.create(Window_SkillList.prototype);
Mac_SkillList.prototype.constructor = Mac_SkillList;

Mac_SkillList.prototype.initialize = function(x, y, width, height) {
    Window_SkillList.prototype.initialize.call(this, x, y, width, height);
    
};
Mac_SkillList.prototype.maxCols = function() {
    return 1;
};

Mac_SkillList.prototype.spacing = function() {
    return 1;
};
Mac_SkillList.prototype.drawItem = function(index) {
    var skill = this._data[index];
    if (skill) {
        var costWidth = this.costWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
//        this.changePaintOpacity(this.isEnabled(skill));
        this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
        this.drawSkillCost(skill, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};
//==========================新的状态栏=============================
function Mac_EquipStatus() {
    this.initialize.apply(this, arguments);
}

Mac_EquipStatus.prototype = Object.create(Mac_itemWindow.prototype);
Mac_EquipStatus.prototype.constructor = Mac_EquipStatus;

Mac_EquipStatus.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Mac_itemWindow.prototype.initialize.call(this, x, y, width, height);
    this._actorpic = new Sprite();
    this._actor = null;
    this._tempActor = null;
    this.refresh();
};
Mac_EquipStatus.prototype.windowWidth = function() {
    return Mac_Menu.Width / 5 * 2;
};
Mac_EquipStatus.prototype.windowHeight = function() {
    return Mac_Menu.Height;
};
Mac_EquipStatus.prototype.makeFontBigger = function() {
    this.contents.fontSize = 18;
    /*if (this.contents.fontSize <= 96) {
        this.contents.fontSize += 8;
    }*/
};
Mac_EquipStatus.prototype.makeFontSmaller = function() {
    this.contents.fontSize = 16;
    /*if (this.contents.fontSize >= 24) {
        this.contents.fontSize -= 8;
    }*/
};
Mac_EquipStatus.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};
Mac_EquipStatus.prototype.setTempActor = function(tempActor) {
    if (this._tempActor !== tempActor) {
        this._tempActor = tempActor;
        this.refresh();
    }
};
Mac_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {          
        this.ActorInfo();     
    }
};
Mac_EquipStatus.prototype.ActorInfo = function() {
    this.setActorPic();
    this.ActorName(this._actor, 0, 0);
    this.drawActorHp(this._actor,this.contentsWidth()-165,30,165);  //绘制HP/MP
    this.drawActorMp(this._actor,this.contentsWidth()-165,60,165);
    this.makeFontSmaller();
    this.drawExpInfo();
    this.drawBaseParam(10, this.contentsHeight() - 258, 28);
    this.drawAddParam(this.contentsWidth() - 140, this.contentsHeight() - 258, 28);
    this.drawProfile(0, Mac_Menu.Height - 90);
    this.makeFontBigger();
};
Mac_EquipStatus.prototype.setActorPic = function() {
    var actorId = this._actor._actorId < $dataActors.length ? this._actor._actorId : 1;
    var bitmap = Mac_Menu.ActorPic + actorId;
    this._actorpic.bitmap = ImageManager.loadPicture(bitmap);
    this.addChildAt(this._actorpic,1);
//    var wx = (this.windowWidth() - this._actorpic.width) / 2;
    this._actorpic.move(0, 10);
};
Mac_EquipStatus.prototype.ActorName = function(actor, x, y, width) {
    width = width || 60;
    this.changeTextColor(this.hpColor(actor));
    this.drawText(actor.name(), x, y, width, 'left');
    this.drawText(actor.nickname(), x + 60, y, width, 'left');
};
Mac_EquipStatus.prototype.drawBaseParam = function(x, y, height) {
    for (var i = 0; i < 6; i++) {
        this.drawParam(x, y, height, i, 2 + i);
    }
};
Mac_EquipStatus.prototype.drawParam = function(x, y, height, i, paramId) {
    var wh = height * i;
    var wy = y+ wh;
    this.drawParamName(x + this.textPadding(), wy, paramId);
    if (this._actor) {
        this.drawCurrentParam(x + 46, wy, paramId);
    }
    if (this._tempActor) {
        this.drawNewParam(x + 95, wy, paramId);
    }
};
Mac_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
    var wx = x-15;
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(paramId), wx, y, 60,'right');
};
Mac_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
    this.resetTextColor();
    this.drawText(this._actor.param(paramId), x, y, 48, 'right');
};
Mac_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    var fushu = this._actor.param(paramId) - newValue;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    if (diffvalue > 0) {
        var value = ' '+'+'+diffvalue;
        this.drawText(value, x, y);
    } else if (diffvalue < 0) {
        var value = ' '+'-'+fushu;
        this.drawText(value, x, y);
    } else {
        return null;
    }
};
Mac_EquipStatus.prototype.drawAddParam = function(x, y, height) {
    for (var i = 0; i < 7; i++) {
        if (i < 5) this.drawXParam(x, y, height, i, i);
        else  this.drawXParam(x, y, height, i, 2 + i);
    }
};
Mac_EquipStatus.prototype.drawXParam = function(x, y, height, i, paramId) {
    var wh = height * i;
    var wy = y+ wh;
    this.drawXParamName(x + this.textPadding(), wy, i);
    if (this._actor) {
        this.drawCurrentXParam(x + 36, wy, paramId);
    }
    if (this._tempActor) {
        this.drawNewXParam(x + 85, wy, paramId);
    }
};
Mac_EquipStatus.prototype.drawXParamName = function(x, y, paramId) {
    var wx = x - 50;
    this.changeTextColor(this.systemColor());
    this.drawText(Mac_BaseFun.AddParam[paramId], wx, y, 80, 'right');
};
Mac_EquipStatus.prototype.drawCurrentXParam = function(x, y, paramId) {
    this.resetTextColor();
    if (paramId < 5) {
        var value = Math.floor(this._actor.xparam(paramId).toFixed(2)*100);
        this.drawText(value + '%', x, y, 48, 'right');
    } else {
        var value = this._actor.xparam(paramId).toFixed(3)*1000;
        this.drawText(value + '‰', x, y, 48, 'right');
    }
};
Mac_EquipStatus.prototype.drawNewXParam = function(x, y, paramId) {
    var newValue = this._tempActor.xparam(paramId);
    if (paramId < 5) {
        var diffvalue = (newValue - this._actor.xparam(paramId)) * 100;
        var fushu = (this._actor.xparam(paramId) - newValue) * 100;
    } else {
        var diffvalue = (newValue - this._actor.xparam(paramId)) * 1000;
        var fushu = (this._actor.xparam(paramId) - newValue) * 1000;
    }
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    if (diffvalue > 0) {
        var value = ' '+'+'+diffvalue.toFixed(0);
        this.drawText(value, x, y);
    } else if (diffvalue < 0) {
        var value = ' '+'-'+fushu.toFixed(0);
        this.drawText(value, x, y);
    } else {
        return null;
    }
};
Mac_EquipStatus.prototype.drawProfile = function(x, y) {
    this.drawTextJH(this._actor.profile(), x, y);
};
//========================绘制EXP信息======================
Mac_EquipStatus.prototype.drawExpInfo = function() {
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextLevelExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    }
    this.changeTextColor(this.systemColor());
    this.drawText('等级：', 0, 413, 350);
    this.drawText('经验：', 0, 441, 50);
    this.resetTextColor();
    this.drawText(this._actor.currentClass().name, 0, 40);
    this.drawText(this._actor._level, 45, 415);
    if (value2 > 10000) {
        value1 = Math.floor(value1);
        value2 = Math.floor(value2);
        var value3 = value1 +'/' + value2;
        //var value3 = value1 +'K' + '/' + value2 + 'K';
    }else{
        var value3 = value1 + '/' + value2;
    }
    this.drawText(value3, 45, 442, 250);
};
//=====================按钮精灵====================
function Mac_SprButton() {
    Sprite_Button.apply(this, arguments);      
};
Mac_SprButton.prototype = Object.create(Sprite_Button.prototype);
Mac_SprButton.prototype.constructor = Mac_SprButton;

Mac_SprButton.prototype.update = function() {
    Sprite_Button.prototype.update.call(this);        
    this.mouseisTouched();
}; 

Mac_SprButton.prototype.mouseisTouched = function() {        
    var x = TouchInput.mousex;
    var y = TouchInput.mousey;
    var btx = this.x;
    var bty = this.y;
    if (x>=btx&&x<=btx+this.width&&y>=bty&&y<=bty+this.height) {            
        this.opacity = 255;
    } else {
        this.opacity = 100;
    }        
};
Mac_SprButton.prototype.show = function() {        
    this._hiding = false;        
    this.updateVisibility();
};
Mac_SprButton.prototype.hide = function() {        
    this._hiding = true;            
    this.updateVisibility();
};
Mac_SprButton.prototype.updateVisibility = function() {        
    this.visible = !this._hiding;
};
Game_Party.prototype.makeActorPrevious = function() {
    var index = this.members().indexOf(this.menuActor());
    var size = Math.min(this.size(), this.maxBattleMembers());
    if (index >= 0) {
        index = (index + size - 1) % size;
        this.setMenuActor(this.members()[index]);
    } else {
        this.setMenuActor(this.members()[0]);
    }
};
Game_Party.prototype.makeActorNext = function() {
    var index = this.members().indexOf(this.menuActor());
    var size = Math.min(this.size(), this.maxBattleMembers());
    if (index >= 0) {
        index = (index + 1) % size;
        this.setMenuActor(this.members()[index]);
    } else {
        this.setMenuActor(this.members()[0]);
    }
};