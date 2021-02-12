/*:
* @plugindesc 随机属性物品系统
* @author MaRcoLi Revise by Fanzi
*
* @param ---DataSet---
* @default
*
* @param EqDataStart
* @parent ---DataSet---
* @type number
* @min 0
* @desc 独立物品在数据库的起始位置
* @default 100
*
* @param RamWeaponsStart
* @parent ---DataSet---
* @type number
* @min 0
* @desc 随机武器在数据库的起始位置
* @default 11
*
* @param RamWeaponsEnd
* @parent ---DataSet---
* @type number
* @min 0
* @desc 随机武器在数据库的结束位置
* @default 15
*
* @param RamArmorsStart
* @parent ---DataSet---
* @type number
* @min 0
* @desc 随机护甲在数据库的起始位置
* @default 11
*
* @param RamArmorsEnd
* @parent ---DataSet---
* @type number
* @min 0
* @desc 随机护甲在数据库的结束位置
* @default 15
*
* @param ---RandomParam---
* @default
*
* @param Max RandomNum
* @parent ---RandomParam---
* @type number
* @min 0
* @desc ‘基础随机值’最大累加次数
* @default 4
*
* @param RandomLv
* @parent ---RandomParam---
* @type number
* @min 0
* @desc 每‘几级’增加一次‘基础随机值’
* @default 5
*
* @param Random ParamMax
* @parent ---RandomParam---
* @type number
* @min 0
* @desc ‘基础随机值’最大值计算方式：
* 当前等级 / RandomLv * ParamMax + ParamMax 来计算的
* @default 4
*
* @param Random LifeMax
* @parent ---RandomParam---
* @type number
* @min 0
* @desc 随机最大生命值 同上随等级累加
* @default 20
*
* @param Random ManaMax
* @parent ---RandomParam---
* @type number
* @min 0
* @desc 随机最大法力值 同上随等级累加
* @default 20
*
* @param Random HitMax
* @parent ---RandomParam---
* @type number
* @min 0
* @desc 追加能力值的最大随机值
* @default 5
*
* @param ---DropSet---
* @default
*
* @param Pick
* @parent ---DropSet---
* @type number
* @min 0
* @desc 战斗胜利额外掉落随机装备数量
* @default 5
*
* @param pickRate
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc 掉落几率 默认 60% 填1 为1% 以下百分比皆同理
* @default 60
*
* @param NormalNum
* @parent ---DropSet---
* @type number
* @min 0
* @desc 普通品质附加属性数量  默认 1
* @default 1
*
* @param SuperiorNum
* @parent ---DropSet---
* @type number
* @min 0
* @desc 精良品质附加属性数量  默认 2
* @default 2
*
* @param RumorNum
* @parent ---DropSet---
* @type number
* @min 0
* @desc 传说品质附加属性数量  默认 3
* @default 3
*
* @param RareNum
* @parent ---DropSet---
* @type number
* @min 0
* @desc 稀有品质附加属性数量  默认 4
* @default 4
*
* @param UniqueNum
* @parent ---DropSet---
* @type number
* @min 0
* @desc 史诗品质附加属性数量  默认 5
* @default 5
*
* @param SuperiorRate
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc 精良品质掉落几率  默认 40%
* @default 40
*
* @param RumorRate
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc 传说品质掉落几率  默认 20%
* @default 20
*
* @param RareRate
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc 稀有品质掉落几率  默认 10%
* @default 10
*
* @param UniqueRate
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc 史诗品质掉落几率  默认 5%
* @default 5
*
* @param RankBestRate
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc 极品级掉落几率  默认 10%
* @default 10
*
* @param RankBetterRate
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc 精华级掉落几率  默认 15%
* @default 15
*
* @param RankGoodRate
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc 优良级掉落几率  默认 20%
* @default 20
*
* @param LuckPercent
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc ‘幸运’百分比加成到 橙|黄|蓝 的掉落里  默认 30%
* @default 30
*
* @param RankBestAdd
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc 极品级 伤害|护甲 加成  默认 25%
* @default 25
*
* @param RankBetterAdd
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc 精华级 伤害|护甲 加成  默认 15%
* @default 15
*
* @param RankGoodAdd
* @parent ---DropSet---
* @type number
* @min 0
* @max 100
* @desc 优良级 伤害|护甲 加成  默认 10%
* @default 10
*
* @param 前缀命名
* @desc 给独立装备自定义前缀名字(用英文逗号隔开)
* @default 生命之,魔法之,攻击之,防御之,法术之,符文之,敏捷之,幸运之,命中之,闪避之,暴击之,暴闪之,魔闪之,回血之,回气之
*
* @help
* ==============================帮助文件=============================
* 参数的使用: 
* <Random Item>
* <Drop Lv: x>
* <No Random>
* <Item Rank: x>
* <Quality: Unique|Rare|Rumor|Superior|Normal>
* 以上用于复制 书写 不用区分大小写
* <Random Item>     完全随机物品 该物品能随机成 武器 或 护甲
* <Drop Lv: x>      随机物品最低掉落等级 x 为设置等级(给不想过早掉落的物品)
* <No random>       物品不随机(设置自定义的物品)
* <Item Rank: x>    给不随机物品添加 0=一般 1=优秀 2=精华 3=极品
* <Quality: Unique|Rare|Rumor|Superior|Normal>
* 给不随机物品添加品质 普通(白色) 精良(绿色) 传说(蓝色) 稀有(紫色) 史诗(金色)
*
* 本插件可随机出所有常规能力值与七项追加能力值共十五个属性，白色品质只能
* 随机出前六项常规能力值，绿色品质可随机出全部常规能力值，蓝色品质可额外
* 随机出前三项追加能力值，紫色品质可额外随机出前五项追加能力值，金色品质
* 可额外随机出生命回复与魔法回复两项追加能力值。所有随机属性均分四个等级
* 绿色品质以上装备名字加前缀，以最高等级属性的对应前缀命名。注意最后两个
* 命名参数的命名顺序与长度要与默认保持一致。
*/

var Mac = Mac || {};
Mac.Item = Mac.Item || {};
Mac.Parameters = PluginManager.parameters('Mac_Item');
Mac.Param = Mac.Param || {};
Mac.Drop = Mac.Drop || {};

Mac.Item.EqDataStart = Number(Mac.Parameters['EqDataStart']);
Mac.Item.RamWeaponsStart = Number(Mac.Parameters['RamWeaponsStart']);
Mac.Item.RamWeaponsEnd = Number(Mac.Parameters['RamWeaponsEnd']) + 1;
Mac.Item.RamArmorsStart = Number(Mac.Parameters['RamArmorsStart']);
Mac.Item.RamArmorsEnd = Number(Mac.Parameters['RamArmorsEnd']) + 1;
Mac.Item.PreName = Mac.Parameters['前缀命名'].split(',');

Mac.Param.ItemRamLv = Number(Mac.Parameters['RandomLv']);
Mac.Param.ItemRamParamMax = Number(Mac.Parameters['Random ParamMax']);
Mac.Param.ItemMaxRamNum = Number(Mac.Parameters['Max RandomNum']);
Mac.Param.ItemRamLifeMax = Number(Mac.Parameters['Random LifeMax']);
Mac.Param.ItemRamManaMax = Number(Mac.Parameters['Random ManaMax']);
Mac.Param.ItemRamHitMax = Number(Mac.Parameters['Random HitMax']);

Mac.Drop.pick = Number(Mac.Parameters['Pick']);
Mac.Drop.pickRate = Number(Mac.Parameters['pickRate']);
Mac.Drop.UniqueRate = 100 / Number(Mac.Parameters['UniqueRate']);
Mac.Drop.RareRate = 100 / Number(Mac.Parameters['RareRate']);
Mac.Drop.RumorRate = 100 / Number(Mac.Parameters['RumorRate']);
Mac.Drop.SuperiorRate = 100 / Number(Mac.Parameters['SuperiorRate']);

Mac.Drop.UniqueNum = Number(Mac.Parameters['UniqueNum']);
Mac.Drop.RareNum = Number(Mac.Parameters['RareNum']);
Mac.Drop.RumorNum = Number(Mac.Parameters['RumorNum']);
Mac.Drop.SuperiorNum = Number(Mac.Parameters['SuperiorNum']);
Mac.Drop.NormalNum = Number(Mac.Parameters['NormalNum']);

Mac.Drop.RankBestRate = Number(Mac.Parameters['RankBestRate']);
Mac.Drop.RankBetterRate = Number(Mac.Parameters['RankBetterRate']);
Mac.Drop.RankGoodRate = Number(Mac.Parameters['RankGoodRate']);
Mac.Drop.LuckPercent = Number(Mac.Parameters['LuckPercent']) / 100;
Mac.Drop.RankBestAdd = Number(Mac.Parameters['RankBestAdd']) / 100;
Mac.Drop.RankBetterAdd = Number(Mac.Parameters['RankBetterAdd']) / 100;
Mac.Drop.RankGoodAdd = Number(Mac.Parameters['RankGoodAdd']) / 100;

