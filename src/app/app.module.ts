import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentService } from './student.service';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, MatInputModule, MatSortModule, MatChipsModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatAutocompleteModule, MatFormFieldModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { SubadminLoginComponent } from './admin-login/subadmin-login.component';
import { HomeModule } from './subAdmin/home.module';
import { AdminModule } from './admin/admin.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HeaderComponent } from './header/header.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    SubadminLoginComponent,
    HeaderComponent],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule, // for Database
    AppRoutingModule,
    AngularFireAuthModule,
    CommonModule,
    NgMaterialMultilevelMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatSortModule,
    MatChipsModule,
    BrowserAnimationsModule,
    OrderModule,
    MatTableModule,
    MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatAutocompleteModule, MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: true,
      positionClass: 'toast-top-right'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBzP8VloFySG4bZzJocclhYSkpi5mtRfcY'
    }),
    HomeModule,
    AdminModule,
    ImageCropperModule,
    NgxSpinnerModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
