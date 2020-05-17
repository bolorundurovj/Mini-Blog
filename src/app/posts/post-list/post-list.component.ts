import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PageEvent } from '@angular/material/paginator';

import { Post } from '../post.model';
import { PostsService } from '../post.service';

@Component({
  selector:'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']

})

export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: "1st post", content: "1st post\'s content"},
  //   {title: "2nd post", content: "2nd post\'s content"},
  //   {title: "3rd post", content: "3rd post\'s content"},
  // ];
 posts : Post[] = [];
 isLoading = false;
 private postSub: Subscription;
 totalPosts =10;
 postPerPage =3;
 pageSizeOptions = [1, 2, 5, 10];

  constructor(public postsService : PostsService) { }

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage, 1);
    this.postSub= this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onChangedPage(pageData: PageEvent){
    console.log(pageData);

  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