Mac.Item.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Mac.Item.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Mac._loaded_Mac_Item) {
        EqManager.setEqDatabase();
        Mac._loaded_Mac_Item = true;
    } 
    return true;
};

Mac.Item.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    Mac.Item.DataManager_createGameObjects.call(this);
    EqManager.createIndependentGroups();
    EqManager.loadIndependentItems();
};
//==============================================
/**制作保存内容 */
Mac.Item.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = Mac.Item.DataManager_makeSaveContents.call(this);
    contents.Macitems = EqManager._independentItems;
    contents.Macweapons = EqManager._independentWeapons;
    contents.Macarmors = EqManager._independentArmors;
    return contents;
};
/**提取保存内容 */
Mac.Item.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    Mac.Item.DataManager_extractSaveContents.call(this, contents);
    EqManager._independentItems = contents.Macitems || [];
    EqManager._independentWeapons = contents.Macweapons || [];
    EqManager._independentArmors = contents.Macarmors || [];
    //读取独立物品
    EqManager.loadIndependentItems();
};

function EqManager() {
    throw new Error('This is a static class');
};

//==============设置初始的数据库=====================
EqManager.setEqDatabase = function() {
    this._baseItemsLength   = $dataItems.length;
    this._baseWeaponsLength = $dataWeapons.length;
    this._baseArmorsLength  = $dataArmors.length;
    this._baseWeapons = $dataWeapons.slice(Mac.Item.RamWeaponsStart, Mac.Item.RamWeaponsEnd);
    this._baseArmors = $dataArmors.slice(Mac.Item.RamArmorsStart, Mac.Item.RamArmorsEnd);
    this.setItemNote();
};
EqManager.setItemNote = function() {
    this.loadItemNote($dataWeapons);
    this.loadItemNote($dataArmors);
};
EqManager.loadItemNote = function(group) {
    var note1 = /<(?:no random)>/i;
    var note2 = /<(?:quality): (Unique|Rare|Rumor|Superior|Normal)>/i;
    var note3 = /<(?:random item)>/i;
    var note4 = /<(?:item rank):[ ](\d+)>/i;
    var note5 = /<(?:drop lv):[ ](\d+)>/i;
    for (var i = 1; i < group.length; i++) {
        var obj = group[i];
        var notedata = obj.note.split(/[\r\n]+/);
        for (var j = 0; j < notedata.length; j++) {
            var line = notedata[j];
            if (line.match(note1)) {
                obj._random = false;
            } else if (line.match(note2)) {
                var quality = RegExp.$1;
                this.loadNoteQuality(quality, obj);
            } else if (line.match(note3)) {
                obj._randomItem = true;
            } else if (line.match(note4)) {
                obj._rank = parseInt(RegExp.$1);
            } else if (line.match(note5)) {
                obj._droplv = parseInt(RegExp.$1);
            }
        }
    }
};
EqManager.loadNoteQuality = function(quality, obj) {
    var note1 = /Unique/i;
    var note2 = /Rare/i;
    var note3 = /Rumor/i;
    var note4 = /Superior/i;
    if (quality.match(note1)) {
        obj._quality = 'Unique';
    } else if (quality.match(note2)) {
        obj._quality = 'Rare';
    } else if (quality.match(note3)) {
        obj._quality = 'Rumor';
    } else if (quality.match(note4)) {
        obj._quality = 'Superior';
    } else {
        obj._quality = 'Normal';
    }
};
//==============================================
EqManager.createIndependentGroups = function() {	
    this._independentItems = [];
    this._independentWeapons = [];
    this._independentArmors = []; 
};
//读取独立物品
EqManager.loadIndependentItems = function() {
    $dataWeapons.splice(this._baseWeaponsLength);
    this.setIndependentLength($dataWeapons);
    $dataWeapons = $dataWeapons.concat(this._independentWeapons);
//删除基础以外的数据 在连接 存储的数据
    $dataArmors.splice(this._baseArmorsLength);
    this.setIndependentLength($dataArmors);
    $dataArmors = $dataArmors.concat(this._independentArmors);
};
//用死循环来增加NULL数组
EqManager.setIndependentLength = function(group) {
    for (;;) {
        if (group.length > Mac.Item.EqDataStart) break;
        group.push(null);
    }
};
//=================随机掉落以及物品设置================================

