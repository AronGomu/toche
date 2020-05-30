class Phase {
  phaseNameString;
  nextPhase;

  constructor(phaseNameString, nextPhase) {
    this.phaseNameString = phaseNameString;
    this.nextPhase = nextPhase;
  }
}

class Turn {

  game;

  hasTurnPlayerBool;
  hasPriorityPlayerBool;
  beginningPhaseBool = false;

	phases;
  phase;

  constructor(game) {
    this.game = game;

    let drawPhase = new Phase("draw", null);
    let main1Phase = new Phase("main1", null); 
    let beginCombatPhase = new Phase("begin combat", null);
    let declaringAttackersPhase = new Phase("declaring attackers", null);
    let declaringBlockersPhase = new Phase("declaring blockers", null);
    let damagePhase = new Phase("damage", null); 
    let main2Phase = new Phase("main2", null); 
    let endPhase = new Phase("end", null);

    drawPhase.next = main1Phase;
    main1Phase.next = beginCombatPhase;
    beginCombatPhase.next = declaringAttackersPhase;
    declaringAttackersPhase.next = declaringBlockersPhase;
    declaringBlockersPhase.next = damagePhase;
    damagePhase.next = main2Phase;
    main2Phase.next = endPhase;
    endPhase.next = drawPhase;
    this.phases = [drawPhase,main1Phase,beginCombatPhase,declaringAttackersPhase,declaringBlockersPhase,damagePhase,main2Phase,endPhase];
    this.phase = this.phases[0];
  }

  nextPhase() {
    this.beginningPhaseBool = true;
    if (this.phase.phaseNameString == "end") {
      this.hasTurnPlayerBool = this.hasTurnPlayerBool.opponentPlayer;
      this.hasTurnPlayerBool.haveTurnBool = true;
      this.hasTurnPlayerBool.opponentPlayer.haveTurnBool = false;
    }
    else {
      this.hasPriorityPlayerBool = this.hasPriorityPlayerBool.opponentPlayer;
    }
    this.phase = this.phase.next;
    this.hasTurnPlayerBool.havePriorityBool = true;
    this.hasTurnPlayerBool.opponentPlayer.havePriorityBool = false;
  }

  checkIfPlayable(card, isStackEmptyBool, havePriorityBool) {

    //console.log(card);

    if (havePriorityBool == true) {
      if (isStackEmptyBool == true) {
        if (this.phase.phaseNameString == "main1" || this.phase.phaseNameString == "main2") {
            //console.log("Sorcery is castable");
            return true;
        }
      }
      if (card.instantSpeedPlayableBool == true) {
        //console.log("Instant is castable");
        return true;
      }
    }
    return false;
  }
    
}

module.exports = Turn;