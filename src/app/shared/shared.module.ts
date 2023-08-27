import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCustomModule } from './material.module';
import { IconComponent } from 'ng-heroicon';
import { IconsModule } from './icons/icons.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialCustomModule,IconsModule],
  exports: [MaterialCustomModule],
})
export class SharedModule {}
