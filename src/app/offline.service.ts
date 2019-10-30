import { Injectable } from '@angular/core';
import { ConnectionService } from "ng-connection-service";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class OfflineService {

  public conn: string ="OFFLINE";
  public status: BehaviorSubject<any> = new BehaviorSubject<any>(this.conn);  

  constructor(private connetionService: ConnectionService) {
    this.connetionService.monitor().subscribe(connection => {
      if(connection){
        this.conn = "ONLINE";
        this.status.next(this.conn);
      }else{
        this.conn = "OFFLINE";
        this.status.next(this.conn);
      }
    }); 
  }
}
