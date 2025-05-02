// import { Component } from '@angular/core';
// import { OnInit } from '@angular/core';

// import { NgFor } from '@angular/common';
// import { RouterLink } from '@angular/router';
// import { Plant } from '../../models/plant.model';
// import { PlantService } from '../../plant.service';


// @Component({
//   selector: 'app-home',
//   imports: [NgFor,RouterLink],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent implements OnInit {
//   plants: Plant[] = [];

//   constructor(private plantService: PlantService) {}

//   ngOnInit(): void {
//     this.plantService.getPlants().subscribe((data: Plant[]) => {
//       this.plants = data;
//     });
//   }


//   onPlantClick(plant: Plant): void {
//     console.log('Clicked plant:', plant);
    
//   }

// }

import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

export class Plant {
  id: number = 0;
  name: string = '';
  description: string = '';
  image_url: string = '';
  created_by: string = '';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  plants: Plant[] = [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      description: 'A popular houseplant with large, split leaves. Thrives in bright, indirect light.',
      image_url: '/assets/Monstera Deliciosa.jpg',
      created_by: 'Alice'
    },
    {
      id: 2,
      name: 'Fiddle Leaf Fig',
      description: 'Known for its large, glossy leaves. Prefers bright light and moderate watering.',
      image_url: '/assets/Fiddle Leaf Fig.jpg',
      created_by: 'Bob'
    },
    {
      id: 3,
      name: 'Snake Plant',
      description: 'Hardy plant with long, upright leaves. Tolerates low light and infrequent watering.',
      image_url: '/assets/Snake Plant.jpg',
      created_by: 'Charlie'
    }
  ];
}