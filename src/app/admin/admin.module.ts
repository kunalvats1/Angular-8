import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, MatInputModule, MatSortModule, MatChipsModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatAutocompleteModule, MatFormFieldModule } from '@angular/material';
import { ContactComponent } from './cardView/contact.component';
import { FilterPipe } from '../Filters/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { EditviewComponent } from './editview/editview.component';
import { MapviewComponent } from './mapview/mapview.component';
import { AgmCoreModule } from '@agm/core';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ListviewComponent } from './listview/listview.component';
import { ProductCardViewComponent } from './product-card-view/product-card-view.component';
import { ProductviewComponent } from './add-Product/productview.component';
import { ProdFilter } from '../Filters/productFilter.pipe';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    SidenavComponent,
    AnalyticsComponent,
    ContactComponent,
    ProductCardViewComponent,
    ProductviewComponent,
    EditviewComponent,
    MapviewComponent,
    NewCustomerComponent,
    ListviewComponent,
    FilterPipe,
    ProdFilter
  ],
  imports: [
    CommonModule,
    AgmCoreModule,
    AdminRoutingModule,
    NgMaterialMultilevelMenuModule,
    MatSidenavModule,
    LazyLoadImageModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatSortModule,
    MatChipsModule,
    NgxPaginationModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class AdminModule { }
