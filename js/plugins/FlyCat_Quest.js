//=============================================================================
// RPG Maker MZ - 任务插件
//=============================================================================

/*:
 * @target MV
 * @plugindesc v1.0.0 飞猫工作室-<简易任务插件>
 * @author 飞猫工作室（Fly_Cat/Fly_Roc）
 * 
 * @param miniSize
 * @type number
 * @default 12
 * @text 小窗口字体大小
 * @desc 默认：12
 *
 * @param questListSize
 * @type number
 * @default 16
 * @text 任务列表窗口字体大小
 * @desc 默认：16
 *
 * @param miniQuestWidth
 * @type number
 * @default 300
 * @text mini窗口宽度
 * @desc mini窗口宽度位置
 *
 * @param miniQuestHeight
 * @type number
 * @default 400
 * @text mini窗口高度
 * @desc mini窗口高度位置
 *
 * @param questImgX
 * @type number
 * @default 0
 * @text 任务图标X位置(mini窗口跟随)
 * @desc 任务图标X位置(mini窗口跟随)
 * （注意:窗口跟随图片位置）
 *
 * @param questImgY
 * @type number
 * @default 100
 * @text 任务图标Y位置(mini窗口跟随)
 * @desc 任务图标Y位置(mini窗口跟随)
 * （注意:窗口跟随图片位置）
 *
 * @param noQuestText
 * @type string
 * @default 未获取任务
 * @text 未获取任务提示语
 * @desc 未获取任务提示语
 *
 * @param noQuestTextSize
 * @type number
 * @default 20
 * @text 未获取任务提示语字体大小
 * @desc 未获取任务提示语字体大小
 *
 * @param questProgressText
 * @type string
 * @default 任务进度：
 * @text 任务进度提示语
 * @desc 任务进度提示语
 *
 * @param questProgressTextSize
 * @type number
 * @default 20
 * @text 任务进度提示语字体大小
 * @desc 任务进度提示语字体大小
 *
 * @param questIntroduceText
 * @type string
 * @default 任务介绍：
 * @text 任务介绍提示语
 * @desc 任务介绍提示语
 *
 * @param questIntroduceTextSize
 * @type number
 * @default 25
 * @text 任务介绍提示语字体大小
 * @desc 任务介绍提示语字体大小
 *
 * @param questNoteTextSize
 * @type number
 * @default 20
 * @text 任务描述提示语字体大小
 * @desc 任务描述提示语字体大小
 *
 * @param noMiniQuestText
 * @type string
 * @default 未获取任务
 * @text 迷你窗口未获取任务提示语
 * @desc 迷你窗口未获取任务提示语
 *
 * @param noMiniQuestTextSize
 * @type number
 * @default 20
 * @text 迷你窗口未获取任务提示语字体大小
 * @desc 迷你窗口未获取任务提示语字体大小
 *
 * @param miniProgressText
 * @type string
 * @default 当前进度：
 * @text 迷你窗口进度提示语
 * @desc 迷你窗口进度提示语
 *
 * @param miniProgressSize
 * @type number
 * @default 12
 * @text 迷你窗口进度提示语字体大小
 * @desc 迷你窗口进度提示语字体大小
 *
 * @param quest
 * @text 任务设置
 * @type struct<questCustom>[]
 * @default
 *
 * @help
 * ==============================使用说明==================================
 * 1.插件指令：添加任务、任务进入下一进度、任务完成
 * 2.任务完成会直接删除任务
 * 3.需要自行在插件配置内设置任务
 * 4.注意：插件配置内任务进度一栏无法显示\C、\I等系统内置指令，其余设置可以
 * 随意填写，任务描述内，回车即换行。
 * ========================================================================
 */
/*~struct~questCustom:
@param questName
@text 任务名称
@type string

@param questType
@text 任务类型
@type string

@param questTask
@text 任务进度
@type string[]

@param questNote
@text 任务描述
@type note
*/

'use strict';
var Imported = Imported || {};
Imported.FlyCat_Quest = true;

