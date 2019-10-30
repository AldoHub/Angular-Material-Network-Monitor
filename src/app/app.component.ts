import { Component } from '@angular/core';

import { OfflineService } from "./offline.service";
import { DialogComponent } from "./dialog/dialog.component";
import {
  MatDialog
} from "@angular/material";
import { skip } from "rxjs/operators";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private offlineService: OfflineService, public dialog: MatDialog){
  }

  
  openDialog(status: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "30%",
      data: { currentStatus: status}
    });


    dialogRef.afterClosed().subscribe(result => {
     if(result == undefined){
       console.log("the user just closed the dialog");
     }else{
       console.log("the data passed is:" + result)
     }
    })
  }



  ngOnInit(): void {
    
    this.offlineService.status.pipe(skip(1)).subscribe(status => {
      
      this.dialog.closeAll();
      console.log(status);
      this.openDialog(status);

    })

  }


}
