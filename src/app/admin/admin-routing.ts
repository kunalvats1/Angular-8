import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ContactComponent } from './cardView/contact.component';
import { EditviewComponent } from './editview/editview.component';
import { MapviewComponent } from './mapview/mapview.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ListviewComponent } from './listview/listview.component';
import { ProductCardViewComponent } from './product-card-view/product-card-view.component';
import { ProductviewComponent } from './add-Product/productview.component';

const routes: Routes = [
    {
        path: '',
        component: SidenavComponent,

        children: [{
            path: '',
            component: AnalyticsComponent,
            pathMatch: "full"
        },
        {
            path: 'admin/card-view',
            component: ContactComponent,
            pathMatch: "full"
        },
        {
            path: 'edit-view',
            component: EditviewComponent,
            pathMatch: "full"
        },
        {
            path: 'map-view',
            component: MapviewComponent,
            pathMatch: "full"
        },
        {
            path: 'list-view',
            component: ListviewComponent,
            pathMatch: "full"
        },
        {
            path: 'admin/new-customer',
            component: NewCustomerComponent,
            pathMatch: "full"
        },
        {
            path: 'admin/product-view',
            component: ProductCardViewComponent,
            pathMatch: "full"
        },
        {
            path: 'admin/add-product',
            component: ProductviewComponent,
            pathMatch: "full"
        }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }