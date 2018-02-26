import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginPage} from '../login/login';
import {MediaProvider} from '../../providers/media/media';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  selectedItem: any;
  filesArray: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  searchQuery: string = '';
  searchItems: any;

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies

    this.initializeItems();
  }

  getItems(ev: any) {

    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.searchItems = this.searchItems.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  initializeItems() {
    this.searchItems;
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    if (localStorage.getItem('token') != null) {
      this.mediaProvider.getUserData().subscribe(response => {
        console.log('Welcome ' + response['full_name']);
        this.mediaProvider.getNewFiles().subscribe(response => {
          console.log(response);
          this.filesArray = response;

          console.log('Title list:');
          this.searchItems = [];
          this.filesArray.forEach(file => {
            this.searchItems.push(file.title);
            console.log(file.title);
          });

        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        //this.router.navigate(['login']);
        this.navCtrl.setRoot(LoginPage);
      });
    } else {
      //this.router.navigate(['login']);
      this.navCtrl.setRoot(LoginPage);
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item,
    });
  }
}
