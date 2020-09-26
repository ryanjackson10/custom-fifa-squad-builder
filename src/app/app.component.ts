import { Component, OnInit, Inject } from '@angular/core';
import { BoundAttribute } from '@angular/compiler/src/render3/r3_ast';
import { Player } from './player';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'fut';

  constructor(public dialog: MatDialog){}

  imageUrl = "Screen Shot 2020-06-09 at 8.13.37 PM";
  strikerImage;


  // Player defined in Player.ts
  striker = new Player();
  left_winger = new Player();
  right_winger = new Player();
  lcm = new Player();
  rcm = new Player();
  cdm = new Player();
  lb = new Player();
  lcb = new Player();
  rcb = new Player();
  rb = new Player();
  gk = new Player();

  // manually check the link between every player, as in done in the real game
  checkChemistry(player1, player2) {
    let totalChem = 0;
    if (player1 == this.striker && player2 == this.left_winger) {
  
    }
    if (player1.nation === player2.nation) {
      totalChem++;
    }

    if (player1.league === player2.league) {
      totalChem++;
    }

    if (player1.club === player2.club) {
      totalChem += 2;
    }

    // same country is at least a yellow team. Same club is guaranteed green. Same country and league becomes green
    if (totalChem == 0) {
      return "assets/red.png";
    }

    else if (totalChem == 1) {
      return "assets/yellow.png";
    }

    else {
      return "assets/green.png";
    }
  }

  striker_and_lw = this.checkChemistry(this.striker, this.left_winger);


// legend cards require a different font color, so we have to check to see if it is one
  is_LegendCard(player) {
    if (player.card == "/assets/legend.png") {
      return true;
    }
    return false;
  }

  isStrikerYet() {
    return false;
  }

  getStrikerClub() {
    if (this.striker.card) {
      return 
    }
  }
  
  updatePlayer(Player) {
    // Player.name = "MICHAEL BALLACK"
    // Player.club = "CHELSEA"
    // Player.league = "Premier League"
    // Player.nation = "Germany"


  }

  // technically different dialogs for each position, since each has different data. The GK also has different attributes than the outfield players

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      // width: '250px',
      data: this.striker,
    })
  }

  openLeftWinger(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.left_winger,
    })
  }

  openRightWinger(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.right_winger,
    })
  }

  openLCM(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.lcm,
    })
  }

  openRCM(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.rcm,
    })
  }

  openCDM(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.cdm,
    })
  }

  openLB(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.lb,
    })
  }

  openLCB(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.lcb,
    })
  }

  openRCB(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.rcb,
    })
  }

  openRB(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.rb,
    })
  }

  openGK(): void {
    this.gk.isGK = true;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.gk
    })
  }



}