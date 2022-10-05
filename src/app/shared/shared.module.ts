import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCustomModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialCustomModule],
  exports: [MaterialCustomModule],
})
export class SharedModule {}
