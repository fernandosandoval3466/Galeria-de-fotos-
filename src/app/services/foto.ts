import { Injectable } from '@angular/core';
import {Camera, CameraPhoto, CameraResultType, CameraSource, Photo} from '@capacitor/camera'
import {Filesystem, Directory} from '@capacitor/filesystem'
import {Storage} from '@capacitor/storage'
import {FotoInterface} from '../models/foto.interface';


@Injectable({
  providedIn: 'root'
})
export class Foto {
//arreglo para guardar las fotos
  public fotos: FotoInterface[] = [];
  private PHOTO_STORAGE: string = "photos";
  
  constructor() {}

  public async addNewToGallery() 
  {
    // Take a photo
    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });


    /*this.fotos.unshift({
    filepath: "foto_",
    webviewPath: fotoCapturada.webPath || ""
  })*/

    const savedImageFile = await this.savePicture(fotoCapturada);
    this.fotos.unshift(savedImageFile);


    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.fotos)
    })

}

public async savePicture(cameraPhoto: CameraPhoto){
  

  // Convertir la foto a base64
  const base64Data = await this.readAsBase64(cameraPhoto);
  // Guardar la foto en el sistema de archivos
  const fileName = new Date().getTime() + '.jpeg';
  const savedFIle = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data
  })
  return {
    filepath: fileName, webviewPath: cameraPhoto.webPath!
  };

}
  
public async readAsBase64(cameraPhoto: CameraPhoto) {

  //Convertir de blob a base64
  const response = await fetch(cameraPhoto.webPath!)
  const blob = await response.blob();
  return await this.convertBlobToBase64(blob) as string;

}
convertBlobToBase64 = (Blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result);
  }
  reader.readAsDataURL(Blob);
})

public async loadSaved(){

  //Cargar las fotos guardadas de la caché
  const listafotos = await Storage.get({key: this.PHOTO_STORAGE})
  this.fotos = JSON.parse(listafotos.value!) || [];

  //Para cada foto, cargarla del sistema de archivos
  for(let foto of this.fotos){
    //Leer el archivo del sistema de archivos
    const readFile = await Filesystem.readFile({
      path: foto.filepath,
      directory: Directory.Data
    })

    //Solo para plataformas web: cargar la foto como base64 data
    foto.webviewPath = `data:image/jpeg;base64,${readFile.data}`;

  }
}





}
