/**
 * Basic generic map-based container for named entities.
 */
export class Registry<T> {
  private readonly registryType: string;
  private records: Record<string, T>;

  /**
   * Constructor requiring the name of the registry.
   *
   * @param {string} registryType Name of the registry. Can't be changed later.
   * @param {Record<string, T>} initials Optional initial input.
   *
   * @template T Type of the record's item
   */
  constructor(registryType: string, initials: Record<string, T> = {}) {
    if (!registryType) {
      throw new Error('Registry type must be a non-empty string');
    }

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
   * Tries to retrieve an item with the given name.
   *
   * @template T Type of the record's item
   *
   * @param {string} name of the item to be retrieved
   *
   * @returns {T} Item assigned to this name
   *
   * @throws {Error} When no such item was found
   */
  public get = (name: string): T => {
    const item = this.records[name];

    if (!item) {
      throw new Error(
        `No item '${name}' found in registry ${this.registryType}`,
      );
    }

    return item;
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
    if (!name) {
      throw new Error(`Item's name for ${this.registryType} must be a non-empty string ('${name}')`)
    } else if (this.has(name)) {
      throw new Error(
        `Can't register '${name}' into ${this.registryType} registry` +
          ` - already exists`,
      );
    } else if (!item) {
      throw new Error(`Given item for ${this.registryType} must not be empty value`);
    }

    this.records[name] = item;
  };

  /**
   * Tries to register all the given items under its names.
   *
   * @param {Record<string, T>} map Map of items assigned to their names
   *
   * @template T Type of the record's item
   */
  public registerAll = (map: Record<string, T>): void => {
    for (const key of Object.keys(map)) {
      const item = map[key] as T;
      this.register(key, item);
    }
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
