import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';

declare var $;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  private baseUrl: string;
  protected posts;
  protected currentPost;

  constructor(private testHttp: Http) {
    this.baseUrl = 'http://angular-online-test.herokuapp.com';
  }

  ngOnInit() {
    $('.modal').modal();
    this.getPosts();
  }

  protected getPosts() {
    this.testHttp.get(this.baseUrl + '/posts')
      .map(res => res.json())
      .subscribe(
        result => {
          this.posts = result;
        },
        error => {
          console.log('Unable to get posts!');
        }
      );
  }

  public deletePost(post) {
    $('#confirm-modal').modal('open');

    this.currentPost = post;
  }

  public confirmDelete() {
    this.testHttp.delete(this.baseUrl + '/posts/' + this.currentPost.id)
      .map(res => res.json())
      .subscribe(
        result => {
          const index = this.posts.indexOf(this.currentPost, 0);
          if (index > -1) {
            this.posts.splice(index, 1);
          }
        },
        error => {
          console.log('Unable to delete post!');
        }
      );
  }

  public savePost(title, content, lat, long, img_url) {
    const data = {
      'title': title,
      'content': content,
      'lat': lat,
      'long': long,
      'image_url': img_url
    };

    this.testHttp.post(this.baseUrl + '/posts', data)
      .map(res => res.json())
      .subscribe(
        result => {
          this.posts.push(data);
          $('#add-modal').modal('close');
        },
        error => {
          console.log('Unable to add post!');
        }
      );
  }
}
