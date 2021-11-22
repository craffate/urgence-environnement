import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchEvent: EventEmitter<string>;
  searchTerm: FormControl;

  constructor() {
    this.searchEvent = new EventEmitter<string>();
    this.searchTerm = new FormControl('');
  }

  ngOnInit(): void {
  }

  clearSearch() {
    this.searchTerm.setValue('');
  }

  search() {
    this.searchEvent.emit(this.searchTerm.value);
  }

}
