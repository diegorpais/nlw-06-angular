import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-room-code',
  templateUrl: './room-code.component.html',
  styleUrls: ['./room-code.component.scss']
})
export class RoomCodeComponent implements OnInit {

  @Input() roomCode: string;

  constructor() { }

  ngOnInit(): void {
  }

  copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(this.roomCode);
  }

}
