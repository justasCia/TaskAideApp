import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Category from 'src/app/models/services/Category';
import { categories } from '../categories';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.scss'],
})
export class CategorySelectionComponent implements OnInit {
  categories: Category[] = categories;
  @Output() categorySelected = new EventEmitter<Category>();
  constructor() { }

  ngOnInit() {}

  selectCategory(category: Category) {
    this.categorySelected.emit(category);
  }
}
