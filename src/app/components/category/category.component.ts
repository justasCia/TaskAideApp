import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Category from 'src/app/models/services/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  constructor(private router: Router) { }

  ngOnInit() { }

  click() {
    this.router.navigate([`categories/${this.category.id}/services`]);
  }

}
