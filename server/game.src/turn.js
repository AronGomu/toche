class Phase {
  phaseNameString;
  nextPhase;

  constructor(phaseNameString, nextPhase) {
    this.phaseNameString = phaseNameString;
    this.nextPhase = nextPhase;
  }
}

class Turn {

  activePlayer;

	phases;
  phase;

  constructor(activePlayer) {
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

    this.activePlayer = activePlayer;
  }

  nextPhase() {
    if (this.phase.phaseNameString == "end") {
      this.activePlayer = this.activePlayer.opponentPlayer;
      this.activePlayer.haveTurnBool = true;
      this.activePlayer.opponentPlayer.haveTurnBool = false;
    }
    this.phase = this.phase.next;
    this.activePlayer.havePriorityBool = true;
    this.activePlayer.opponentPlayer.havePriorityBool = false;
  }

}

module.exports = Turn;