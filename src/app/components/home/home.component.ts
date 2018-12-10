import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogPosts;
  username;
  p: number = 1;

  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService
  ) {}
  
// Function to get all blogs from the database
getAllBlogs() {
  // Function to GET all blogs from database
  this.blogService.getAllBlogs().subscribe(data => {
    this.blogPosts = data.blogs; // Assign array to use in HTML
  });
}

  ngOnInit() {
   // Get profile username on page load
   this.authService.getProfile().subscribe(profile => {
    this.username = profile.user.username; // Used when creating new blog posts and comments
  });

  this.getAllBlogs(); // Get all blogs on component load
  }

}