var FlyCat = FlyCat || {};
FlyCat.Quest = {};
FlyCat.Quest.parameters = PluginManager.parameters('FlyCat_Quest');
FlyCat.Quest.questCustom = JSON.parse(FlyCat.Quest.parameters['quest'] || '[]');
FlyCat.Quest.miniQuestWidth = Number(FlyCat.Quest.parameters['miniQuestWidth'] || 280);
FlyCat.Quest.miniQuestHeight = Number(FlyCat.Quest.parameters['miniQuestHeight'] || 160);
FlyCat.Quest.questImgX = Number(FlyCat.Quest.parameters['questImgX'] || 1040);
FlyCat.Quest.questImgY = Number(FlyCat.Quest.parameters['questImgY'] || 0);
FlyCat.Quest.miniSize = Number(FlyCat.Quest.parameters['miniSize'] || 12);
FlyCat.Quest.questListSize = Number(FlyCat.Quest.parameters['questListSize'] || 16);
FlyCat.Quest.noQuestText = String(FlyCat.Quest.parameters['noQuestText'] || '未获取任务');
FlyCat.Quest.noQuestTextSize = Number(FlyCat.Quest.parameters['noQuestTextSize'] || 20);
FlyCat.Quest.questProgressText = String(FlyCat.Quest.parameters['questProgressText'] || '任务进度：');
FlyCat.Quest.questProgressTextSize = Number(FlyCat.Quest.parameters['questProgressTextSize'] || 20);
FlyCat.Quest.questIntroduceText = String(FlyCat.Quest.parameters['questIntroduceText'] || '任务介绍：');
FlyCat.Quest.questIntroduceTextSize = Number(FlyCat.Quest.parameters['questIntroduceTextSize'] || 25);
FlyCat.Quest.questNoteTextSize = Number(FlyCat.Quest.parameters['questNoteTextSize'] || 20);
FlyCat.Quest.noMiniQuestText = String(FlyCat.Quest.parameters['noMiniQuestText'] || '未获取任务');
FlyCat.Quest.noMiniQuestTextSize = Number(FlyCat.Quest.parameters['noMiniQuestTextSize'] || 20);
FlyCat.Quest.miniProgressText = String(FlyCat.Quest.parameters['miniProgressText'] || '当前进度：');
FlyCat.Quest.miniProgressSize = Number(FlyCat.Quest.parameters['miniProgressSize'] || 12);
FlyCat.Quest._Scene_Quest;
////////////////////////////////////////////////////////////////
if (FlyCat.Quest.questCustom) {
    const max = FlyCat.Quest.questCustom.length;
    for (let i = 0; i < max; i++) {
        FlyCat.Quest.questCustom[i] = JSON.parse(FlyCat.Quest.questCustom[i])
        FlyCat.Quest.questCustom[i].id = i + 1;
    }
};

FlyCat.Quest.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    FlyCat.Quest.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'quest') {
        switch (args[0]) {
            case 'add':
                $gameParty.addQuest(Number(args[1]));
                break;
            case 'remove':
                $gameParty.removeQuest(Number(args[1]));
                break;
            case 'nextQuest':
                $gameParty.nextQuest(Number(args[1]));
                break
            case 'hide':
                FlyCat.Quest._Scene_Quest._questButton.visible = false;
                FlyCat.Quest._Scene_Quest._miniQuestWindow.hide();
                FlyCat.Quest._Scene_Quest._miniQuestWindow.close();
                break;
            case 'show':
                FlyCat.Quest._Scene_Quest._questButton.visible = true;
                break;
        }
    }
};
////////////////////////////Game_Party///////////////////////////
FlyCat.Quest.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function () {
    FlyCat.Quest.Game_Party_initialize.call(this);
    this._quests = [];
    if ($gameSystem._quset) {
    }
    else {
        $gameSystem._quset = [];
    }

    if (FlyCat.Quest.questCustom) {
        this._quests = FlyCat.Quest.questCustom;
    }
};

