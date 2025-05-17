import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant.model';
import { NgIf ,NgFor } from '@angular/common';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'] ,
  imports: [NgIf , NgFor]
})
export class SearchResultsComponent implements OnInit {
  plants: Plant[] = [];
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      if (this.query) {
        this.plantService.searchPlants(this.query).subscribe({
          next: (plants) => {
            this.plants = plants;
          },
          error: (err) => {
            console.error('Error fetching plants:', err);
          }
        });
      }
    });
  }
}