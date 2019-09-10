import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AppComponent } from './app.component';
import { ContactComponent } from './cardView/contact.component';
import { StudentService } from './student.service';
import { MatCardModule, MatInputModule, MatSortModule, MatChipsModule, MatIconModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { FilterPipe } from './Filters/filter.pipe';
import { ProdFilter } from './Filters/productFilter.pipe';
import { MapviewComponent } from './mapview/mapview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ListviewComponent } from './listview/listview.component';
import { OrderModule } from 'ngx-order-pipe';
import { MatTableModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { EditviewComponent } from './editview/editview.component';
import { LoginComponent } from './login/login.component';
import { ProductviewComponent } from './Product/add-Product/productview.component';
import { ProductCardViewComponent } from './Product/product-card-view/product-card-view.component';
import { ProductComponent } from './Product/productHomePage/product.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { MatToolbarModule, MatListModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginhomeComponent } from './login/loginhome/loginhome.component';
import { AnalyticsComponent } from './analytics/analytics.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    FilterPipe,
    ProdFilter,
    MapviewComponent,
    ListviewComponent,
    NewCustomerComponent,
    EditviewComponent,
    LoginComponent,
    ProductviewComponent,
    ProductCardViewComponent,
    ProductComponent,
    LoadingSpinnerComponent,
    LoginhomeComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatListModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSidenavModule,
    LazyLoadImageModule,
    DragDropModule,
    MatChipsModule,
    AngularFireDatabaseModule, // for Database
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    AppRoutingModule,
    NgxPaginationModule,
    MatSortModule,
    HttpClientModule,
    MatTableModule,
    NgMaterialMultilevelMenuModule,
    MatPaginatorModule,
    OrderModule,
    FormsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: true,
      positionClass: 'toast-top-right'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7sihI8OwIZbR2-Mz_2vmYL07dSZnIJSY'
    })
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