Game_Party.prototype.addQuest = function (id) {
    if (this._quests[id - 1]) {
        $gameSystem._quset.push(this._quests[id - 1]);
        for (let i = 0; i < $gameSystem._quset.length; i++) {
            if ($gameSystem._quset[i].id == id) {
                $gameSystem._quset[i].taskNumber = 0;
            }
        }
        $gameTemp._miniQuestWindow.refresh();
    }
};

Game_Party.prototype.nextQuest = function (id) {
    if (this._quests[id - 1]) {
        for (let i = 0; i < $gameSystem._quset.length; i++) {
            if ($gameSystem._quset[i].id == id) {
                $gameSystem._quset[i].taskNumber += 1;
                break;
            }
        }
        $gameTemp._miniQuestWindow.refresh();
    }
};

Game_Party.prototype.removeQuest = function (id) {
    for (let i = 0; i < $gameSystem._quset.length; i++) {
        if ($gameSystem._quset[i].id == id) {
            this._removeQuestId = i;
            break;
        }
        else {
            this._removeQuestId = -1;
        }
    }
    if (this._removeQuestId >= 0) {
        if ($gameSystem._quset[this._removeQuestId]) {
            $gameSystem._quset.splice(this._removeQuestId, 1);
        }
    }
    $gameTemp._miniQuestWindow.refresh();
};
////////////////////////////////////////////////////////////////
FlyCat.Quest.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function () {
    FlyCat.Quest.Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("任务", this.commandQuest.bind(this));
};
Scene_Menu.prototype.commandQuest = function () {
    SceneManager.push(Scene_Quest);
};
FlyCat.Quest.Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands
Window_MenuCommand.prototype.addMainCommands = function () {
    FlyCat.Quest.Window_MenuCommand_addMainCommands.call(this);
    this.addQusetCommand();
}
Window_MenuCommand.prototype.addQusetCommand = function () {
    this.addCommand("任务", '任务', true);
}
////////////////////////////Scene_Map///////////////////////////
FlyCat.Quest.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function () {
    FlyCat.Quest._Scene_Quest = this;
    FlyCat.Quest.Scene_Map_start.call(this);
    Input.keyMapper['76'] = 'l';
    $gameTemp._questButtonCounts = 0;
    ImageManager.loadSystem("quest");
    this.createMiniQuestWindows();
}
FlyCat.Quest.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
    FlyCat.Quest.Scene_Map_update.call(this);
    if (Input.isTriggered('76')) {
        this.openMiniquest();
    }
}
Scene_Map.prototype.createMiniQuestWindows = function () {
    this._questButton = new Sprite_Button();
    this.addChild(this._questButton)
    this._questButton.bitmap = ImageManager.loadSystem("quest");
    const ww = FlyCat.Quest.miniQuestWidth;//迷你窗口宽度
    const wh = FlyCat.Quest.miniQuestHeight;//迷你窗口高度
    const wx = FlyCat.Quest.questImgX - 284;//迷你窗口X
    const wy = FlyCat.Quest.questImgY;//迷你窗口Y
    const miniQuestWindow = new Window_MiniQuest(wx, wy, ww, wh);
    this.addChild(miniQuestWindow);
    this._miniQuestWindow = miniQuestWindow;
    $gameTemp._miniQuestWindow = this._miniQuestWindow;
    this._questButton.setClickHandler(this.openMiniquest.bind(this));
    this._questButton.x = FlyCat.Quest.questImgX;//地图按钮图标X
    this._questButton.y = FlyCat.Quest.questImgY;//地图按钮图标Y
    this._miniQuestWindow.hide();
    this._miniQuestWindow.close();
}
Scene_Map.prototype.processMapTouch = function () {
    if (TouchInput.isTriggered() || this._touchCount > 0) {
        if (TouchInput.isPressed() && !this.isQuestButtonPressed()) {
            if (this._touchCount === 0 || this._touchCount >= 15) {
                var x = $gameMap.canvasToMapX(TouchInput.x);
                var y = $gameMap.canvasToMapY(TouchInput.y);
                $gameTemp.setDestination(x, y);
            }
            this._touchCount++;
        } else {
            this._touchCount = 0;
        }
    }
};

