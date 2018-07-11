import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import {User} from "../model";
import {Post} from "../model";




@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  user$: User;
  userId$ : number;
  posts$ : Post[];

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.route.params.subscribe( params => this.userId$ = params.id );
  }

  ngOnInit() {
    this.dataService.getUser(this.userId$).subscribe(
      (user : User) => this.user$ = user
    );
    this.dataService.getPosts().subscribe(
      (posts : Post[]) => this.posts$ = posts.filter( post => post.userId == this.userId$)
    )
  }


}
