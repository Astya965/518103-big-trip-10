export default class Point {
  constructor(point) {
    this.type = point[`type`];
    this.city = point[`destination`][`name`];
    this.startDate = new Date(point[`date_from`]).getTime();
    this.endDate = new Date(point[`date_to`]).getTime();
    this.offers = point[`offers`];
    this.photos = point[`destination`][`pictures`];
    this.description = point[`destination`][`description`];
    this.price = point[`base_price`];
    this.isFavorite = point[`is_favorite`];
    this.id = point[`id`];
  }

  toRAW() {
    return {
      'base_price': Number(this.price),
      'date_from': new Date(this.startDate).toISOString(),
      'date_to': new Date(this.endDate).toISOString(),
      'destination': {
        description: this.description,
        name: this.city,
        pictures: this.photos
      },
      'id': this.id,
      'is_favorite': this.isFavorite,
      'offers': this.offers,
      'type': this.type
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
