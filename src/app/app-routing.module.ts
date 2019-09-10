import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapviewComponent } from './mapview/mapview.component';
import { ListviewComponent } from './listview/listview.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { EditviewComponent } from './editview/editview.component';
import { ProductviewComponent } from './Product/add-Product/productview.component';
import { ProductCardViewComponent } from './Product/product-card-view/product-card-view.component';
import { ProductComponent } from './Product/productHomePage/product.component';
import { LoginhomeComponent } from './login/loginhome/loginhome.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthGuard } from "./shared/guard/auth.guard";

const routes: Routes = [{ path: 'map-view', component: MapviewComponent },
{ path: 'listView', component: ListviewComponent, canActivate: [AuthGuard] },
{ path: 'editview', component: EditviewComponent, canActivate: [AuthGuard] },
{ path: 'newCustomer', component: NewCustomerComponent, canActivate: [AuthGuard] },
{ path: 'add-product', component: ProductviewComponent, canActivate: [AuthGuard] },
{ path: 'product-view', component: ProductCardViewComponent, canActivate: [AuthGuard] },
{ path: 'cardView', component: ProductComponent, canActivate: [AuthGuard] },
{ path: 'login', component: LoginhomeComponent },
{ path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
