import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { SampleComponent } from './sample/sample.component';
import { UsersComponent } from './users/users.component';
import { UsersModule } from './users/users.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import { ItemsComponent } from './items/items.component';
import { ItemsProfileComponent } from './items/items-profile/items-profile.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ItemsModule } from './items/items.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrdersModule } from './orders/orders.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PaymentModule } from './payment/payment.module';


const routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'items',
    loadChildren: './items/items.module#ItemsModule'
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'subscription',
    component: SubscriptionComponent
  }
];

@NgModule({
  declarations: [
    SampleComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    UsersModule,
    ProfileModule,
    InventoryModule,
    OrdersModule,
    PaymentModule,
    ScheduleModule,
    SubscriptionModule
  ],
  exports: [
    SampleComponent
  ]
})
export class MainModule { }
