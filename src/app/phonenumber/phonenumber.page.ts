import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.page.html',
  styleUrls: ['./phonenumber.page.scss'],
})
export class PhonenumberPage implements OnInit {
  verificationId: any;
  code = '';
  constructor() { }

  ngOnInit() {
  }

  send() {
    (window as any).FirebasePlugin.verifyPhoneNumber('+919873424843', 60, (credential) => {
      alert('SMS Sent Successfully');
      console.log(credential);

      this.verificationId = credential.verificationId;
    },


// tslint:disable-next-line: only-arrow-functions
    function(error) {
      console.error(error);
    });
  }

  verify() {
    const signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.code);
    firebase.auth().signInWithCredential(signInCredential).then((info) => {
      console.log(info);
    }, (error) => {
      console.log(error);
    });
  }

}
