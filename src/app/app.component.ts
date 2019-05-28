import { Component } from '@angular/core';
import { GameService } from './Core/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'morpion';
  cases = [];
  isGameOver = false;
  gameResultats = '';
  tour: number;
  scoreJ1 = 0;
  scoreJ2 = 0;

  constructor(private gameService: GameService) {
    this.cases = this.gameService.cases;
    this.tour = this.gameService.tour;
  }


  restartGame() {
    this.gameService.initGame();
    this.cases = this.gameService.cases;
    this.isGameOver = false;
    this.tour = 0;
  }

  playerClick(i: number) {

    if (this.gameService.tour === 0) {
      this.play(i);
    }
  }

  gameOver() {
    this.isGameOver = true;
    this.gameResultats = this.gameService.getResultats();
  }


  play(i: number) {

    if (this.gameService.cases[i].value === '' && !this.isGameOver) {

      this.gameService.nbCasesVides -= 1;

      if (this.gameService.tour === 0) {
        this.gameService.cases[i].setValue('C');
      } else {
        this.gameService.cases[i].setValue('R');
      }

      if (this.gameService.isGameWin()) {

        this.gameOver();
        return;

      } else {

        if (this.gameService.nbCasesVides === 0) {
          this.gameService.draw = true;
          this.gameOver();
          return;
        } else {
          this.tour = this.gameService.changementDeJoueur();
          if (this.gameService.tour === 1) {
            this.computerTurn();
          }
        }
      }

    } else {
      return;
    }
  }

  computerTurn() {
    const move = this.gameService.computerMove() - 1;

    if (this.gameService.cases[move].value === '') {

      setTimeout(() => {
        this.play(move);
      }, 500);

    } else {
      this.computerTurn();
    }
  }


}
