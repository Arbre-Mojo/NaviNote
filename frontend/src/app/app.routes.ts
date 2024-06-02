import { Routes } from '@angular/router';
import {TimeTableComponent} from "./component/time-table/time-table.component";
import {LoginComponent} from "./component/authentication/login/login.component";
import {StorageKeys} from "./component/misc/storage-keys";
import {PartnerSelectionComponent} from "./component/authentication/partner-selection/partner-selection.component";
import {PasswordRecoveryComponent} from "./component/authentication/password-recovery/password-recovery.component";
import {PasswordResetComponent} from "./component/authentication/password-reset/password-reset.component";
import {UserAccountComponent} from "./component/user-account/user-account.component";
import {ManageUsersComponent} from "./component/user-account/manage-users/manage-users.component";
import {ConnectionSecurityComponent} from "./component/user-account/connection-security/connection-security.component";
import {UserSettingsComponent} from "./component/user-account/user-settings/user-settings.component";
import {MessagesComponent} from "./component/messages/messages.component";
import {AbsencesAndTardinessComponent} from "./component/absences-and-tardiness/absences-and-tardiness.component";
import {ManageJustificationsComponent} from "./component/manage-justifications/manage-justifications.component";

export let routes: Routes;
routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'partner-selection', component: PartnerSelectionComponent},
  {path: 'password-recovery', component: PasswordRecoveryComponent},
  {path: `password-reset/:${StorageKeys.USER_TOKEN}`, component: PasswordResetComponent},
  {path: 'absences-and-tardiness', component: AbsencesAndTardinessComponent},
  {path: 'manage-justifications', component: ManageJustificationsComponent},
  {path: 'time-table', component: TimeTableComponent},
  {path: 'messages', component: MessagesComponent},
  {
    path: 'user-account', component: UserAccountComponent, children: [
      {path: `manage-users/:${StorageKeys.USER_CATEGORY}`, component: ManageUsersComponent},
      {path: 'connection-security', component: ConnectionSecurityComponent},
      {path: 'user-settings', component: UserSettingsComponent},
    ],
  },
];
