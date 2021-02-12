var ww = ww || {}


ww.canKnockback = {}

ww.canKnockback.value = 8000


Game_Battler.prototype.loadToolSysNotes = function () {
    this.notetags().forEach(function (note) {
        if (note.toLowerCase() == "disable knockback") {
            this._ras._knockback = false;
        };
        var note_data = note.split(' : ')
        if (note_data[0].toLowerCase() == "knockback") {
            this._canKnockbackValue = Number(note_data[1]);
        };
        if (note_data[0].toLowerCase() == "dead switch id") {
            this._ras.deadSwitchID.push(Number(note_data[1]));
        };
        if (note_data[0].toLowerCase() == "dead variable id") {
            this._ras.deadVariableID.push(Number(note_data[1]));
        };
        if (note_data[0].toLowerCase() == "dead selfswitch id") {
            this._ras.deadSelfSwitchID = String(note_data[1]);
        };
        if (note_data[0].toLowerCase() == "invulnerable actions") {
            var par = note_data[1].split(',');
            for (var i = 0; i < par.length; i++) {
                var actionID = par[i];
                this._ras.invunerableActions.push(actionID)
            };
        };
        if (note_data[0].toLowerCase() == "body size") {
            this._ras.bodySize = Number(note_data[1]);
        };
        if (note_data[0].toLowerCase() == "state icon y-axis") {
            this._ras.iconStateY = Number(note_data[1]);
        };
    }, this);
};

ToolEvent.prototype.collisionAfterHitBattler = function (char, battler, oldHP) {
    if (oldHP > battler._hp) {
        if (this.needScreenShake()) { this.executeScreenShake() };
        var ch = oldHP - battler._hp
        if (battler._canKnockbackValue !== undefined) {
            if (ch > battler._canKnockbackValue) {
                if (this.canKnockback(char, battler)) { this.executeKnockback(char, battler) };
            }
        } else {
            if (ch > ww.canKnockback.value) {
                if (this.canKnockback(char, battler)) { this.executeKnockback(char, battler) };
            }
        }
    };
    if ($gameSystem.isChronoMode() && battler.isActor()) {
        if (this.needClearCooperationSkill(char, battler)) {
            $gameChrono.clearCooperationSkill(battler._chrono.action);
        };
        $gameTemp._chrono.refreshWindow = true
    };
    if (battler.isDead()) { this.afterDead(char, battler) };
    this.collisionSprite(char, oldHP);
    if (this.needForceClearCommand()) { this.forceClearCommand() };
    if (this.needChainHitAction(char, battler)) { this.setChainHitAction(char, battler) };
    if (!battler.canMove()) { char._stepAnime = false };
};



Game_Chrono.prototype.executeTouchDamage = function (user, target) {
    if (target.battler()._ras.collisionD > 0) { return };
    if (this.isGuardingDirectionTouch(user, target)) {
        this.executeGuardTouch(user, target);
        return
    };
    var subject = user.battler();
    var action = new Game_Action(subject);
    action.setAbsSubject(subject)
    var oldHP = target.battler()._hp;
    var coop = [];
    var skillId = user.battler().attackSkillId();
    action.setSkill(skillId);
    action.applyCN(target.battler(), coop);
    target.battler().startDamagePopup();
    target.battler()._ras.collisionD = 30;
    var battler = target.battler()
    if (oldHP > battler._hp) {

        var ch = oldHP - battler._hp
        var can = false
        if (battler._canKnockbackValue !== undefined) {
            if (ch > battler._canKnockbackValue) {
                can = true
            }
        } else {
            if (ch > ww.canKnockback.value) {
                can = true 
            }
        }
        this.executeTouchTouchAfterHit(user, target, skillId,can);
    };
};



Game_Chrono.prototype.executeTouchTouchAfterHit = function (user, target, skillId, can) {
    if (can && target.canKnockback(target)) {
        target.clearActing();
        target.turnTowardCharacter(user);
        target.jump(0, 0)
        target.moveBackward();
        target.battler()._ras.knockback[1] = 55;
        target.battler()._ras.collisionD = 60;
    };
    var skill = $dataSkills[skillId];
    if (skill) {
        var aniID = $dataSkills[skillId].animationId;
        if (aniID) {
            target.requestAnimation(aniID)
        };
    };
};