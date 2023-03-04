import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/services/Category';
import { categories } from './categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {
  categories: Category[] = categories;
  constructor() { }
}
