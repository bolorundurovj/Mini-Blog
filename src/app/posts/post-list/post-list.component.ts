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
 totalPosts = 0;
 postPerPage = 2;
 currentPage = 1;
 pageSizeOptions = [1, 2, 5, 10];
 private postSub: Subscription;

  constructor(public postsService : PostsService) { }

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
    this.postSub= this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postPerPage, this.currentPage);

  }

  onDelete(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
