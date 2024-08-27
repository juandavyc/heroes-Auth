import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  });


  public publishers = [
    {
      id: 'DC Comics', desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics', desc: 'Marvel - Comics'
    }
  ]


  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    // no hace nada
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroeById(id))
      )
      .subscribe(hero => {
        // es null, no exisdte pa ajuera
        if (!hero) {
          return this.router.navigateByUrl('/');
        }
        this.heroForm.reset(hero) // lo limpia y establece
        return;
      })
  }

  onSubmit(): void {

    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackBar(`${hero.superhero} updated`)
        })
      return;
    }
    else {
      this.heroesService.addHero(this.currentHero)
        .subscribe(hero => {
          this.router.navigate(['/heroes/edit', hero.id]);
          this.showSnackBar(`${hero.superhero} created`)
        })
      return;
    }
    // this.heroesService.updateHero(this.heroForm.value) // wrong
    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value
    // });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onDeleteHero() {
    if (!this.currentHero) throw Error('Hero is required')

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result:boolean)=> result === true), // siga adelante
      switchMap(()=> this.heroesService.deleteHeroById(this.currentHero.id)),
      tap((wasDeleted:boolean)=> wasDeleted)
    )
    .subscribe(result => {
      this.router.navigate(['/heroes']);
    });

    // if (!result) return;
    // this.heroesService.deleteHeroById(this.currentHero.id)
    //   .subscribe((wasDeleted) => {
    //     if(wasDeleted) this.router.navigate(['/heroes'])
    //   })
  }


  showSnackBar(message: string) {
    this.snackBar.open(message, 'done', {
      duration: 2500
    })
  }


}
