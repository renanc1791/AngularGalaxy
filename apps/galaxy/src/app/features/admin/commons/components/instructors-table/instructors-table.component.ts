import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Instructor } from '@galaxy/commons/models';

@Component({
  selector: 'app-instructors-table',
  templateUrl: './instructors-table.component.html',
  styleUrls: ['./instructors-table.component.scss']
})
export class InstructorsTableComponent implements OnInit {


  @Input() displayedColumns: string[] = ['fullName','mail','edit','remove']
  @Input() dataSource : Instructor[] = [];

  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() remove: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
