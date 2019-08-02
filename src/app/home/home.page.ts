import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';


interface User {
  email?: string;
  password?: string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: User = {
    email: 'anaskhan@gmail.com',
    password: 'aswin@123',
  };


  constructor(public alertController: AlertController, private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {}

  async createAccount() {
    await this.afAuth.auth.createUserWithEmailAndPassword(
      this.user.email,
      this.user.password
    );
    console.log(this.user);

    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'New Account Created',
      message: 'You have successfully created a new account.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async login() {
    const user = await this.afAuth.auth.signInWithEmailAndPassword(
      this.user.email,
      this.user.password
    );
    console.log(user);


    const alert = await this.alertController.create({
      header: 'Congratulations',
      subHeader: 'Logged-In',
      message: 'You have successfully logged-in.',
      buttons: ['OK']
    });

    await alert.present();

    this.router.navigateByUrl('/phonenumber');

  }
  async logout() {
    await this.afAuth.auth.signOut();
  }

  goto() {
    this.router.navigateByUrl('/verification');
  }

  listthePhone() {
    this.router.navigateByUrl('/phonenumber');
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

  }
  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
