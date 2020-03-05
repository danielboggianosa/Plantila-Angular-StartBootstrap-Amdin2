import { NgModule } from "@angular/core";
import { AnimaitionsComponent } from './animaitions/animaitions.component';
import { BordersComponent } from './borders/borders.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { ColorsComponent } from './colors/colors.component';
import { OtherComponent } from './other/other.component';
import { BlankComponent } from './blank/blank.component';
import { UnknownComponent } from './unknown/unknown.component';

@NgModule({
    declarations:[
        AnimaitionsComponent,
        BordersComponent,
        ButtonsComponent,
        CardsComponent,
        ColorsComponent,
        OtherComponent,
        BlankComponent,
        UnknownComponent
    ]
})
export class InterfaceModule{}