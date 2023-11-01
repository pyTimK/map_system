import { Constants } from "./constants";

class TimestampNameId {
  timestamp: number;
  name: string;

  // empty constructor
  static constructEmpty(): TimestampNameId {
    return new TimestampNameId(0, "");
  }

  // from string constructor
  static fromStr(str: string): TimestampNameId {
    if (!str.includes(Constants.delimeter))
      return TimestampNameId.constructEmpty();

    const listValues = str.split(Constants.delimeter);

    const timestamp = listValues[0];
    const name = listValues
      .slice(1, listValues.length)
      .join(Constants.delimeter);

    return new TimestampNameId(Number(timestamp), name);
  }

  // default constructor
  constructor(timestamp: number, name: string) {
    this.timestamp = timestamp;
    this.name = name;
  }

  // to string
  toString(): string {
    return this.timestamp.toString() + Constants.delimeter + this.name;
  }

  // override equality
  equals(other: TimestampNameId): boolean {
    return this.timestamp === other.timestamp && this.name === other.name;
  }
}

export default TimestampNameId;