Scene_Map.prototype.isQuestButtonPressed = function () {
    return this._questButton && this._questButton.isButtonTouched();
};
Scene_Map.prototype.openMiniquest = function () {
    if ($gameTemp._questButtonCounts == 0) {
        SoundManager.playOk();
        this._miniQuestWindow.show();
        this._miniQuestWindow.open();
        this._miniQuestWindow.refresh()
        $gameTemp._questButtonCounts++;
    }
    else {
        SoundManager.playCancel();
        $gameTemp._questButtonCounts = 0;
        this._miniQuestWindow.close();
        this._miniQuestWindow.hide();
        this._miniQuestWindow.refresh()
    }

}
//////////////////////Scene_Quest///////////////////////
function Scene_Quest() {
    this.initialize(...arguments);
}

Scene_Quest.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Quest.prototype.constructor = Scene_Quest;

Scene_Quest.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};
Scene_Quest.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createQuestInfoWindow();
    this.createQuestListWindow();

};
Scene_Quest.prototype.createQuestListWindow = function () {
    const ww = Graphics.boxWidth / 5;//任务列表窗口宽度
    const wh = Graphics.boxHeight;//任务列表窗口高度
    const wx = 0;//任务列表窗口X
    const wy = 0; //任务列表窗口Y
    const questListWindow = new Window_QuestList(wx, wy, ww, wh);
    questListWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(questListWindow);
    this._questListWindow = questListWindow;
    this._questListWindow.setInfoQuestWindow(this._questInfoWindow)
};

Scene_Quest.prototype.createQuestInfoWindow = function () {
    const ww = Graphics.boxWidth - Graphics.boxWidth / 5;//任务信息窗口宽度
    const wh = Graphics.boxHeight; //任务信息窗口高度
    const wx = Graphics.boxWidth / 5;//任务信息窗口X
    const wy = 0;//任务信息窗口Y
    const questInfoWindow = new Window_QuestInfo(wx, wy, ww, wh);
    this.addWindow(questInfoWindow);
    this._questInfoWindow = questInfoWindow;
};
/////////////////////////////Window//////////////////////////////
function Window_QuestList() {
    this.initialize.apply(this, arguments);
}
Window_QuestList.prototype = Object.create(Window_Selectable.prototype);
Window_QuestList.prototype.constructor = Window_QuestList;

Window_QuestList.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._list = [];
    this.activate();
    this.refresh();
}
Window_QuestList.prototype.setInfoQuestWindow = function (object) {
    this._questInfoWindows = object;
}

Window_QuestList.prototype.refresh = function () {
    this.makeQuestList();
    if (this.contents) {
        this.contents.clear();
        if (this._list.length < 1) {
            this.drawItemEmpty(0);
        } else {
            this.drawAllItems();
        }
    }
};
Window_QuestList.prototype.drawAllItems = function () {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};
Window_QuestList.prototype.makeQuestList = function () {
    const quests = $gameSystem._quset;
    this._list = [];
    for (let index = 0; index < quests.length; index++) {
        const quest = quests[index];
        if (quest) {
            this._list.push(quest);
        }
    }
};
Window_QuestList.prototype.drawItem = function (index) {
    this.contents.fontSize = FlyCat.Quest.questListSize;//任务列表字体大小
    const rect = this.itemRect(index);
    const quest = this._list[index];
    const textType = quest.questType;
    if (quest) {
        this.changeTextColor(this.textColor(0));
        this.drawTextEx(textType + quest.questName, rect.x, rect.y + this.itemHeight() / 4);
        this.resetTextColor();
    }
};
FlyCat.Quest.Window_QuestList_select = Window_QuestList.prototype.select;
Window_QuestList.prototype.select = function (index) {
    FlyCat.Quest.Window_QuestList_select.call(this, index)
    if (index >= 0 && index < this.maxItems() && index != this.lastselect) {
        var quest = this._list[index];
        if (this._questInfoWindows) {
            this._questInfoWindows.contents.clear();
            this._questInfoWindows.drawInfoText(quest);
            this.lastselect = index;
        }
    }
};
//////没有任务/////
Window_QuestList.prototype.drawItemEmpty = function (index) {
    this.contents.fontSize = FlyCat.Quest.noQuestTextSize;//没有任务字体大小
    const rect = this.itemRect(index);
    this.changeTextColor(this.textColor(0));
    this.drawText(FlyCat.Quest.noQuestText, rect.x, this.height / 2 - 48, rect.width, 'center');
    this.resetTextColor();

};
Window_QuestList.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_QuestList.prototype.maxCols = function () {
    return 1;
};
Window_QuestList.prototype.itemHeight = function () {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};
Window_QuestList.prototype.numVisibleRows = function () {
    return 10;
};
Window_QuestList.prototype.rowSpacing = function () {
    return 10;
};
Window_QuestList.prototype.resetFontSettings = function () {
    this.contents.fontFace = this.standardFontFace();
    this.contents.fontSize = FlyCat.Quest.questListSize;//任务列表任务字体大小
    this.resetTextColor();
};
////////////////////////////////////////

