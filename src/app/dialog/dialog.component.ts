// @ts-nocheck 
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';  
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { stringify } from 'querystring';
import { FormControl } from '@angular/forms';

interface Player {
  card: string,
  name: string,
  club: string,
  league: string,
  nation: string,
  image: string,
  overall: string,
  pace: string,
  shooting: string;
  passing: string;
  dribbling: string;
  defending: string;
  heading: string;
  isGK: boolean;
}

interface Card {
  type: string,
  location: string;
}

interface Nation {
  value: string,
  image: string
}

interface Club {
  value: string,
  image: string
}

interface League {
  value: string,
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data: Player) {}



  formsFilledOut = false;
  pace = "";
  shooting = "";
  passing: "";
  dribbling: "";
  defending: "";
  heading: "";

  visible_player_file = "";
  visible_nation_file = "";
  visible_club_file = "";
  selectedNation="";
  cardType = "";
  selectedClub="";
  selectedLeague="";
  fileToUpload: any[] = [];
  imageUrl: any;
  nation_file;

  league_selected = false;

  cards: Card[] = [
    {type: "IF", location: "/assets/if.png"},
    {type: "iMOTM", location: "/assets/imotm.png"},
    {type: "Legend", location: "/assets/legend.png"},
    {type: "MOTM", location: "/assets/motm.png"},
    {type: "Rare Gold", location: "/assets/gold.png"},
    {type: "Record Breaker", location: "/assets/record_breaker.png"},
    {type: "TOTS", location: "/assets/tots.png"},
    {type: "TOTY", location: "/assets/toty.png"},

  ]

  nations: Nation[] = [
    {value: 'Argentina', image: "/assets/argentina.png"},
    {value: 'Belgium', image: "/assets/belgium.png"},
    {value: 'Brazil', image: "/assets/brazil.png"},
    {value: 'Colombia', image: "/assets/colombia.png"},
    {value: 'Croatia', image: "/assets/croatia.png"},
    {value: 'England', image: "/assets/england.png"},
    {value: 'France', image: "/assets/france.png"},
    {value: 'Germany', image: "/assets/germany.png"},
    {value: 'Holland', image: "/assets/holland.png"},
    {value: 'Italy', image: "/assets/italy.png"},
    {value: 'Portugal', image: "/assets/portugal.png"},
    {value: 'Spain', image: "/assets/spain.png"},
    {value: 'Uruguay', image: "/assets/uruguay.png"},
  ]

  clubs: Club[] = [
    {value: 'A.C. Milan', image: "/assets/milan.png"},
    {value: 'Ajax', image: "/assets/ajax.png"},
    {value: 'Arsenal', image: "/assets/arsenal.png"},
    {value: 'Atlético Madrid', image: "/assets/atleticomadrid.png"},
    {value: 'Barcelona', image: "/assets/barcelona.png"},
    {value: 'Bayern Munich', image: "/assets/bayern.png"},
    {value: 'Borussia Dortmund', image: "/assets/dortmund.png"},
    {value: 'Chelsea', image: "/assets/chelsea.png"},
    {value: 'Internazionale', image: "/assets/internazionale.png"},
    {value: 'Juventus', image: "/assets/juventus.png"},
    {value: 'Liverpool', image: "/assets/liverpool.png"},
    {value: 'Manchester City', image: "/assets/manchester_city.png"},
    {value: 'Manchester United', image: "/assets/manchester_united.png"},
    {value: 'Paris Saint-Germain', image: "/assets/psg.png"},
    {value: 'Real Madrid', image: "/assets/realmadrid.png"},
    {value: 'Spurs', image: "/assets/spurs.png"},

  ]

  leagues: League[] = [
    {value: 'Bundesliga'},
    {value: 'Eredivisie'},
    {value: 'La Liga'},
    {value: 'Ligue 1'},
    {value: 'Premier League'},
    {value: 'Serie A'},
    {value: undefined}

  ]

  ngOnInit() {
    this.dialogRef.updateSize('40%', '85%')
  }



  returnStat(player, number) {
    arr = ["PAC", "PAS", "SHO", "DRI", "DEF", "HEA"];
    if (player.isGK) {
      arr = this.gk_stats;
    }
    else {
      arr = this.outfield_player_stats;
    }
    switch (number) {
      case 1:
        return arr[0];
        break;

      case 2:
        return arr[1];
        break;

      case 3:
        return arr[2];
        break;

      case 4:
        return arr[3];
  
      case 5:
        return arr[4];

      case 6:
        return arr[5];
    }

  }

  returnFirstStat(player) {
    if (!player.isGK) {
      return "PAC"
    }
    else {
      return "DIV"
    }
  }

  returnSecondStat(player) {
    if (!player.isGK) {
      return "SHO"
    }
    else {
      return "HAN"
    }
  }

  returnThirdStat(player) {
    if (!player.isGK) {
      return "PAS"
    }
    else {
      return "KIC"
    }
  }

  returnFourthStat(player) {
    if (!player.isGK) {
      return "DRI"
    }
    else {
      return "REF"
    }
  }

  returnFifthStat(player) {
    if (!player.isGK) {
      return "DEF"
    }
    else {
      return "SPE"
    }
  }

  returnSixthStat(player) {
    if (!player.isGK) {
      return "HEA"
    }
    else {
      return "POS"
    }
  }


  logIt() {
  }

  selectedFiles = []
  uploadedFiles = 0;

  updatePlayer() {
    // this.data.name = "Essien".toUpperCase();
    // let new_lastName = (<HTMLInputElement>document.getElementById("last_name")).value;
    this.data.name = (<HTMLInputElement>document.getElementById("last_name")).value.toUpperCase();
    if (this.selectedNation) {
      this.data.nation = this.selectedNation;
    }

    else {
      console.log("uploaded nation")
    }

    this.data.card = this.cardType;

    this.data.overall = (<HTMLInputElement>document.getElementById("overall")).value;
    this.data.pace = (<HTMLInputElement>document.getElementById("pace")).value;
    this.data.shooting = (<HTMLInputElement>document.getElementById("shooting")).value;
    this.data.passing = (<HTMLInputElement>document.getElementById("passing")).value;
    this.data.dribbling = (<HTMLInputElement>document.getElementById("dribbling")).value;
    this.data.defending = (<HTMLInputElement>document.getElementById("defending")).value;
    this.data.heading = (<HTMLInputElement>document.getElementById("heading")).value;

    if (this.selectedClub) {
      this.data.club = this.selectedClub;
    }
    else {
      console.log("log");
    }

    this.data.league = this.selectedLeague;


    this.data.image = this.nation_file;

    this.dialogRef.close();
  }

  isLeagueSelected() {
    if (this.selectedLeague == "" || this.selectedLeague == undefined) {
      return false;
    }
    return true;
  }

  updateLeagueFile() {
    if (this.selectedLeague == "Reset") {
      this.selectedLeague = "";
    }
  }

  isCustomLeague() {
    if ((<HTMLInputElement>document.getElementById("league")).value.toUpperCase().length == 0) {
      return false;
    }
    return true;
  }

  selectedLeagueAction() {
    this.league_selected = true;
  }

  updateNation() {
  }

  chooseFiles() {
    const realFileButton = (<HTMLInputElement>document.getElementById("files"));
    realFileButton.click();
    var x = document.getElementById("files");

  }

  chooseNationFiles() {
    console.log("nations");
    const realFileButton = (<HTMLInputElement>document.getElementById("nation_files"))
    realFileButton.click();
    var x = document.getElementById("nation_files");
  }

  chooseClubFiles() {
    console.log("club");
    const realFileButton = (<HTMLInputElement>document.getElementById("club_files"))
    realFileButton.click();
    var x = document.getElementById("club_files");

  }

  logSomething() {
    console.log("something");
  }

  handleNationInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      // this.nations = event.target.result;

      this.data.nation = event.target.result;
      this.selectedNation = '';
      this.visible_nation_file = `${(<HTMLInputElement>document.getElementById("nation_files")).value.substring(12, 33)}...`;
    }
    reader.readAsDataURL(this.fileToUpload);
    // this.dialogRef.close();
  }

  handleClubInput(file: FileList) {
    this.fileToUpload = file.item(0);

    let reader = new FileReader();
    reader.onload = (event: any) => {

      this.data.club = event.target.result;
      this.selectedClub = '';
      console.log(` logging: ${(<HTMLInputElement>document.getElementById("club_files")).value}...`)
      this.visible_club_file = `${(<HTMLInputElement>document.getElementById("club_files")).value.substring(12, 33)}...`;
    }
    reader.readAsDataURL(this.fileToUpload);
  }


  // selectedNationControl = new FormControl(this.visible_nation_file);

updateFile() {
  this.visible_nation_file = '';
}

updateClubFile() {
  this.visible_club_file = '';
}

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      // this.data.image = event.target.result;
      this.nation_file = event.target.result;
      this.visible_player_file = `${(<HTMLInputElement>document.getElementById("files")).value.substring(12, 33)}...`;
      
    }
    reader.readAsDataURL(this.fileToUpload);
    // this.dialogRef.close();
  }


  displayFiles() {
    const realFileButton = (<HTMLInputElement>document.getElementById("files"));
    var x = document.getElementById("files");
    if ('files' in x) {
      for (var i = 0; i < realFileButton.files.length; i++) {
        var file = realFileButton.files[i];
        this.selectedFiles.push({name: file.name, size: file.size});
      }
    }
    for (var j = 0; j <= this.selectedFiles.length - 1; j++) {
      console.log(this.selectedFiles[j]);
    }

    console.log(this.selectedFiles.length);
    this.uploadedFiles = this.selectedFiles.length;
  }


  close() {
    this.dialogRef.close();
  }

}
