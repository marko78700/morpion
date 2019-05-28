import { Injectable } from '@angular/core';
import { Case } from './Case';
import { Joueur } from './Joueur';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  j1: Joueur;
  j2: Joueur;
  cases = [];
  nbCasesVides: number;
  tour: number;
  draw = false;

  constructor() {
    this.initGame();
  }


  initGame() {

    this.nbCasesVides = 9;
    this.tour = 0;
    this.draw = false;

    // initialisation des cases
    this.cases = [];

    for (let i = 0; i < 9; i++) {
      const oCase = new Case();
      oCase.setValue('');
      this.cases.push(oCase);
    }

    // initialisation des joueurs
    this.j1 = new Joueur();

    // le joueur 2 sera l'IA
    this.j2 = new Joueur();
    this.j2.computer = true;

  }


  getResultats() {
    if (this.draw) {
      return 'Match null';
    } else {
      if (this.tour === 0) {
        return 'Gagné !';
      } else {
        return 'Perdu :-(';
      }
    }
  }

  changementDeJoueur(): number {
    if (this.tour === 0) {
      this.tour = 1;
      return 1;
    } else {
      this.tour = 0;
      return 0;
    }
  }

  // Méthode qui vérifie si une combinaison est gagnante
  isGameWin() {

    const c1 = this.cases[0].value;
    const c2 = this.cases[1].value;
    const c3 = this.cases[2].value;
    const c4 = this.cases[3].value;
    const c5 = this.cases[4].value;
    const c6 = this.cases[5].value;
    const c7 = this.cases[6].value;
    const c8 = this.cases[7].value;
    const c9 = this.cases[8].value;

    const cond1 = c1 && c2 && c3 && (c1 === c2 && c2 === c3);
    const cond2 = c4 && c5 && c6 && (c4 === c5 && c5 === c6);
    const cond3 = c7 && c8 && c9 && (c7 === c8 && c8 === c9);
    const cond4 = c1 && c4 && c7 && (c1 === c4 && c4 === c7);
    const cond5 = c2 && c5 && c8 && (c2 === c5 && c5 === c8);
    const cond6 = c3 && c6 && c9 && (c3 === c6 && c6 === c9);
    const cond7 = c1 && c5 && c9 && (c1 === c5 && c5 === c9);
    const cond8 = c3 && c5 && c7 && (c3 === c5 && c5 === c7);


    if (cond1 || cond2 || cond3 || cond4 || cond5 || cond6 || cond7 || cond8) {

      return true;
    } else {
      return false;
    }
  }


  // Mouvement de l'IA
  computerMove(): number {

    let move = this.getNextPlayWin('R');

    if (move === 0) {
      move = this.blockPlayerWin();
    }

    if (move === 0) {
      move = Math.floor(Math.random() * 8) + 1;
    }

    return move;
  }


  // IA : Bloque un coup gagnant du joueur
  blockPlayerWin(): number {

    const c1 = this.cases[0].value;
    const c2 = this.cases[1].value;
    const c3 = this.cases[2].value;
    const c4 = this.cases[3].value;
    const c5 = this.cases[4].value;
    const c6 = this.cases[5].value;
    const c7 = this.cases[6].value;
    const c8 = this.cases[7].value;
    const c9 = this.cases[8].value;

    if (c1 && c2 && !c3 && (c1 === c2)) {
      return 3;
    }
    if (!c1 && c2 && c3 && (c2 === c3)) {
      return 1;
    }
    if (c1 && !c2 && c3 && (c1 === c3)) {
      return 2;
    }

    if (c4 && c5 && !c6 && (c4 === c5)) {
      return 6;
    }
    if (!c4 && c5 && c6 && (c5 === c6)) {
      return 4;
    }
    if (c4 && !c5 && c6 && (c4 === c6)) {
      return 5;
    }

    if (c7 && c8 && !c9 && (c7 === c8)) {
      return 9;
    }
    if (!c7 && c8 && c9 && (c8 === c9)) {
      return 7;
    }
    if (c7 && !c8 && c9 && (c7 === c9)) {
      return 8;
    }

    if (c1 && c4 && !c7 && (c1 === c4)) {
      return 7;
    }
    if (!c1 && c4 && c7 && (c4 === c7)) {
      return 1;
    }
    if (c1 && !c4 && c7 && (c1 === c7)) {
      return 4;
    }

    if (c2 && c5 && !c8 && (c2 === c5)) {
      return 8;
    }
    if (!c2 && c5 && c8 && (c5 === c8)) {
      return 2;
    }
    if (c2 && !c5 && c8 && (c2 === c8)) {
      return 5;
    }

    if (c3 && c6 && !c9 && (c3 === c6)) {
      return 9;
    }
    if (!c3 && c6 && c9 && (c6 === c9)) {
      return 3;
    }
    if (c3 && !c6 && c9 && (c3 === c9)) {
      return 6;
    }

    if (c1 && c5 && !c9 && (c1 === c5)) {
      return 9;
    }
    if (!c1 && c5 && c9 && (c5 === c9)) {
      return 1;
    }
    if (c1 && !c5 && c9 && (c1 === c9)) {
      return 5;
    }

    if (c3 && c5 && !c7 && (c3 === c5)) {
      return 7;
    }
    if (!c3 && c5 && c7 && (c5 === c7)) {
      return 3;
    }
    if (c3 && !c5 && c7 && (c3 === c7)) {
      return 5;
    }

    return 0;
  }

 // IA : Coche la case pour un coup gagnant
  getNextPlayWin(p: string): number {

    const c1 = this.cases[0].value;
    const c2 = this.cases[1].value;
    const c3 = this.cases[2].value;
    const c4 = this.cases[3].value;
    const c5 = this.cases[4].value;
    const c6 = this.cases[5].value;
    const c7 = this.cases[6].value;
    const c8 = this.cases[7].value;
    const c9 = this.cases[8].value;

    if (c1 && c2 && !c3 && (c1 === c2 && c2 === p)) {
      return 3;
    }
    if (!c1 && c2 && c3 && (c2 === c3 && c3 === p)) {
      return 1;
    }
    if (c1 && !c2 && c3 && (c1 === c3 && c3 === p)) {
      return 2;
    }

    if (c4 && c5 && !c6 && (c4 === c5 && c5 === p)) {
      return 6;
    }
    if (!c4 && c5 && c6 && (c5 === c6 && c6 === p)) {
      return 4;
    }
    if (c4 && !c5 && c6 && (c4 === c6 && c6 === p)) {
      return 5;
    }

    if (c7 && c8 && !c9 && (c7 === c8 && c8 === p)) {
      return 9;
    }
    if (!c7 && c8 && c9 && (c8 === c9 && c9 === p)) {
      return 7;
    }
    if (c7 && !c8 && c9 && (c7 === c9 && c9 === p)) {
      return 8;
    }

    if (c1 && c4 && !c7 && (c1 === c4 && c4 === p)) {
      return 7;
    }
    if (!c1 && c4 && c7 && (c4 === c7 && c7 === p)) {
      return 1;
    }
    if (c1 && !c4 && c7 && (c1 === c7 && c7 === p)) {
      return 4;
    }

    if (c2 && c5 && !c8 && (c2 === c5 && c5 === p)) {
      return 8;
    }
    if (!c2 && c5 && c8 && (c5 === c8 && c8 === p)) {
      return 2;
    }
    if (c2 && !c5 && c8 && (c2 === c8 && c8 === p)) {
      return 5;
    }

    if (c3 && c6 && !c9 && (c3 === c6 && c6 === p)) {
      return 9;
    }
    if (!c3 && c6 && c9 && (c6 === c9 && c9 === p)) {
      return 3;
    }
    if (c3 && !c6 && c9 && (c3 === c9 && c9 === p)) {
      return 6;
    }

    if (c1 && c5 && !c9 && (c1 === c5 && c5 === p)) {
      return 9;
    }
    if (!c1 && c5 && c9 && (c5 === c9 && c9 === p)) {
      return 1;
    }
    if (c1 && !c5 && c9 && (c1 === c9 && c9 === p)) {
      return 5;
    }

    if (c3 && c5 && !c7 && (c3 === c5 && c5 === p)) {
      return 7;
    }
    if (!c3 && c5 && c7 && (c5 === c7 && c7 === p)) {
      return 3;
    }
    if (c3 && !c5 && c7 && (c3 === c7 && c7 === p)) {
      return 5;
    }

    return 0;

  }
}
