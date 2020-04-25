import { Player } from './Player';

class Phase {
  phaseName: string;
  next: Phase;

  constructor(phaseName: string, next: Phase) {
    this.phaseName = phaseName;
    this.next = next;
  }
}


export class Turn {
  public hasTurnPlayer: Player;

	public phases: Phase[];
  public currentPhase: Phase;

  public havePriority: boolean;


  
  constructor(hasTurnPlayer: Player) {
    let drawPhase: Phase = new Phase("draw", null);
    let main1Phase: Phase = new Phase("main1", null); 
    let battlePhase: Phase = new Phase("battle", null); 
    let main2Phase: Phase = new Phase("main2", null); 
    let endPhase: Phase = new Phase("end", null);
    drawPhase.next = main1Phase;
    main1Phase.next = battlePhase;
    battlePhase.next = main2Phase;
    main2Phase.next = endPhase;
    endPhase.next = drawPhase;
    this.phases = [drawPhase,main1Phase,battlePhase,main2Phase,endPhase];
    this.currentPhase = this.phases[0];

    this.hasTurnPlayer = hasTurnPlayer;
  }
  

  public setCurrentPhase(phaseName: String) {
    this.phases.forEach(phase => {
      if (phase.phaseName == phaseName) {
        this.currentPhase = phase;
      }
    });
  }
  
  /*
  public nextPhase() {
    console.log("nextPhase");
    if (this.currentPhase.phaseName == "end") {
      console.log("is end");
      console.log(this.hasTurnPlayer);
      this.hasTurnPlayer = this.hasTurnPlayer.opponent;
      console.log(this.hasTurnPlayer);
    }
    this.currentPhase = this.currentPhase.next;
    this.hasTurnPlayer.havePriority = true;
    this.hasTurnPlayer.opponent.havePriority = false;
  }
  */

}