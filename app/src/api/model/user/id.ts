import { v4 as uuid } from 'uuid';

export class Id {
  private readonly data: Identifier
  
  public constructor(value: Identifier) {
    this.data = value;
  }
  
  public static generate() {
    return new Id(uuid());
  }
  
  public get value() {
    return this.data;
  }
}