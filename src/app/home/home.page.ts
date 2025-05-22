import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const nombre = this.form.value.nombre;
    const fechaNacimiento = new Date(this.form.value.fechaNacimiento);
    const edad = this.calcularEdad(fechaNacimiento);

    let mensaje = `${nombre}, tienes ${edad} años. `;

    if (edad < 18) {
      mensaje += 'Eres menor de edad.';
    } else {
      mensaje += 'Registro exitoso.';
    }

    const alert = await this.alertController.create({
      header: 'Verificación de Edad',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  calcularEdad(fecha: Date): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }
    return edad;
  }
}

