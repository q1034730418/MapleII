var ww = ww || {}


ww.More_MOG_CharPoses = {}


ww.More_MOG_CharPoses.default = 1




ww.More_MOG_CharPoses.set = {
    "$0(f4)": {
        name: "$0(f4)",
        // 帧的设置
        default: 1,
        poses: {
            "jump":{
                name:"jump"
            }, 
            "down":{
                name:"down"
            }, 
            
        }
    },
    "$Bs_0-1(f8)(y25)(S1)": {
        name: "$Bs_0-1(f8)(y25)(S1)",
        // 帧的设置
        default: 1,
        poses: {
            "skill1(f13)":{
                name:"skill1(f13)"
            }, 
        }
    },
}
//cc


ww.More_MOG_CharPoses.isObject = function (o) {
    return o && typeof o == "object"
}

ww.More_MOG_CharPoses.clone = function (that) {
    var obj
    if (that && typeof (that) === "object") {
        if (Array.isArray(that)) { //Object.prototype.toString.call(that) === '[object Array]') { 
            obj = [];
            for (var i = 0; i < that.length; i++) {
                obj[i] = this.clone(that[i]);
            }
            return obj;
        } else {
            obj = {}
            for (var i in that) {
                obj[i] = this.clone(that[i])
            }
            return obj;
        }
    }
    return that;
};

ww.More_MOG_CharPoses.marge = function (baseObj, addObj) {
    // 深度合并对象
    if (this.isObject(baseObj)) {
        if (this.isObject(addObj)) {
            for (var key in addObj) {
                baseObj[key] = this.marge(baseObj[key], addObj[key])
            }
            return baseObj;
        } else {
            return baseObj;
        }
    } else {
        return this.clone(addObj);
    }
};



ww.More_MOG_CharPoses.getName = function (base, type) {
    if (this.set[base]) {
        var set = this.set[base]
        var name = set.name || base || ""

        var t = this.getType(base, type)
        return (name || "") + (t ? "_" : "") + (t || "")
    } else if (this.default) {
        return (base || "") + (type ? "_" : "") + (type || "")
    }
    return ""
}



ww.More_MOG_CharPoses.getType = function (base, type) {
    var name = type || ""
    if (this.set[base]) {
        var set = this.set[base]
        if (type) {
            if (set.poses && set.poses[type]) {
                var set = set.poses[type]
                if (set.name !== "") {
                    name = set.name || type || ""
                } else {
                    name = ""
                }
            }
        }
        return name
    } else if (this.default) {
        return name
    }
    return ""
}


ww.More_MOG_CharPoses._hash = {}
ww.More_MOG_CharPoses.getFrames = function (base, type) {
    var t = this.getNameFrames(this.getType(base, type))
    var b = this.getNameFrames(base)
    return t || b
}


ww.More_MOG_CharPoses.getFrames2 = function (base, type) {
    
    return this.getNameFrames(type) ||this.getNameFrames(base)
}

ww.More_MOG_CharPoses.getNameFrames = function (name) {
    var name = name || ""
    if (name) {
        if (!this._hash[name]) {
            var h = false
            var f = {}
            var frames = name.match(/(\(F(\d+\.*\d*))/i)
            if (frames) {
                var h = 1
                f.enabled = true;
                f.index = 0;
                f.max = Number(frames[2]);
            }
            var ex = name.match(/(X(\d+\.*\d*))/i)
            if (ex) {
                var h = 1
                f.x = Number(ex[2])
            };
            var ey = name.match(/(Y(\d+\.*\d*))/i)
            if (ey) {
                var h = 1
                f.y = Number(ey[2])
            };
            var sp = name.match(/(S(\d+\.*\d*))/i)
            if (sp) {
                var h = 1
                f.speed = Number(sp[2])
            };
            this._hash[name] = h ? f : 1
        }
        if (this._hash[name] != 1) {
            return this._hash[name]
        }
    }
}


/**读取 */
ww.More_MOG_CharPoses.read = function (name) {
    if (name) {
        return ("" + name).split("_")
    } else {
        return ["", ""]
    }
}



ww.More_MOG_CharPoses.readGetFrame = function (name) {
    var l = this.read(name)
    //console.log(l)
    return this.getFrames2(l[0], l[1])
}

Game_CharacterBase.prototype.getMorePose = function (type) {
    return ww.More_MOG_CharPoses.getName(this._originalName.name, type)
};
 
Game_CharacterBase.prototype.maxPatternABS = function () {
    if (Imported.MOG_CharPoses) {
        return this._frames.max;
    } else {
        return this._user.poseMaxPattern;
    };
};