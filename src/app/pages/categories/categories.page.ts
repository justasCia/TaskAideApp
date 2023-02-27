import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/services/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [
    { id: 1, name: 'Valymas', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 2, name: 'Elektros darbai', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 3, name: 'Santechnikos darbai', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 4, name: 'Statybos darbai', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 5, name: 'Buitinės technikos pajungimas', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 6, name: 'Vidaus apdailos darbai', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 7, name: 'Baldų surinkimas', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 8, name: 'Namų remontas', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 9, name: 'Pervežimas', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 10, name: 'Aplinkos tvarkymas ir priežiūra', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 11, name: 'Kondicionavimo sistemų bei vėdinimo sistemų darbai', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 12, name: 'Apsaugos darbai', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' },
    { id: 13, name: 'Dujų ūkio darbai', imageUrl: 'https://d3cl79h6n1fe0x.cloudfront.net/wp-content/uploads/2020/01/15085115/11.jpeg' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
