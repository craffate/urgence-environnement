import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() title!: string;
  categoryLinks: string[];
  activeLink!: string;

  constructor(
    private router: Router
  ) {
    this.categoryLinks = [ 'Mobilier', 'Librairie', 'Loisir', 'Bricolage', 'Brocante', 'Objets d\'occasion', 'Divers'];
  }

  ngOnInit(): void {
  }

}
