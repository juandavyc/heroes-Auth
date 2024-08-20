import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from './../../interfaces/hero.interface';
import { HeroesService } from './../../services/herores.service';
import { Component, OnInit } from '@angular/core';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  // opcional, pues cuando inicia es nulo
  // hasta que temrine el observable
  public hero?: Hero;
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    //this.heroesService.getHeroeById.
    this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap(({ id }) => this.heroesService.getHeroeById(id)) // tomar los params
      ).subscribe(hero => {
        if(!hero){
          this.router.navigate(['heroes.list']);
        }
        this.hero = hero;
        console.log(hero);
        return;
      })
  }

  goBack() {

    this.router.navigateByUrl("heroes/list");
  }
}