EqManager.RandomDrop = function() {
    this._dropedItem=[];
    for (var i = 1; i <= Mac.Drop.pick; i++) {
        if (this.isDroped()) {
            var newItem = this.CreateItem();
            this._dropedItem.push(newItem);
        } else {
            continue;
        }
    }
};
EqManager.UnRandomDrop = function(items) {
    var eqitem = [];
    var potion = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i]	
        if (EqManager.isIndependent(item)) {
            var newItem = this.CreateItem(item);
            eqitem.push(newItem);
        } else {
            potion.push(item);
        }
    }
    potion = potion.concat(eqitem);
    return potion;
};
EqManager.CreateItem = function(item) {
//幸运值的 30% 加成到MF中 
    this.actorMF = 105 / ($gameParty.allMembers()[0].luk * Mac.Drop.LuckPercent + 100);
    var maxRamNum = Math.floor($gameParty.allMembers()[0]._level / Mac.Param.ItemRamLv);
    if (maxRamNum >= Mac.Param.ItemMaxRamNum) maxRamNum = Mac.Param.ItemMaxRamNum;
    var Rmax = Math.floor(maxRamNum * Mac.Param.ItemRamParamMax) + Mac.Param.ItemRamParamMax;
    var lifemax = Math.floor(maxRamNum * Mac.Param.ItemRamLifeMax) + Mac.Param.ItemRamLifeMax;
    var manamax = Math.floor(maxRamNum * Mac.Param.ItemRamManaMax) + Mac.Param.ItemRamManaMax;
    var hit = Mac.Param.ItemRamHitMax;
//空装备和完全随机装备
    if (!item || item._randomItem === true) {
        var num = Mac_RandomNum(2, 3);
        var itemkind = this.RandomKind(num);
        var baseItem = this.RandomData(itemkind);
        var newItem = JsonEx.makeDeepCopy(baseItem);
        newItem = this.RandomItemRank(baseItem, newItem);
        newItem = this.RandomQuality(newItem);
        newItem = this.RandomParams(newItem, Rmax, lifemax, manamax, hit);
    } else {
//不随机装备
        if (item.Independent === true) return item;
        if (item._random === false) {
            var baseItem = item;
            baseItem = this.isNolDropLv(item);
            var newItem = JsonEx.makeDeepCopy(baseItem);
        } else {
//具体一个物品的随机	
            var baseItem = item;
            baseItem = this.isNolDropLv(item);
            var newItem = JsonEx.makeDeepCopy(baseItem);
            newItem = this.RandomItemRank(baseItem, newItem);
            newItem = this.RandomQuality(newItem);	
            newItem = this.RandomParams(newItem, Rmax, lifemax, manamax, hit);
        }
    }
    this.setNewItem(baseItem, newItem, Rmax, lifemax, manamax, hit);
    return newItem;
};

EqManager.RandomKind = function(num) {
    var kind = null;
    switch (num) {
        case 2: return kind = 'w'; break;
        case 3: return kind = 'a';  break;
    }
};

EqManager.RandomData = function(kind) {
    var data = [];
    var data = this.ItemData(kind);
    var max = data.length - 1;
    var id = Mac_RandomNum(0, max);
    var item = this.isRamDropLv(data, id, max);
    return item;
};

EqManager.isRamDropLv = function(data, id, max) {
    var lv = $gameParty.allMembers()[0]._level;
    for (;;) {
        if (lv >= data[id]._droplv || data[id]._droplv === undefined) break;
        id = Mac_RandomNum(0, max);
    }
    return data[id];
};
EqManager.isNolDropLv = function(item) {
    var lv = $gameParty.allMembers()[0]._level;
    if (DataManager.isWeapon(item)) {
        var data = this._baseWeapons;
    } else {
        var data = this._baseArmors;
    }
    if (lv >= item._droplv || item._droplv === undefined) {
        return item;
    } else {
        var id;
        var max = data.length - 1;
        for (;;) {
            id = Mac_RandomNum(0, max);
            if (lv >= data[id]._droplv || data[id]._droplv === undefined) break;
        }
        return data[id];
    }
};
EqManager.ItemData = function(kind) {
    switch (kind) {
        case 'w': return this._baseWeapons; break;
        case 'a': return this._baseArmors; break;
    }
};

