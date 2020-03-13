export interface ExportedUser {
  uid: string;
  email: string;
  displayName: string;
  phone: string;
  photoURL: string;
  providers: string[];
  creationTime: string;
  lastSignInTime: string;
  disabled: boolean;
}
