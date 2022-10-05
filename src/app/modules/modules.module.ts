import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialCustomModule } from '../shared/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, MaterialCustomModule],
})
export class ModulesModule {}