EqManager.RandomItemRank = function(baseItem, newItem) {
    if (this.isBest()) {
        newItem._rank = 3;
        newItem = this.setItemRank(baseItem, newItem, Mac.Drop.RankBestAdd);
        return newItem;
    } else if (this.isBetter()) {
        newItem._rank = 2;
        newItem = this.setItemRank(baseItem, newItem, Mac.Drop.RankBetterAdd);
        return newItem;
    } else if (this.isGood()) {
        newItem._rank = 1;
        newItem = this.setItemRank(baseItem, newItem, Mac.Drop.RankGoodAdd);
        return newItem;
    } else {
        newItem._rank = 0;
        return newItem;
    }
};
EqManager.setItemRank = function(baseItem, newItem, value) {	
    if (DataManager.isWeapon(baseItem)) {
        newItem.params[2] += Math.floor(baseItem.params[2] * value);
        return newItem	
    } else {
        newItem.params[3] += Math.floor(baseItem.params[3] * value);
        return newItem	
    }
};
EqManager.RandomQuality = function(newItem) {
    if (this.isUnique()) {
        newItem._quality = 'Unique';
        return newItem;
    } else if (this.isRare()) {
        newItem._quality = 'Rare';
        return newItem;
    } else if (this.isRumor()) {
        newItem._quality = 'Rumor';
        return newItem;
    } else if (this.isSuperior()) {
        newItem._quality = 'Superior';
        return newItem;
    } else {
        newItem._quality = 'Normal';
        return newItem;
    }
};

EqManager.RandomParams = function(newItem, max, lifemax, manamax, hit) {
    var quality = newItem._quality;
    var ary = [];
    var ParamNum = this.setQuality(quality);
    for (var i = 0; i < ParamNum; i++) {
        if (quality === 'Unique') var paramId = Mac_RandomNum(0, 14);
        else if (quality === 'Rare') var paramId = Mac_RandomNum(0, 12);
        else if (quality === 'Rumor') var paramId = Mac_RandomNum(0, 10);
        else if (quality === 'Superior') var paramId = Mac_RandomNum(0, 7);
        else var paramId = Mac_RandomNum(0, 5);
        paramId = this.isRepeat(paramId, ary, i);
        if (paramId == 0) {
            newItem.params[paramId] += Mac_RandomNum(10, lifemax);
        } else if (paramId == 1) {
            newItem.params[paramId] += Mac_RandomNum(10, manamax);
        } else if (paramId >= 13) {
            var id = this.istraitsParams(newItem, 22, paramId - 6);
            if (id >= 0) {
                var param = Math.floor((newItem.traits[id].value + Mac_RandomNum(1, hit) / 2000) * 1000);
                newItem.traits[id].value = param / 1000;
            } else {
                newItem.traits.push(this.settraitsParams(22, paramId - 6));
            }
        } else if (paramId >= 8) {
            var id = this.istraitsParams(newItem, 22, paramId - 8);
            if (id >= 0) {
                var param = Math.floor((newItem.traits[id].value + Mac_RandomNum(1, hit) / 100) * 100);
                newItem.traits[id].value = param / 100;
            } else {
                newItem.traits.push(this.settraitsParams(22, paramId - 8));
            }
        } else {
            newItem.params[paramId] += Mac_RandomNum(1, max);
        }
        ary.push(paramId); //存取用过的不重复的数
    }
    return newItem;
};
EqManager.istraitsParams = function(newItem, v1, v2) {
    var ary = newItem.traits;
    var length = newItem.traits.length;
    for(var i = 0; i < length; i++){
        if (ary[i].code == v1 && ary[i].dataId == v2) return i;
        else if (ary[i].code == v1 && ary[i].dataId == v2) return i;
        else if (ary[i].code == v1 && ary[i].dataId == v2) return i;
    }
    return -1;
};
EqManager.settraitsParams = function(v1, v2) {
    var obj = {};
    obj.code = v1;
    obj.dataId = v2;
    if (v2 >= 7) obj.value = Mac_RandomNum(1, Mac.Param.ItemRamHitMax) / 2000;
    else obj.value = Mac_RandomNum(1, Mac.Param.ItemRamHitMax) / 100;
    return obj;
};
EqManager.setQuality = function(quality) {
    var num = Math.random() / this.actorMF > 0.8 ? 0 : 1;
    if (quality === 'Unique') return Mac.Drop.UniqueNum + num;
    else if (quality === 'Rare') return Mac.Drop.RareNum + num;
    else if (quality === 'Rumor') return Mac.Drop.RumorNum + num;
    else if (quality === 'Superior') return Mac.Drop.SuperiorNum + num;
    else return Mac.Drop.NormalNum + num;
};

EqManager.isRepeat = function(paramId, ary, i) {
    if (i > 0) {
        for (;;) {
            if (ary.indexOf(paramId) < 0) break;
            paramId = Mac_RandomNum(0, 10);
        }
    }
    return paramId;
};

