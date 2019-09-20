import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { MatButtonModule } from '@angular/material';
import { PostComponent } from './post/post.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    DialogContentComponent,
    PostComponent,
    MainComponent
  ],
  entryComponents: [
    DialogContentComponent
  ],
  imports: [
    ImageCropperModule,
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    NgbModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class HomeModule { }