function Window_QuestInfo() {
    this.initialize.apply(this, arguments);
}
Window_QuestInfo.prototype = Object.create(Window_Base.prototype);
Window_QuestInfo.prototype.constructor = Window_QuestInfo;

Window_QuestInfo.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
}
Window_QuestInfo.prototype.drawInfoText = function (quest) {
    this.resetTextColor();
    var questTask = '';
    const x = 10;
    var y = 80;
    this.contents.fontSize = FlyCat.Quest.questProgressTextSize;
    this.drawText(FlyCat.Quest.questProgressText, 10, 30)
    this.contents.fontSize = 20;
    if (quest.questTask.length > 0) {
        var questTask = eval(quest.questTask)//quest.questTask.split(",");
        //console.log(questTask)
        for (let i = 0; i < questTask.length; i++) {
            var text = questTask[i];
            if (text) {
                // var text = text.replace(/["\[\]]/gm, '');
                this.changeTextColor(this.textColor(14));
                if (quest.taskNumber < i) {
                    this.changeTextColor(this.textColor(8));
                }
                this.drawTextEx(text, x, y)
                y += 50;
                this.resetTextColor();
            }
        }
    }
    else {
        this.changeTextColor(this.textColor(8));
        this.drawText("无", 10, y)
        y += 50;
        this.resetTextColor();
    }
    this.contents.fontSize = FlyCat.Quest.questIntroduceTextSize;
    this.drawText(FlyCat.Quest.questIntroduceText, 10, y)
    var textNote = eval(quest.questNote);
    // var textNote = textNote.replace(/["]/gm, '');
    //  var textNote = textNote.replace(/\\n/g, '\n')
    this.drawTextEx(textNote, x, y + 50)
    // console.log(eval(quest.questNote))
    this.resetTextColor();
};

Window_QuestInfo.prototype.resetFontSettings = function () {
    this.contents.fontFace = this.standardFontFace();
    this.contents.fontSize = FlyCat.Quest.questNoteTextSize;
    this.resetTextColor();
};
///////////////////////////////////////////////////////
function Window_MiniQuest() {
    this.initialize.apply(this, arguments);
}
Window_MiniQuest.prototype = Object.create(Window_Selectable.prototype);
Window_MiniQuest.prototype.constructor = Window_MiniQuest;