EqManager.setNewItem = function(baseItem, newItem, Rmax, lifemax, manamax, hit) {
    this.setItemsort(newItem);
    newItem.Independent = true;
    newItem.baseItemId = baseItem.id;
    newItem.baseItemName = baseItem.name;
    newItem.baseItemPrice = baseItem.price;
    var name = this.setNewName(baseItem, newItem, Rmax, lifemax, manamax, hit);
    if (name) newItem.name = name + baseItem.name;
    newItem.note = '';
    this.setDisparams(baseItem, newItem);
    this.setItemId(baseItem, newItem);
};
EqManager.setDisparams = function(baseItem, newItem) {
    if (baseItem._randomItem === true) return;
    if (DataManager.isWeapon(baseItem)) {
        var item = 1;
    } else {var item = 2;}
    newItem._disparams = [];
    var life = [];
    for (var i = 0; i < newItem.params.length; i++) {
        var value = newItem.params[i];
        if (value > 0) {
            if (i <= 1) {
                life.push(TextManager.param(i) + ' ' + value);
            } else {
                if (i == 2) {if (item === 1) value = value - this.loadRank(baseItem, newItem, i);}
                if (i == 3) {if (item === 2) value = value - this.loadRank(baseItem, newItem, i);}
                if (value <= 0) continue;
                newItem._disparams.push(TextManager.param(i) + ' ' + value);
            }
        }
    }
    for (var j = 0; j < 7; j++) {
        if (j >= 5) {
            var index = this.istraitsParams(newItem, 22, j + 2);
            if (index >= 0) {
                if (newItem.traits[index].value > 0) {
                    life.push(Mac_BaseFun.AddParam[j] + ' ' + (newItem.traits[index].value * 1000).toFixed(0) + '‰');
                }
            }
        } else {
            var index = this.istraitsParams(newItem, 22, j);
            if (index >= 0) {
                if (newItem.traits[index].value > 0) {
                    life.push(Mac_BaseFun.AddParam[j] + ' ' + (newItem.traits[index].value * 100).toFixed(0) + '%');
                }
            }
        }
    }
    newItem._disparams = newItem._disparams.concat(life);
};
EqManager.loadRank = function(baseItem, newItem, i) {
    if (newItem._random === false) return baseItem.params[i];
    if (newItem._rank === 3) {
        var base = baseItem.params[i] + Math.floor(baseItem.params[i] * Mac.Drop.RankBestAdd);
        return base;
    } else if (newItem._rank === 2) {
        var base = baseItem.params[i] + Math.floor(baseItem.params[i] * Mac.Drop.RankBetterAdd);
        return base;
    } else if (newItem._rank === 1) {
        var base = baseItem.params[i] + Math.floor(baseItem.params[i] * Mac.Drop.RankGoodAdd);
        return base;
    } else {
        return baseItem.params[i];
    }
};
EqManager.setNewName = function(baseItem, newItem, Rmax, lifemax, manamax, hit) {
    if (newItem._random === false) return;
    if (newItem._quality === 'Normal') return;
    var value1 = 0;
    var id;
    var hitmax = hit / 100;
    for (var i = 0; i < newItem.params.length; i++) {
        var value = newItem.params[i];
        if (value > 0) {
            if (i == 0) {value = value / lifemax;}
            else if (i == 1) {value = value / manamax;}
            else if (i == 2 || i == 3) {value = (value - this.loadRank(baseItem, newItem, i)) / Rmax;}
            else {value = value / Rmax;}
            if (value > value1) {id = i; value1 = value;}
        }
    }
    for (var j = 8; j <= 14; j++) {
        var value = 0;
        if (j >= 13) {
            var index = this.istraitsParams(newItem, 22, j - 6);
            if (index >= 0) {value = newItem.traits[index].value / hitmax;}
        } else {
            var index = this.istraitsParams(newItem, 22, j - 8);
            if (index >= 0) {value = newItem.traits[index].value / hitmax;}
        }
        if (value > value1) {id = j; value1 = value; }
    }
    return Mac.Item.PreName[id];
};
//找到空数组 并把当前数据PUSH进数组
EqManager.setItemId = function(baseItem, newItem) {
    var index = this.getDatabase(baseItem).indexOf(null, 101);
    if (index === -1) {
        newItem.id = this.getDatabase(baseItem).length;
        this.getDatabase(baseItem).push(newItem);
    } else {
        newItem.id = index;
        this.getDatabase(baseItem)[index] = newItem;
    }
    var index2 = this.getContainer(baseItem).indexOf(null); 
    if (index2 === -1) {
        this.getContainer(baseItem).push(newItem);
    } else {
        this.getContainer(baseItem)[index2] = newItem;
    }
};
EqManager.setItemsort = function(newItem) {
    if (newItem._quality === 'Unique') {
        newItem._sort = 1;
    } else if (newItem._quality === 'Rare') {
        newItem._sort = 2;
    } else if (newItem._quality === 'Rumor') {
        newItem._sort = 3;
    } else if (newItem._quality === 'Superior') {
        newItem._sort = 4;
    } else {
        newItem._sort = 5;
        if (!newItem._quality) newItem._quality ='Normal';
    }
};
EqManager.ItemSort = function(a, b) {
    var aa = a._sort;
    var bb = b._sort;
    if (aa < bb) return -1;
    if (aa > bb) return 1;
    return 0;
};
//===============掉率设置===============
EqManager.isDroped = function(rate) {
    return Math.random() * 100 / Mac.Drop.pickRate < 1;
};
EqManager.isUnique = function() {
    return Math.random() * (Mac.Drop.UniqueRate * this.actorMF) < 1;
};
EqManager.isRare = function() {
    return Math.random() * (Mac.Drop.RareRate * this.actorMF ) < 1;
};
EqManager.isRumor = function() {
    return Math.random() * (Mac.Drop.RumorRate * this.actorMF) < 1;
};
EqManager.isSuperior = function() {
    return Math.random() * (Mac.Drop.SuperiorRate * this.actorMF) < 1;
};
//==========================================
EqManager.isBest = function() {
	return Math.random() * 100 / Mac.Drop.RankBestRate < 1;
};
EqManager.isBetter = function() {
	return Math.random() * 100 / Mac.Drop.RankBetterRate < 1;
};
EqManager.isGood = function() {
	return Math.random() * 100 / Mac.Drop.RankGoodRate < 1;
};
//==========================================
EqManager.deleteIndependentItem = function(item) {
    if (!item) return;
    if (this.independentItemIsUsed(item)) return;
    var container = this.getContainer(item);
    var database = this.getDatabase(item);
    var index = container.indexOf(item);
    container[index] = null;
    var index = database.indexOf(item);
    database[index] = null;
};
EqManager.independentItemIsUsed = function(item) {
    if ($gameParty.numItems(item) > 0) return false;
    for (var i = 0; i < $dataActors.length; ++i) {
        var actor = $gameActors.actor(i);
        if (!actor) continue;
        if (actor.equips().contains(item)) return true;
    }
    return false;
};

