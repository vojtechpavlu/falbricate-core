import { Pipe, PipeConfiguration, PipeFactory } from '../pipes';
import { Order, orderItems } from '../utils';
import { deepCopy } from '../utils/deep-copy';

const AVAILABLE_ORDERING = ['asc', 'desc'];

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
