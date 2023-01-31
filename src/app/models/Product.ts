export class Product {
  _id?: string;
  price?: number;
  name: string;
  description: string;
  stock: number;
  category?: string;
  file?: Blob;
  imageurl?: string;

  constructor() {
    this._id = '';
    this.price = 1;
    this.name = '';
    this.description = '';
    this.stock = 1;
    this.category = '';
    this.file;
    this.imageurl;
  }
}