EqManager.getDatabase = function(item) {
    if (!item) return [];
    if (DataManager.isItem(item)) return $dataItems;
    if (DataManager.isWeapon(item)) return $dataWeapons;
    if (DataManager.isArmor(item)) return $dataArmors;
    return [];
};
EqManager.getContainer = function(item) {
    if (!item) return [];
    if (DataManager.isItem(item)) return this._independentItems;
    if (DataManager.isWeapon(item)) return this._independentWeapons;
    if (DataManager.isArmor(item)) return this._independentArmors;
    return [];
};
EqManager.isIndependent = function(item) {
    if (!item) return false;
    if (DataManager.isBattleTest()) return false; 
    if (DataManager.isItem(item)) return false;
    if (DataManager.isWeapon(item)) return true;
    if (DataManager.isArmor(item)) return true;
    return false;
};
//不包括 已装备独立物品的数量
EqManager.numIndependentItems = function(baseItem) {
    var value = 0;
    if (!this.isIndependent(baseItem)) return $gameParty.numItems(baseItem);
    //通过独立物品获得 基础物品ID
    if (baseItem.Independent) {
        var id = baseItem.baseItemId;
    } else {
        var id = baseItem.id;
    }
    if (DataManager.isWeapon(baseItem)) var group = $gameParty.weapons();
    if (DataManager.isArmor(baseItem)) var group = $gameParty.armors();
    for (var i = 0; i < group.length; ++i) {
        var item = group[i];
        if (!item) continue;
        if (item.baseItemId && item.baseItemId === id) value += 1;
    }
    return value;
};
//====================================
BattleManager.makeRewards = function() {
    EqManager.RandomDrop();
    this._rewards = {};
    this._rewards.gold = $gameTroop.goldTotal();
    this._rewards.exp = $gameTroop.expTotal();
//    this._rewards.items = $gameTroop.makeDropItems();
    this._rewards.items = EqManager.UnRandomDrop($gameTroop.makeDropItems());
    this._rewards.items = this._rewards.items.concat(EqManager._dropedItem);
};

