import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {Comment} from '../../interfaces/comment';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  fileID: number;

  comment: Comment = {
    file_id: null,
    comment: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
    this.fileID = this.navParams.get('file_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
    this.comment.file_id = this.fileID;
    console.log(this.fileID);
  }

  getCommentsByFileId () {
    this.mediaProvider.getCommentsByFileId(this.fileID).subscribe(response => {
      console.log(response);
    });
  }

  postNewComment(){
    this.mediaProvider.commentEvent(this.comment).subscribe(response => {
      console.log(response);

      //this.mediaProvider.username = this.user.username;
      //this.mediaProvider.password = this.user.password;
    });
  }

}
