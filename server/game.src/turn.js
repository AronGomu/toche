class Phase {
  phaseNameString;
  nextPhase;

  constructor(phaseNameString, nextPhase) {
    this.phaseNameString = phaseNameString;
    this.nextPhase = nextPhase;
  }
}

class Turn {

  hasTurnPlayer;
  hasPriorityPlayer;

	phases;
  phase;

  constructor(hasTurnPlayer) {
    let drawPhase = new Phase("draw", null);
    let main1Phase = new Phase("main1", null); 
    let battlePhase = new Phase("battle", null); 
    let main2Phase = new Phase("main2", null); 
    let endPhase = new Phase("end", null);
    drawPhase.next = main1Phase;
    main1Phase.next = battlePhase;
    battlePhase.next = main2Phase;
    main2Phase.next = endPhase;
    endPhase.next = drawPhase;
    this.phases = [drawPhase,main1Phase,battlePhase,main2Phase,endPhase];
    this.phase = this.phases[0];
  }

  nextPhase() {
    if (this.phase.phaseNameString == "end") {
      this.hasTurnPlayer = this.hasTurnPlayer.opponentPlayer;
      this.hasTurnPlayer.haveTurnBool = true;
      this.hasTurnPlayer.opponentPlayer.haveTurnBool = false;
    }
    else {
      this.hasPriorityPlayer = this.hasPriorityPlayer.opponentPlayer;
    }
    this.phase = this.phase.next;
    this.hasTurnPlayer.havePriorityBool = true;
    this.hasTurnPlayer.opponentPlayer.havePriorityBool = false;
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