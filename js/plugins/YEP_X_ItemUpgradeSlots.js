//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Item Upgrade Slots
// YEP_X_ItemUpgradeSlots.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ItemUpgrades = true;

var Yanfly = Yanfly || {};
Yanfly.IUS = Yanfly.IUS || {};
Yanfly.IUS.version = 1.09;

//=============================================================================
 /*:
 * @plugindesc v1.09 (需要 YEP_ItemCore.js) 独立物品强化(加成功率).
 * @author Yanfly Engine Plugins Revise by Fanzi
 *
 * @param Default Slots
 * @type number
 * @min 0
 * @desc 可强化数量The default amount of slots items can be upgraded.
 * @default 3
 *
 * @param Slot Variance
 * @type number
 * @desc 强化槽差异The default slot variance for items with slots.
 * @default 1
 *
 * @param Upgrade Command
 * @desc 强化重命名Command text for upgrading the selected item. If you don't
 * wish for this to appear, keep this blank. %1 - Item Name 留空不启用
 * @default Upgrade %1
 *
 * @param 强化动画
 * @type number
 * @min 0
 * @desc 强化成功时播放的动画ID.
 * @default 51
 *
 * @param 失败动画
 * @type number
 * @min 0
 * @desc 强化失败时播放的动画ID.
 * @default 63
 *
 * @param 动画延时
 * @type number
 * @min 0
 * @desc 动画播放的时候脚本延时响应.
 * @default 2000
 *
 * @param 递减成功率
 * @type number
 * @min 0
 * @desc 强化成功率逐级递减的量，首次为100%.
 * @default 5
 *
 * @param 公告等级
 * @type number
 * @min 0
 * @desc 强化达到级数发系统公告(需网络插件生效).
 * @default 10
 *
 * @param 公告内容
 * @desc 网络插件发送的公告内容，%1为道具名，%2为强化级数.
 * @default \C[2]强化%1突破%2级\C[0]
 *
 * @param Show Only
 * @type boolean
 * @on YES
 * @off NO
 * @desc 可用显示The Upgrade Command will only show if item is upgradeable.
 * NO - false     YES - true
 * @default true
 *
 * @param Slots Available
 * @desc 强化槽显示Text used for amount of upgrade slots available. To hide
 * this from the info window, leave this blank. 留空不启用
 * @default Slots Available
 *
 * @param Show Slot Upgrades
 * @type boolean
 * @on YES
 * @off NO
 * @desc 显示强化信息Shows what upgrades applied to slots in info window.
 * NO - false     YES - true
 * @default true
 *
 * @param Slot Upgrade Format
 * @desc 强化命名格式This is the text format used before a shown slot upgrade.
 * %1 - Slot Number    %2 - Item Icon and Name
 * @default \}Slot%1: %2\{
 *
 * @param Default Sound
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc 强化声效This is the default sound played when using an item upgrade.
 * @default Heal2
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 本插件需要 YEP_ItemCore 支持。
 *
 * 此插件添加了装备强化功能，用基本道具给目标装备强化以提高其参数。
 * 强化成功率八成由装备强化等级决定，每高一级降一次递减成功率，
 * 另外两成由队长幸运值决定，幸运值超高可弥补强化等级的先天不足，
 * 强化成功与否由成功与失败动画体现。
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 下面的备注信息可用于修改道具强化。
 *
 * 装备主体的备注：
 *
 * <Upgrade Slots: x>
 * This sets the number of times an item can be upgraded instead of the
 * default amount defined in the database.自定义设置强化次数
 *
 * <Slot Variance: x>
 * This makes it so that there is a random variance for the number of slots
 * provided through the item. If this notetag isn't used, it will go by the
 * setting in the parameters.自定义随机强化槽
 *
 * <Upgrade Sound: filename>  自定义强化声效
 * Changes the upgrade sound played to 'filename'. If this notetag isn't
 * used, the 'Default Sound' parameter sound will be used instead.
 *
 * 强化道具的备注：
 *
 * <Upgrade Effect>
 *  effect
 *  effect
 * </Upgrade Effect>
 * 这些是应用的效果(按照它们的顺序)。请参考下一节中的“强化效果列表”。
 *
 * <Upgrade Item Type: All>
 * <Upgrade Item Type: Regular>
 * <Upgrade Item Type: Key>
 * <Upgrade Item Type: Hidden A>
 * <Upgrade Item Type: Hidden B>
 * <Upgrade Item Type: Always>
 * <Upgrade Item Type: Battle>
 * <Upgrade Item Type: Menu>
 * <Upgrade Item Type: Never>
 * <Upgrade Item Type: string>
 * 设定这个道具可以用来强化的条件，这需下面的装备备注配合使用。
 *
 * <Type: string>
 * 类型备注需放入装备备注，并将添加“string”作为其类型。可使用多个类型。
 * 这里与前面道具备注类型匹配的任何类型都将使该装备可由该道具进行强化。
 *
 * <Upgrade Weapon Type: x>
 * <Upgrade Weapon Type: x, x, x>
 * <Upgrade Weapon Type: x through x>
 * 这使得只有武器类型x可以使用该物品进行强化。如果x为0所有武器都有效。
 *
 * <Upgrade Armor Type: x>
 * <Upgrade Armor Type: x, x, x>
 * <Upgrade Armor Type: x through x>
 * 这使得只有防具类型x可以使用该物品进行强化。如果x为0所有防具都有效。
 *
 * ============================================================================
 * Upgrade Effects List
 * ============================================================================
 *
 * 下面是强化效果列表，写在<Upgrade Effects>标签中
 * 让它将所需的效果应用到强化的道具上。
 *
 * 效果文本               对应的强化效果:
 *   Base Name: x            - 变更道具基本名为 x. *Note2
 *   Boost Count: +x         - 强化次数增加 x. *Note2
 *   Boost Count: -x         - 强化次数减少 x. *Note2
 *   Eval: x                 - 将 x 作为代码运行。*Note2
 *   Name: x                 - 变更道具名为 x. *Note2
 *   Icon: x                 - 变更道具图标为 x. *Note2
 *   Picture Image: filename - 变更道具图像为 filename. *Note4
 *   Picture Hue: x          - 变更道具色调为 x. *Note4
 *   Prefix: x               - 变更道具前缀为 x. *Note2
 *   Priority Name: x        - 变更道具优先名为 x. *Note2
 *   Random Stat: x          - 增加或减少属性 0 到 x. *Note1
 *   Random Stat: +x         - 增加属性 0 到 x. *Note1
 *   Random Stat: -x         - 减少属性 0 到 x. *Note1
 *   Reset Base Name         - 重置道具基本名称。
 *   Reset Boost Count       - 强化次数清零。
 *   Reset Icon              - 重置道具图标。
 *   Reset Prefix            - 重置道具前缀。
 *   Reset Stat              - 重置属性。 *Note1
 *   Reset Suffix            - 重置后缀。
 *   Reset Full              - 全面重置。 *Note3
 *   Slots: x                - 变更强化成本为 x. *Note1
 *   Stat: +x                - 增加属性 x. *Note1
 *   Stat: +x%               - 增加属性 x%. *Note1
 *   Stat: -x                - 减少属性 x. *Note1
 *   Stat: -x%               - 减少属性 x%. *Note1
 *   Suffix: x               - 变更道具前缀为 x. *Note2
 *   Text Color: x           - 变更道具显示色 x.
 *
 * Note1: 'Stat' 可替换为 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT',
 * 'MDF', 'AGI', 'LUK', 'SLOTS', 'ALL' or 'CURRENT'. 'ALL' 为所有属性。
 * 'CURRENT' 为非零属性。此效果还将增加强化计数并更新道具的名称。
 *
 * Note2: 这不会改变强化计数，也不会更新道具名称，除非定制修改。
 *
 * Note3: 因为这个效果会重置道具的所有内容，所以它会强制离开强化菜单。
 *
 * Note4: 这需要道具图像插件。
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * 插件指令：
 * ShowItemUpgrade    - Shows the upgrade option in the item menu.显示强化
 * HideItemUpgrade    - Hides the upgrade option in the item menu.隐藏强化
 * DisableItemUpgrade - Disables the upgrade option in the item menu.菜单禁用
 * EnableItemUpgrade  - Enables the upgrade option in the item menu.菜单启用
 *
 * You can use those Plugin Commands at any time to adjust the upgrade option.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.08:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.07:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.06a:
 * - Fixed a bug that caused an error with the way items upgraded.
 * - Fixed a bug that didn't connect with the Equip Customize Command plugin.
 *
 * Version 1.05:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.04:
 * - Added 'Text Color: x' upgrade effect to allow you to change the text color
 * of independent items.
 *
 * Version 1.03:
 * - Fixed a bug that caused slot variance to not calculate correctly.
 * - Added 'stat +x%' and 'stat -x%' to upgrade effects.
 *
 * Version 1.02:
 * - Fixed a bug that prevented upgrading if the only effect is boosting.
 *
 * Version 1.01:
 * - Added 'Show Only' parameter. This will cause the upgrade command to only
 * appear if the item can be upgraded.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

if (Imported.YEP_ItemCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ItemUpgradeSlots');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.IUSDefaultSlots = Number(Yanfly.Parameters['Default Slots']);
Yanfly.Param.IUSSlotVariance = Number(Yanfly.Parameters['Slot Variance']);
Yanfly.Param.IUSUpgradeCmd = String(Yanfly.Parameters['Upgrade Command']);
Yanfly.Param.IUSShowOnly = String(Yanfly.Parameters['Show Only']);
Yanfly.Param.IUSSlotsText = String(Yanfly.Parameters['Slots Available']);
Yanfly.Param.IUSShowSlots = String(Yanfly.Parameters['Show Slot Upgrades']);
Yanfly.Param.IUSSlotFmt = String(Yanfly.Parameters['Slot Upgrade Format']);
Yanfly.Param.IUSUpgradeSound = String(Yanfly.Parameters['Default Sound']);
Yanfly.Param.AnimationId1 = Number(Yanfly.Parameters['强化动画']);
Yanfly.Param.AnimationId2 = Number(Yanfly.Parameters['失败动画']);
Yanfly.Param.SetTimeout = Number(Yanfly.Parameters['动画延时']);
Yanfly.Param.SuccessRate = Number(Yanfly.Parameters['递减成功率']);
Yanfly.Param.SendLevel = Number(Yanfly.Parameters['公告等级']);
Yanfly.Param.SendWord = String(Yanfly.Parameters['公告内容']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.IUS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.IUS.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_ItemUpgradeSlots) {
    this.processUpgradeNotetags1($dataItems);
    this.processUpgradeNotetags1($dataWeapons);
    this.processUpgradeNotetags1($dataArmors);
    this.processUpgradeNotetags2($dataItems);
    Yanfly._loaded_YEP_X_ItemUpgradeSlots = true;
  }
	return true;
};

DataManager.processUpgradeNotetags1 = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		ItemManager.initSlotUpgradeNotes(obj);
    this.processUpgradeNotetags(obj);
	}
};

DataManager.processUpgradeNotetags2 = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		this.processUpgradeNotetags(obj);
	}
};

DataManager.processUpgradeNotetags = function(item) {
    var note1 = /<(?:TYPE|TYPES):[ ](.*)>/i;
    var notedata = item.note.split(/[\r\n]+/);

    item.types = item.types || ['ALL'];

    if (item.itypeId === 1) item.types.push('REGULAR');
    if (item.itypeId === 2) item.types.push('KEY');
    if (item.itypeId === 3) item.types.push('HIDDEN A');
    if (item.itypeId === 4) item.types.push('HIDDEN B');
    if (item.occasion === 0) item.types.push('ALWAYS');
    if (item.occasion === 1) item.types.push('BATTLE');
    if (item.occasion === 2) item.types.push('MENU');
    if (item.occasion === 3) item.types.push('NEVER');

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var str = String(RegExp.$1).toUpperCase();
        if (!item.types.contain(str)) item.types.push(str);
      }
    }
};

//=============================================================================
// ItemManager
//=============================================================================

ItemManager.initSlotUpgradeNotes = function(item) {
    var note1 = /<(?:UPGRADE SLOTS|upgrade slot):[ ](\d+)>/i;
    var note2 = /<(?:UPGRADE EFFECT)>/i;
    var note3 = /<\/(?:UPGRADE EFFECT)>/i;
    var note4 = /(?:SLOTS|slot):[ ](\d+)/i;
    var note5 = /(?:BOOST COUNT|boost count):[ ]([\+\-]\d+)/i;
    var note6 = /<(?:UPGRADE SOUND):[ ](.*)>/i;
    var note7 = /<(?:UPGRADE ITEM TYPE):[ ](.*)>/i;
    var note8 = /<(?:UPGRADE WEAPON TYPE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
    var note9 = /<(?:UPGRADE ARMOR TYPE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
    var note10 = /<(?:UPGRADE WEAPON TYPE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
    var note11 = /<(?:UPGRADE ARMOR TYPE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
    var note12 = /<(?:SLOTS VARIANCE|slot variance):[ ](\d+)>/i;
    var baseItem = DataManager.getBaseItem(item);
    var notedata = baseItem.note.split(/[\r\n]+/);

    item.upgradeSlots = Yanfly.Param.IUSDefaultSlots;
    item.upgradeSlotsVariance = Yanfly.Param.IUSSlotVariance;
    item.upgradeSound = Yanfly.Param.IUSUpgradeSound;
    item.slotsApplied = [];
    var upgradeEffect = false;
    item.upgradeEffect = [];
    item.boostCountValue = 1;
    item.upgradeSlotCost = 1;
    item.upgradeItemType = [];
    item.upgradeWeaponType = [];
    item.upgradeArmorType = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        item.upgradeSlots = parseInt(RegExp.$1);
      } else if (line.match(note2)) {
        upgradeEffect = true;
        item.upgradeEffect = [];
      } else if (line.match(note3)) {
        upgradeEffect = false;
      } else if (upgradeEffect && line.match(note4)) {
        item.upgradeSlotCost = parseInt(RegExp.$1);
        item.upgradeEffect.push('');
      } else if (upgradeEffect && line.match(note5)) {
        item.boostCountValue = parseInt(RegExp.$1);
        item.upgradeEffect.push('');
      } else if (upgradeEffect) {
        item.upgradeEffect.push(line);
      } else if (line.match(note6)) {
        item.upgradeSound = String(RegExp.$1);
      } else if (line.match(note7)) {
        item.upgradeItemType.push(String(RegExp.$1).toUpperCase());
      } else if (line.match(note8)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        item.upgradeWeaponType = item.upgradeWeaponType.concat(array);
      } else if (line.match(note9)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        item.upgradeArmorType = item.upgradeArmorType.concat(array);
      } else if (line.match(note10)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
					parseInt(RegExp.$2));
        item.upgradeWeaponType = item.upgradeWeaponType.concat(range);
      } else if (line.match(note11)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
					parseInt(RegExp.$2));
        item.upgradeArmorType = item.upgradeArmorType.concat(range);
      } else if (line.match(note12)) {
        item.upgradeSlotsVariance = parseInt(RegExp.$1);
      }
    }
    if (!DataManager.isIndependent(item)) item.upgradeSlots = 0;
    if (item.upgradeItemType.length === 0 &&
    item.upgradeWeaponType.length === 0 &&
    item.upgradeArmorType.length === 0) {
      item.upgradeWeaponType = [0];
      item.upgradeArmorType = [0];
    }
};

Yanfly.IUS.ItemManager_randomizeInitialItem =
    ItemManager.randomizeInitialItem;
ItemManager.randomizeInitialItem = function(baseItem, newItem) {
    Yanfly.IUS.ItemManager_randomizeInitialItem.call(this, baseItem, newItem);
    if ($gameTemp.varianceStock()) return;
    this.randomizeSlots(baseItem, newItem);
};

ItemManager.randomizeSlots = function(baseItem, newItem) {
    if (baseItem.upgradeSlots <= 0) return;
    if (baseItem.upgradeSlotsVariance <= 0) return;
    var randomValue = baseItem.upgradeSlotsVariance * 2 + 1;
    var offset = baseItem.upgradeSlotsVariance;
    newItem.upgradeSlots += Math.floor(Math.random() * randomValue - offset);
    newItem.upgradeSlots = Math.max(newItem.upgradeSlots, 0);
    newItem.originalUpgradeSlots = newItem.upgradeSlots;
};

ItemManager.applyIUSEffects = function(mainItem, effectItem) {
    if (!DataManager.isIndependent(mainItem)) return;
    this.payIUSEffects(mainItem, effectItem);
    this.checkIUSEffects(mainItem, effectItem);
};

ItemManager.payIUSEffects = function(mainItem, effectItem) {
    $gameParty.loseItem(effectItem, 1);
    mainItem.upgradeSlots -= effectItem.upgradeSlotCost;
    this.addIUSLine(mainItem, effectItem);
    for (var i = 1; i < effectItem.upgradeSlotCost; ++i) {
      mainItem.slotsApplied.push('---');
    }
    this.increaseItemBoostCount(mainItem, effectItem.boostCountValue);
};

ItemManager.addIUSLine = function(mainItem, effectItem) {
    if (!mainItem.slotsApplied) this.initSlotUpgradeNotes(mainItem);
    var line = '\\i[' + effectItem.iconIndex + ']' + effectItem.name;
    mainItem.slotsApplied.push(line);
};

ItemManager.checkIUSEffects = function(mainItem, effectItem) {
    for (var i = 0; i < effectItem.upgradeEffect.length; ++i) {
      var line = effectItem.upgradeEffect[i];
      this.processIUSEffect(line, mainItem, effectItem);
      if (this._fullReset) {
        mainItem = this._resetItem;
        this._resetItem = undefined;
      }
    }
};

ItemManager.processIUSEffect = function(line, mainItem, effectItem) {
    // Imported.YEP_X_ItemPictureImg
    if (Imported.YEP_X_ItemPictureImg) {
      if (line.match(/PICTURE IMAGE:[ ](.*)/i)) {
        var filename = String(RegExp.$1);
        return this.effectIUSPictureHue(mainItem, filename, undefined);
      }
      if (line.match(/PICTURE HUE:[ ](\d+)/i)) {
        var hue = parseInt(RegExp.$1).clamp(0, 360);
        return this.effectIUSPictureHue(mainItem, undefined, hue);
      }
    }
    // BASE NAME: X
    if (line.match(/BASE NAME:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return this.effectIUSBaseName(mainItem, value);
    }
    // EVAL X
    if (line.match(/EVAL:[ ](.*)/i)) {
      var code = String(RegExp.$1);
      return this.effectIUSEval(mainItem, effectItem, code);
    }
    // ICON: X
    if (line.match(/ICON:[ ](\d+)/i)) {
      var value = parseInt(RegExp.$1);
      return this.effectIUSIcon(mainItem, value);
    }
    // PREFIX: X
    if (line.match(/PREFIX:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return this.effectIUSPrefix(mainItem, value);
    }
    // PRIORITY NAME: X
    if (line.match(/PRIORITY NAME:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return this.effectIUSPriorityName(mainItem, value);
    }
    // NAME: X
    if (line.match(/NAME:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return this.effectIUSName(mainItem, value);
    }
    // RANDOM STAT: X
    if (line.match(/RANDOM[ ](.*):[ ](\d+)/i)) {
      var stat = String(RegExp.$1).toUpperCase();
      var value = parseInt(RegExp.$2);
      return this.effectIUSRandomChange1(mainItem, stat, value);
    }
    // RANDOM STAT: +/-X
    if (line.match(/RANDOM[ ](.*):[ ]([\+\-]\d+)/i)) {
      var stat = String(RegExp.$1).toUpperCase();
      var value = parseInt(RegExp.$2);
      return this.effectIUSRandomChange2(mainItem, stat, value);
    }
    // RESET STAT
    if (line.match(/RESET[ ](.*)/i)) {
      var stat = String(RegExp.$1).toUpperCase();
      return this.effectIUSResetStat(mainItem, stat);
    }
    // TEXT COLOR: X
    if (line.match(/TEXT COLOR:[ ](\d+)/i)) {
      var value = parseInt(RegExp.$1);
      return this.effectIUSTextColor(mainItem, value);
    }
    // STAT: +/-X%
    if (line.match(/(.*):[ ]([\+\-]\d+)([%％])/i)) {
      var stat = String(RegExp.$1).toUpperCase();
      var value = parseInt(RegExp.$2);
      return this.effectIUSParamRateChange(mainItem, stat, value);
    }
    // STAT: +/-X
    if (line.match(/(.*):[ ]([\+\-]\d+)/i)) {
      var stat = String(RegExp.$1).toUpperCase();
      var value = parseInt(RegExp.$2);
      return this.effectIUSParamChange(mainItem, stat, value);
    }
    // SUFFIX: X
    if (line.match(/SUFFIX:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return this.effectIUSSuffix(mainItem, value);
    }
};

ItemManager.adjustItemTrait = function(mainItem, code, dataId, value, add) {
    if (add) {
      this.addTraitToItem(mainItem, code, dataId, value);
    } else {
      this.deleteTraitFromItem(mainItem, code, dataId, value);
    }
};

ItemManager.addTraitToItem = function(mainItem, code, dataId, value) {
    var trait = {
      code: code,
      dataId: dataId,
      value: value
    }
    mainItem.traits.push(trait);
};

ItemManager.deleteTraitFromItem = function(mainItem, code, dataId, value) {
    var index = this.getMatchingTraitIndex(mainItem, code, dataId, value);
    if (index >= 0) mainItem.traits.splice(index, 1);
};

ItemManager.effectIUSBaseName = function(item, value) {
    this.setBaseName(item, value);
    this.updateItemName(item);
};

ItemManager.effectIUSEval = function(mainItem, effectItem, code) {
    var item = mainItem;
    var baseItem = DataManager.getBaseItem(item);
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ITEM UPGRADE EFFECT ERROR');
    }
};

ItemManager.effectIUSIcon = function(item, value) {
    item.iconIndex = value;
};

ItemManager.effectIUSPrefix = function(item, value) {
    this.setNamePrefix(item, value);
    this.updateItemName(item);
};

ItemManager.effectIUSPriorityName = function(item, value) {
    this.setPriorityName(item, value);
    this.updateItemName(item);
};

ItemManager.effectIUSName = function(item, value) {
    item.name = value;
};

ItemManager.effectIUSRandomChange1 = function(item, stat, value) {
    var randomValue = (value + 1) * 2;
    var offset = value;
    switch (stat) {
      case 'HP':
      case 'MAXHP':
      case 'MAX HP':
        item.params[0] += Math.floor(Math.random() * randomValue - offset);
        break;
      case 'MP':
      case 'MAXMP':
      case 'MAX MP':
      case 'SP':
      case 'MAXSP':
      case 'MAX SP':
        item.params[1] += Math.floor(Math.random() * randomValue - offset);
        break;
      case 'ATK':
      case 'STR':
        item.params[2] += Math.floor(Math.random() * randomValue - offset);
        break;
      case 'DEF':
        item.params[3] += Math.floor(Math.random() * randomValue - offset);
        break;
      case 'MAT':
      case 'INT':
      case 'SPI':
        item.params[4] += Math.floor(Math.random() * randomValue - offset);
        break;
      case 'MDF':
      case 'RES':
        item.params[5] += Math.floor(Math.random() * randomValue - offset);
        break;
      case 'AGI':
      case 'SPD':
        item.params[6] += Math.floor(Math.random() * randomValue - offset);
        break;
      case 'LUK':
        item.params[7] += Math.floor(Math.random() * randomValue - offset);
        break;
      case 'ALL':
        for (var i = 0; i < 8; ++i) {
          item.params[i] += Math.floor(Math.random() * randomValue - offset);
        }
        break;
      case 'CURRENT':
        for (var i = 0; i < 8; ++i) {
          if (item.params[i] === 0) continue;
          item.params[i] += Math.floor(Math.random() * randomValue - offset);
        }
        break;
      case 'SLOT':
      case 'SLOTS':
        item.upgradeSlots += Math.floor(Math.random() * randomValue - offset);
        break;
    }
};

ItemManager.effectIUSRandomChange2 = function(item, stat, value) {
    if (value >= 0) {
      var randomValue = value + 1;
    } else {
      var randomValue = value - 1;
    }
    switch (stat) {
      case 'HP':
      case 'MAXHP':
      case 'MAX HP':
        item.params[0] += Math.floor(Math.random() * randomValue);
        break;
      case 'MP':
      case 'MAXMP':
      case 'MAX MP':
      case 'SP':
      case 'MAXSP':
      case 'MAX SP':
        item.params[1] += Math.floor(Math.random() * randomValue);
        break;
      case 'ATK':
      case 'STR':
        item.params[2] += Math.floor(Math.random() * randomValue);
        break;
      case 'DEF':
        item.params[3] += Math.floor(Math.random() * randomValue);
        break;
      case 'MAT':
      case 'INT':
      case 'SPI':
        item.params[4] += Math.floor(Math.random() * randomValue);
        break;
      case 'MDF':
      case 'RES':
        item.params[5] += Math.floor(Math.random() * randomValue);
        break;
      case 'AGI':
      case 'SPD':
        item.params[6] += Math.floor(Math.random() * randomValue);
        break;
      case 'LUK':
        item.params[7] += Math.floor(Math.random() * randomValue);
        break;
      case 'ALL':
        for (var i = 0; i < 8; ++i) {
          item.params[i] += Math.floor(Math.random() * randomValue);
        }
        break;
      case 'CURRENT':
        for (var i = 0; i < 8; ++i) {
          if (item.params[i] === 0) continue;
          item.params[i] += Math.floor(Math.random() * randomValue);
        }
        break;
      case 'SLOT':
      case 'SLOTS':
        item.upgradeSlots += Math.floor(Math.random() * randomValue);
        break;
    }
};

ItemManager.effectIUSResetStat = function(item, stat) {
    if (Imported.YEP_X_AttachAugments) {
      var augments = this.removeAllAugments(item);
    }
    var baseItem = DataManager.getBaseItem(item);
    switch (stat) {
      case 'HP':
      case 'MAXHP':
      case 'MAX HP':
        item.params[0] = baseItem.params[0];
        break;
      case 'MP':
      case 'MAXMP':
      case 'MAX MP':
      case 'SP':
      case 'MAXSP':
      case 'MAX SP':
        item.params[1] = baseItem.params[1];
        break;
      case 'ATK':
      case 'STR':
        item.params[2] = baseItem.params[2];
        break;
      case 'DEF':
        item.params[3] = baseItem.params[3];
        break;
      case 'MAT':
      case 'INT':
      case 'SPI':
        item.params[4] = baseItem.params[4];
        break;
      case 'MDF':
      case 'RES':
        item.params[5] = baseItem.params[5];
        break;
      case 'AGI':
      case 'SPD':
        item.params[6] = baseItem.params[6];
        break;
      case 'LUK':
        item.params[7] = baseItem.params[7];
        break;
      case 'ALL':
        for (var i = 0; i < 8; ++i) {
          item.params[i] = baseItem.params[i];
        }
        break;
      case 'CURRENT':
        for (var i = 0; i < 8; ++i) {
          if (item.params[i] === 0) continue;
          item.params[i] = baseItem.params[i];
        }
        break;
      case 'BOOST':
      case 'BOOST COUNT':
        item.boostCount = 0;
        this.updateItemName(item);
        break;
      case 'SLOT':
      case 'SLOTS':
        if (item.originalUpgradeSlots) {
          item.upgradeSlots = baseItem.originalUpgradeSlots;
        } else {
          item.upgradeSlots = baseItem.upgradeSlots;
        }
        item.slotsApplied = [];
        item.boostCount = 0;
        this.updateItemName(item);
        break;
      case 'BASE NAME':
        item.baseItemName = baseItem.name;
        this.updateItemName(item);
        break;
      case 'ICON':
        item.iconIndex = baseItem.iconIndex;
        break;
      case 'PRIORITY NAME':
        item.priorityName = '';
        this.updateItemName(item);
        break;
      case 'PREFIX':
        item.namePrefix = '';
        this.updateItemName(item);
        break;
      case 'SUFFIX':
        item.nameSuffix = '';
        this.updateItemName(item);
        break;
      case 'FULL':
        var id = item.id;
        var item = JsonEx.makeDeepCopy(baseItem);
        item.id = id;
        if (DataManager.isItem(baseItem)) $dataItems[id] = item;
        if (DataManager.isWeapon(baseItem)) $dataWeapons[id] = item;
        if (DataManager.isArmor(baseItem)) $dataArmors[id] = item;
        ItemManager.setNewIndependentItem(baseItem, item);
        this._fullReset = true;
        this._resetItem = item;
        break;
    }
    if (Imported.YEP_X_AttachAugments) {
      this.installAugments(item, augments);
    }
};

ItemManager.effectIUSParamRateChange = function(item, stat, value) {
    var baseItem = DataManager.getBaseItem(item);
    switch (stat) {
      case 'HP':
      case 'MAXHP':
      case 'MAX HP':
        item.params[0] += value * 0.01 * baseItem.params[0];
        break;
      case 'MP':
      case 'MAXMP':
      case 'MAX MP':
      case 'SP':
      case 'MAXSP':
      case 'MAX SP':
        item.params[1] += value * 0.01 * baseItem.params[1];
        break;
      case 'ATK':
      case 'STR':
        item.params[2] += value * 0.01 * baseItem.params[2];
        break;
      case 'DEF':
        item.params[3] += value * 0.01 * baseItem.params[3];
        break;
      case 'MAT':
      case 'INT':
      case 'SPI':
        item.params[4] += value * 0.01 * baseItem.params[4];
        break;
      case 'MDF':
      case 'RES':
        item.params[5] += value * 0.01 * baseItem.params[5];
        break;
      case 'AGI':
      case 'SPD':
        item.params[6] += value * 0.01 * baseItem.params[6];
        break;
      case 'LUK':
        item.params[7] += value * 0.01 * baseItem.params[7];
        break;
      case 'ALL':
        for (var i = 0; i < 8; ++i) {
          item.params[i] += value * 0.01 * baseItem.params[i];
        }
        break;
      case 'CURRENT':
        for (var i = 0; i < 8; ++i) {
          if (item.params[i] === 0) continue;
          item.params[i] += value * 0.01 * baseItem.params[i];
        }
        break;
      case 'SLOT':
      case 'SLOTS':
        item.upgradeSlots += value * 0.01 * baseItem.upgradeSlots;
        break;
    }
};

ItemManager.effectIUSParamChange = function(item, stat, value) {
    switch (stat) {
      case 'HP':
      case 'MAXHP':
      case 'MAX HP':
        item.params[0] += value;
        break;
      case 'MP':
      case 'MAXMP':
      case 'MAX MP':
      case 'SP':
      case 'MAXSP':
      case 'MAX SP':
        item.params[1] += value;
        break;
      case 'ATK':
      case 'STR':
        item.params[2] += value;
        break;
      case 'DEF':
        item.params[3] += value;
        break;
      case 'MAT':
      case 'INT':
      case 'SPI':
        item.params[4] += value;
        break;
      case 'MDF':
      case 'RES':
        item.params[5] += value;
        break;
      case 'AGI':
      case 'SPD':
        item.params[6] += value;
        break;
      case 'LUK':
        item.params[7] += value;
        break;
      case 'ALL':
        for (var i = 0; i < 8; ++i) { item.params[i] += value; }
        break;
      case 'CURRENT':
        for (var i = 0; i < 8; ++i) {
          if (item.params[i] === 0) continue;
          item.params[i] += value;
        }
        break;
      case 'SLOT':
      case 'SLOTS':
        item.upgradeSlots += value;
        break;
    }
};

ItemManager.effectIUSSuffix = function(item, value) {
    this.setNameSuffix(item, value);
    this.updateItemName(item);
};

ItemManager.effectIUSTextColor = function(item, value) {
    item.textColor = value;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.IUS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.IUS.Game_System_initialize.call(this);
    this.initItemUpgradeSlots();
};

Game_System.prototype.initItemUpgradeSlots = function() {
    this._itemUpgradeShow = true;
    this._itemUpgradeEnabled = true;
};

Game_System.prototype.itemUpgradeShow = function() {
    if (this._itemUpgradeShow === undefined) this.initItemUpgradeSlots();
    return this._itemUpgradeShow;
};

Game_System.prototype.itemUpgradeEnabled = function() {
    if (this._itemUpgradeEnabled === undefined) this.initItemUpgradeSlots();
    return this._itemUpgradeEnabled;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.IUS.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.IUS.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'ShowItemUpgrade') {
      $gameSystem._itemUpgradeShow = true;
    }
    if (command === 'HideItemUpgrade') {
      $gameSystem._itemUpgradeShow = false;
    }
    if (command === 'DisableItemUpgrade') {
      $gameSystem._itemUpgradeEnabled = false;
    }
    if (command === 'EnableItemUpgrade') {
      $gameSystem._itemUpgradeEnabled = true;
    }
};

//=============================================================================
// Window_ItemInfo
//=============================================================================

Yanfly.IUS.Window_ItemInfo_drawItemInfoD =
    Window_ItemInfo.prototype.drawItemInfoD;
Window_ItemInfo.prototype.drawItemInfoD = function(dy) {
    dy = Yanfly.IUS.Window_ItemInfo_drawItemInfoD.call(this, dy);
    dy = this.drawSlotsInfo(dy);
    dy = this.drawSlotUpgradesUsed(dy);
    return dy;
};

Window_ItemInfo.prototype.drawSlotsInfo = function(dy) {
    var item = this._item;
    var baseItem = DataManager.getBaseItem(item);
    if (!item.slotsApplied) ItemManager.initSlotUpgradeNotes(item);
    if (!DataManager.isIndependent(item)) return dy;
    if (baseItem.upgradeSlots <= 0) return dy;
    if (Yanfly.Param.IUSSlotsText === '') return dy;
    var dx = this.textPadding();
    var dw = this.contents.width - this.textPadding() * 2;
    this.resetFontSettings();
    this.changeTextColor(this.systemColor());
    var success = 80 - Yanfly.Param.SuccessRate * item.slotsApplied.length + $gameParty.leader().luk / 3;
    success = Math.round(success * 10).clamp(0, 1000) / 10;
    var text = Yanfly.Param.IUSSlotsText + '(成功率：' + success + '%)';
    this.drawText(text, dx, dy, dw);
    if (item.originalUpgradeSlots) {
      text = '/' + Yanfly.Util.toGroup(item.originalUpgradeSlots);
    } else {
      text = '/' + Yanfly.Util.toGroup(baseItem.upgradeSlots);
    }
    this.changeTextColor(this.normalColor());
    this.drawText(text, dx, dy, dw, 'right');
    dw -= this.textWidth(text);
    text = Yanfly.Util.toGroup(item.upgradeSlots);
    if (item.upgradeSlots <= 0) this.changeTextColor(this.powerDownColor());
    this.drawText(text, dx, dy, dw, 'right');
    return dy + this.lineHeight();
};

Window_ItemInfo.prototype.drawSlotUpgradesUsed = function(dy) {
    var item = this._item;
    var baseItem = DataManager.getBaseItem(item);
    if (!item.slotsApplied) ItemManager.initSlotUpgradeNotes(item);
    if (!DataManager.isIndependent(item)) return dy;
    if (baseItem.upgradeSlots <= 0) return dy;
    if (!eval(Yanfly.Param.IUSShowSlots)) return dy;
    if (item.slotsApplied.length <= 0) return dy;
    var dx = this.textPadding();
    var fmt = Yanfly.Param.IUSSlotFmt;
    for (var i = 0; i < item.slotsApplied.length; ++i) {
      var text = fmt.format(i + 1, item.slotsApplied[i]);
      this.drawTextEx(text, dx, dy);
      dy += this.lineHeight();
    }
    this.resetFontSettings();
    return dy;
};

//=============================================================================
// Window_ItemActionCommand
//=============================================================================

Yanfly.IUS.Window_ItemActionCommand_addCustomCommandsD =
    Window_ItemActionCommand.prototype.addCustomCommandsD;
Window_ItemActionCommand.prototype.addCustomCommandsD = function() {
    Yanfly.IUS.Window_ItemActionCommand_addCustomCommandsD.call(this);
    this.addUpgradeCommand();
};

Window_ItemActionCommand.prototype.addUpgradeCommand = function() {
    if (Yanfly.Param.IUSUpgradeCmd === '') return;
    if (!$gameSystem.itemUpgradeShow()) return;
    var enabled = DataManager.isIndependent(this._item);
    if (eval(Yanfly.Param.IUSShowOnly) && !enabled) return;
    if (!$gameSystem.itemUpgradeEnabled()) enabled = false;
    if (this._item.upgradeSlots == 0) enabled = false;
    var fmt = Yanfly.Param.IUSUpgradeCmd;
    text = '\\i[' + this._item.iconIndex + ']';
    if (this._item.textColor !== undefined) {
      text += '\\c[' + this._item.textColor + ']';
    }
    text += this._item.name;
    text = fmt.format(text);
    this.addCommand(text, 'upgrade', enabled);
};

//=============================================================================
// Window_UpgradeItemList
//=============================================================================

function Window_UpgradeItemList() {
    this.initialize.apply(this, arguments);
}

Window_UpgradeItemList.prototype = Object.create(Window_ItemList.prototype);
Window_UpgradeItemList.prototype.constructor = Window_UpgradeItemList;

Window_UpgradeItemList.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this.hide();
    this.deactivate();
};

Window_UpgradeItemList.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
    this.resetScroll();
    this.select(0);
};

Window_UpgradeItemList.prototype.includes = function(item) {
    if (!item) return false;
    if (!this.containsType(item)) return false;
    if (!item.upgradeEffect) ItemManager.initSlotUpgradeNotes(item);
    return item.upgradeEffect.length > 0
};

Window_UpgradeItemList.prototype.containsType = function(item) {
    if (!item.upgradeWeaponType) ItemManager.initSlotUpgradeNotes(item);
    if (DataManager.isItem(this._item)) {
      var array1 = item.upgradeItemType;
      if (array1.contains('ALL')) return true;
      var array2 = this._item.types;
      var array3 = array1.filter(function(n) {
        return array2.indexOf(n) != -1
      });
      if (array3.length && array3.length > 0) return true;
    }
    if (DataManager.isWeapon(this._item)) {
      if (item.upgradeWeaponType.contains(0)) return true;
      if (item.upgradeWeaponType.contains(this._item.wtypeId)) return true;
    }
    if (DataManager.isArmor(this._item)) {
      if (item.upgradeArmorType.contains(0)) return true;
      if (item.upgradeArmorType.contains(this._item.atypeId)) return true;
    }
    return false;
};

Window_UpgradeItemList.prototype.isEnabled = function(item) {
    if (!item) return false;
    return this._item.upgradeSlots >= item.upgradeSlotCost;
};

Window_UpgradeItemList.prototype.selectLast = function() {
};

Window_UpgradeItemList.prototype.playOkSound = function() {
    if (!this.item()) return;
    var sound = {
      name:   this.item().upgradeSound,
      volume: 100,
      pitch:  100,
      pan:    100
    };
    AudioManager.playSe(sound);
};

Window_UpgradeItemList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
    if (this.includes(null)) this._data.push(null);
};

//=============================================================================
// Scene_Item
//=============================================================================

Yanfly.IUS.Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function() {
    Yanfly.IUS.Scene_Item_createItemWindow.call(this);
    this.createUpgradeListWindow();
};

Yanfly.IUS.Scene_Item_createActionWindow =
    Scene_Item.prototype.createActionWindow;
Scene_Item.prototype.createActionWindow = function() {
    Yanfly.IUS.Scene_Item_createActionWindow.call(this);
    this._itemActionWindow.setHandler('upgrade',
      this.onActionUpgrade.bind(this));
};

Scene_Item.prototype.createUpgradeListWindow = function() {
    var wy = this._itemWindow.y;
    var ww = this._itemWindow.width;
    var wh = this._itemWindow.height;
    this._upgradeListWindow = new Window_UpgradeItemList(0, wy, ww, wh);
    this._upgradeListWindow.setHelpWindow(this._helpWindow);
    this._upgradeListWindow.setHandler('ok', this.onUpgradeListOk.bind(this));
    this._upgradeListWindow.setHandler('cancel',
      this.onUpgradeListCancel.bind(this));
    this.addWindow(this._upgradeListWindow);
};

Scene_Item.prototype.onActionUpgrade = function() {
    this._itemActionWindow.hide();
    this._itemActionWindow.deactivate();
    this._upgradeListWindow.show();
    this._upgradeListWindow.activate();
    this._upgradeItem = this.item();
    this._upgradeListWindow.setItem(this.item());
};

Scene_Item.prototype.onUpgradeListOk = function() {
    var effectItem = this._upgradeListWindow.item();
    if (this.SuccessRate()) {
        if (Imported.PlayOnline && this._upgradeItem.slotsApplied.length + 1 >= Yanfly.Param.SendLevel) {
            var SendWord = Yanfly.Param.SendWord.replace('%1', this._upgradeItem.baseItemName);
            SendWord = SendWord.replace('%2', this._upgradeItem.slotsApplied.length + 1);
            DataManager.SendText(SendWord, '系统');
        }
        this.createAnimeWindow(Yanfly.Param.AnimationId1);
        ItemManager.applyIUSEffects(this._upgradeItem, effectItem)
        if (ItemManager._fullReset) return this.onUpgradeFullReset();
    } else {
        this.createAnimeWindow(Yanfly.Param.AnimationId2);
        $gameParty.loseItem(effectItem, 1);
    }
    if (Imported.PlayOnline) {
        $gameSystem.onBeforeSave();
        DataManager.SaveWeb(PlayOnline.UserName);
    }
    setTimeout(function() {
        this._upgradeListWindow.refresh();
        this._upgradeListWindow.activate();
        this._statusWindow.refresh();
        this._infoWindow.refresh();
        this._itemWindow.refresh();
        this._itemActionWindow.refresh();
        var index = this._upgradeListWindow.index();
        if (this._upgradeListWindow.maxItems() <= index) {
            index = this._upgradeListWindow.maxItems() - 1;
            this._upgradeListWindow.select(index);
        }
    }.bind(this), Yanfly.Param.SetTimeout);
};

Scene_Item.prototype.onUpgradeFullReset = function() {
    ItemManager._fullReset = false;
    this.onUpgradeListCancel();
    this.onActionCancel();
    this._upgradeListWindow.refresh();
    this._infoWindow.refresh();
    this._itemWindow.refresh();
    this._itemWindow.updateHelp();
    this._itemActionWindow.refresh();
};

Scene_Item.prototype.onUpgradeListCancel = function() {
    this._upgradeListWindow.hide();
    this._upgradeListWindow.deactivate();
    this._itemActionWindow.show();
    this._itemActionWindow.activate();
    this._helpWindow.setItem(this.item());
};

Scene_Item.prototype.SuccessRate = function() {
    var random = Math.randomInt(100);
    var Success = 80 - Yanfly.Param.SuccessRate * this._upgradeItem.slotsApplied.length;
    Success += $gameParty.leader().luk / 3;
    return random <= Success;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// Sprite_MenuAnime
//=============================================================================

function Sprite_MenuAnime() {
    this.initialize.apply(this, arguments);
}

Sprite_MenuAnime.prototype = Object.create(Sprite_Base.prototype);
Sprite_MenuAnime.prototype.constructor = Sprite_MenuAnime;

Sprite_MenuAnime.prototype.initialize = function(scene) {
    Sprite_Base.prototype.initialize.call(this);
    this._scene = scene;
};

Sprite_MenuAnime.prototype.updateAnimeSprites = function() {
    if (this._animationSprites.length > 0) {
        var sprites = this._animationSprites.clone();
        this._animationSprites = [];
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            if (sprite.isPlaying()) {
                this._animationSprites.push(sprite);
            } else {
                sprite.remove();
                this._scene.removeChild(this); 
            }
        }
    }
};

Scene_Base.prototype.createAnimeWindow = function(id, x, y) {
    this._animeWindow = new Sprite_MenuAnime(this);
    this.addChild(this._animeWindow);
    if (!x) var x = (Graphics.boxWidth - this._animeWindow.width) / 2;
    if (!y) var y = (Graphics.boxHeight - this._animeWindow.height) / 2;
    this._animeWindow.move(x, y);
    this._animeWindow.startAnimation($dataAnimations[id], false, 0);
};

};