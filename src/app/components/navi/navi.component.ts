import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
usr:any
role:any
userId:any

  constructor(private auth:LocalStorageService) { }

  ngOnInit(): void {
  this.usr= localStorage.getItem("userName")
 this.role= localStorage.getItem("userRole")
 this.userId= localStorage.getItem("userId")
  }
  cikis(){
    this.auth.remove("token");
    this.auth.remove("userName");
    this.auth.remove("userId");
    this.auth.remove("role");


  }


}
