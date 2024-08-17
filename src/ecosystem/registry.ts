export class Registry<T> {
  private readonly registryType: string;
  private records: Record<string, T>;

  constructor(registryType: string, initials: Record<string, T> = {}) {
    this.records = initials;
    this.registryType = registryType;
  }

  /**
   * Returns whether there is an item with such name registered or not.
   *
   * @param {string} name by which the records should be searched by
   *
   * @returns {boolean} `true` when there is a record with this name
   * registered. Otherwise `false`.
   */
  public has = (name: string): boolean => {
    return !!this.records[name];
  };

  /**
   * Tries to register the given item under a given name.
   *
   * @template T Type of the record's item
   *
   * @param {string} name under which should this item be registered
   * @param {T} item to be registered under a given name
   *
   * @throws {Error} When there is already an item registered under
   * the given name
   */
  public register = (name: string, item: T): void => {
    if (this.has(name)) {
      throw new Error(
        `Can't register '${name}' into ${this.registryType} registry` +
          ` - already exists`,
      );
    }

    this.records[name] = item;
  };

  /**
   * Removes an item from the registry.
   *
   * @param {string} name of the item to be removed
   */
  public remove = (name: string): void => {
    const midObject: Record<string, T> = {};

    for (const key of Object.keys(this.records)) {
      if (key !== name) {
        midObject[key] = this.records[key] as T;
      }
    }

    this.records = midObject;
  };
}