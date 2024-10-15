/*
  Interface to define the structure of the Driver data used in the DriversService.
  This interface ensures consistency when handling driver data throughout the frontend.
*/

export interface IDrivers {
  id?: number;
  name: string;
  age: number;
  nationality: string;
  image: string;
}
