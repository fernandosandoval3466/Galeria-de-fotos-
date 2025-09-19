import { Component } from '@angular/core';
import { Foto } from '../services/foto';


@Component({
  selector: 'app-fotos',
  templateUrl: 'fotos.page.html',
  styleUrls: ['fotos.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(public fotoService: Foto) {

  }

    addPhotoToGallery()
    {
      this.fotoService.addNewToGallery();
    }

    async ngOnInit()
    {
      await this.fotoService.loadSaved();
    }
}
