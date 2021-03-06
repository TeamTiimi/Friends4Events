import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginPage} from '../login/login';
import {MediaProvider} from '../../providers/media/media';
import {EventPage} from '../event/event';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  filesArray: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    if (localStorage.getItem('token') != null) {
      this.mediaProvider.getUserData().subscribe(response => {
        console.log('Welcome ' + response['full_name']);
        this.mediaProvider.getNewFiles().subscribe(response => {
          console.log(response);
          this.filesArray = response;
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        //this.router.navigate(['login']);
        this.navCtrl.setRoot(LoginPage)
      });
    } else {
      //this.router.navigate(['login']);
      this.navCtrl.setRoot(LoginPage);
    }
  }

  itemTapped(event, item, file_id, title, description, user_id, filename, time_added) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(EventPage, {
      item: item,
      file_id: file_id,
      title: title,
      description: description,
      user_id: user_id,
      filename: filename,
      time_added: time_added
    });
  }
}
