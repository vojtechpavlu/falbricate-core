import { Pipe, PipeConfiguration, PipeFactory } from '../pipes';
import { Order, orderItems } from '../utils';
import { deepCopy } from '../utils/deep-copy';

const AVAILABLE_ORDERING = ['asc', 'desc'];

/**
 * This {@link PipeFactory} creates a pipe function being able to order
 * the keys in specified order.
 *
 * @param {PipeConfiguration} config Configuration containing an `order`
 * property (either `asc` or `desc`; optional - `asc` is default)
 *
 * @returns {Pipe} Pipe being able to turn given object into it's deep copy
 * with all the fields ordered.
 *
 * @throws {Error} When the configured `order` is not an allowed value
 * @throws {TypeError} When the given input into the generated {Pipe} is not
 * an object (e.g. when it's an array, string or anything else)
 */
export const orderKeysPipe: PipeFactory = (config: PipeConfiguration): Pipe => {
  const order = (config.order ?? 'asc') as Order;

  if (!AVAILABLE_ORDERING.includes(order)) {
    throw new Error(
      `Can't order object keys - unexpected ordering: '${order}', ` +
        `allowed options: ${AVAILABLE_ORDERING}`,
    );
  }

  return (item: unknown) => {
    if (typeof item !== 'object' || Array.isArray(item)) {
      throw new TypeError(
        `Can't order object keys - plain object (not array) is expected.`,
      );
    }

    const castedItem = item as Record<string, unknown>;

    const orderedKeys = orderItems(Object.keys(castedItem), order);
    const orderedObject: Record<string, unknown> = {};

    for (const key of orderedKeys) {
      orderedObject[key] = castedItem[key];
    }

    return deepCopy(orderedObject);
  };
};