Window_MiniQuest.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    //this.windowskin = ImageManager.loadSystem("Window2");
    this._frontType = 0;
    this.refresh();

}
Window_MiniQuest.prototype.refresh = function () {
    const quests = $gameSystem._quset;
    this._list = [];
    for (let index = 0; index < quests.length; index++) {
        const quest = quests[index];
        if (quest) {
            this._list.push(quest);
        }
    }
    if (this.contents) {
        this.contents.clear();
        if (this._list.length < 1) {
            this.drawItemEmpty(0);
        } else {
            this.drawAllItems();
        }
    }
}
FlyCat.Quest.Window_MiniQuest_update = Window_MiniQuest.prototype.update;
Window_MiniQuest.prototype.update = function () {
    FlyCat.Quest.Window_MiniQuest_update.call(this)
    if (this.visible == true) {
        this.refresh();
    }
}
//////没有任务/////
Window_MiniQuest.prototype.drawItemEmpty = function (index) {
    this.contents.fontSize = FlyCat.Quest.noMiniQuestTextSize;
    const rect = this.itemRect(index);
    this.changeTextColor(this.textColor(0));
    this.drawText(FlyCat.Quest.noMiniQuestText, rect.x, this.height / 2 - 48, rect.width, 'center');
    this.resetTextColor();
};
Window_MiniQuest.prototype.drawItem = function (index) {
    this.contents.fontSize = FlyCat.Quest.miniProgressSize;//迷你窗口字体大小
    const rect = this.itemRect(index);
    // var y = 5;
    // for (let index = 0; index < this._list.length; index++) {
    const quest = this._list[index];
    const questType = quest.questType;
    const questName = quest.questName;
    if (quest) {
        this._frontType = 0;
        this.drawTextEx(questType + questName, rect.x, rect.y);
        if (quest.questTask.length > 0) {
            var questTask = eval(quest.questTask)//quest.questTask.split(",");
            if (quest.taskNumber >= questTask.length) {
                var text = questTask[questTask.length - 1];
            }
            else {
                var text = questTask[quest.taskNumber];
            };
            if (text) {
                // var text = text.replace(/["\[\]]/gm, '');
                //  var text_1 = FlyCat.Quest.miniProgressText
                //   this.changeTextColor(this.textColor(14));
                // this.drawText(text_1, rect.x, rect.y + 10)
                this.changeTextColor(this.textColor(3));
                this._frontType = 1;
                this.drawTextEx(text, rect.x, rect.y + 20)
                //console.log(text)
                this.resetTextColor();
            }

        }
        else {
            var text = "无";
            var text_1 = FlyCat.Quest.miniProgressText
            this.changeTextColor(this.textColor(14));
            this.drawText(text_1, rect.x, rect.y + 20)
            this.changeTextColor(this.textColor(3));
            this.drawText(text, rect.x + this.textWidth(text_1), rect.y + 20)
            this.resetTextColor();
        }

    }
}
//////////////////////
Window_MiniQuest.prototype.processTouch = function () {
    //console.log(TouchInput.y)
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this._touching = true;
            this.onTouch(true);
        } else if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) {
                this.processCancel();
            }
        }
        if (this._touching) {
            if (TouchInput.isPressed()) {
                this.onTouch(false);
            } else {
                this._touching = false;
            }
        }
    } else {
        if (TouchInput.isRepeated() && this.isTouchedInsideFrame()) {
            //  console.log(TouchInput.x, TouchInput.y)
            // console.log(this.height)
            //  this._touching = true;
            // this.onTouch(true);

            if (TouchInput.y <= (this.height / 2 + this.y)) {
                this.scrollUp();
            }
            if (TouchInput.y > (this.height / 2 + this.y)) {
                this.scrollDown();
            }

            //this.onTouch(false);
        }
        this._touching = false;

    }
};
////////////////////////////////////////
Window_MiniQuest.prototype.processWheel = function () {
    var threshold = 20;
    if (TouchInput.wheelY >= threshold) {
        this.scrollDown();
    }
    if (TouchInput.wheelY <= -threshold) {
        this.scrollUp();
    }
};

Window_MiniQuest.prototype.drawBackgroundRect = function (rect) {

};
Window_MiniQuest.prototype.itemHeight = function () {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};
Window_MiniQuest.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_MiniQuest.prototype.maxCols = function () {
    return 1;
};
Window_MiniQuest.prototype.numVisibleRows = function () {
    return 3;
};
Window_MiniQuest.prototype.rowSpacing = function () {
    return 10;
};
Window_MiniQuest.prototype.resetFontSettings = function () {
    this.contents.fontFace = this.standardFontFace();
    if (this._frontType == 1) {
        this.contents.fontSize = 14;//迷你窗口其他字体大小
    }
    else {
        this.contents.fontSize = 18;//迷你窗口其他字体大小
    }

    this.resetTextColor();
};