//==============================================
Mac.Item.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    if (EqManager.isIndependent(item)) {
        this.gainMacIndependentItem(item, amount, includeEquip);
    } else {
        Mac.Item.Game_Party_gainItem.call(this, item, amount, includeEquip);
    }
};

Game_Party.prototype.gainMacIndependentItem = function(item, amount, includeEquip) {
    if (amount > 0) {
        for (var i = 0; i < amount; ++i) {
            var newItem = EqManager.CreateItem(item);
            var baseItem = item;
            if (item._randomItem === true) baseItem = newItem;
            this.setNewItemNum(baseItem, newItem);
            // arr.push(newItem);
        }
    } else if (amount < 0) {
        amount = Math.abs(amount);
        for (var i = 0; i < amount; ++i) {
            if (item.Independent === true) {
                //===============移除独立装备=============
                this.removeMacIndependentItem(item, includeEquip);
            } else if (EqManager.isIndependent(item)) {
                //===========根据基础物品移除独立装备=========
                var target = this.basetoNewItem(item, includeEquip);
                if (target !== null && item.id !== target.id) {
                    this.removeMacIndependentItem(target, includeEquip);
                    EqManager.deleteIndependentItem(target);
                } else {
                    //==========移除基本装备=================
                    this.removeMacBaseItem(item, includeEquip);
                }
            }
        }
    }
};

Game_Party.prototype.setNewItemNum = function(baseItem, newItem) {
    var container = this.itemContainer(baseItem);
    if (container) {
        container[newItem.id] = 1;
    }
};

Game_Party.prototype.removeMacIndependentItem = function(item, includeEquip) {
    if (includeEquip && this.checkItemIsMacEquipped(item)) {
        for (var i = 1; i < $gameActors._data.length; ++i) {
            var actor = $gameActors.actor(i);
            if (!actor) continue;
            if (!actor.equips().contains(item)) continue;
            actor.unequipItem(item);
        }
    }
    var container = this.itemContainer(item);
    container[item.id] = 0;
    if (container[item.id] <= 0) delete container[item.id];
};

Game_Party.prototype.checkItemIsMacEquipped = function(item) {
    for (var i = 1; i < $gameActors._data.length; ++i) {
        var actor = $gameActors.actor(i);
        if (!actor) continue;
        if (actor.equips().contains(item)) return true;
    }
    return false;
};
//通过 base的装备ID来获得独立物品
Game_Party.prototype.basetoNewItem = function(baseItem, equipped) {
    if (!baseItem) return null;
    // 这个是 Game_Party.weapons() 按照 party里的ID 读出获得的装备
    if (DataManager.isWeapon(baseItem)) var group = this.weapons();
    if (DataManager.isArmor(baseItem)) var group = this.armors();
    //这整个就是 读出已经装备的 所有角色的物品
    if (equipped) {
        for (var a = 0; a < this.members().length; ++a) {
            var actor = this.members()[a];
            if (!actor) continue;
            if (DataManager.isWeapon(baseItem)) {
                // 这个是 Game_Actor.weapons()  读出 已装备的的物品
                group = group.concat(actor.weapons());
            } else if (DataManager.isArmor(baseItem)) {
                group = group.concat(actor.armors());
            }
        }
    }
    var baseItemId = baseItem.id;
    for (var i = 0; i < group.length; ++i) {
        var item = group[i];
        if (!item) continue;
        if (!item.baseItemId) continue;
        if (item.baseItemId !== baseItemId) continue;
        return item;
    }
    return null;
};

Game_Party.prototype.removeMacBaseItem = function(item, includeEquip) {
    if (includeEquip) this.discardMembersEquip(item, 1);
};

//===================物品排序=====================
Mac.Item.Game_Party_weapons = Game_Party.prototype.weapons;
Game_Party.prototype.weapons = function() {
    var results = Mac.Item.Game_Party_weapons.call(this);
    results.sort(EqManager.ItemSort);
    return results;
};

Mac.Item.Game_Party_armors = Game_Party.prototype.armors;
Game_Party.prototype.armors = function() {
    var results = Mac.Item.Game_Party_armors.call(this);
    results.sort(EqManager.ItemSort);
    return results;
};
//============================================
Game_Actor.prototype.unequipItem = function(item) {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip !== item) continue;
      this.changeEquip(i, null);
    }
};