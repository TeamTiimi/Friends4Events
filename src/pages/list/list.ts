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
  searchItems: any;
  likes: any;
  amountOfLikes: any = [];
  //icons: string[];
  //items: Array<{ title: string, note: string, icon: string }>;

  //searchQuery: string = '';

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

  }

  getItems(ev: any) {

    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {

      this.searchItems = this.searchItems.filter((item) => {
        console.log(item.title);
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  initializeItems() {
    this.searchItems = this.filesArray;
  }

  getLikes() {
    this.filesArray.forEach(file => {
      this.mediaProvider.getLikesByFileId(file.file_id).subscribe(response => {
        this.amountOfLikes.push({like: response});
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    if (localStorage.getItem('token') != null) {
      this.mediaProvider.getUserData().subscribe(response => {
        console.log('Welcome ' + response['full_name']);
        this.mediaProvider.getNewFiles().subscribe(response => {
          //console.log(response);
          this.filesArray = response;

          this.initializeItems();

          this.getLikes();
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
