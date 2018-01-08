export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  string: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
