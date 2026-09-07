import type {DragOperation} from '@dnd-kit/abstract';
import type {Draggable, Droppable} from '@dnd-kit/dom';
import {
  isSortable,
  isSortableOperation,
  type SortableDraggable,
  type SortableDroppable,
} from '@dnd-kit/dom/sortable';

// Exact equality also rejects `any`, which ordinary assignments would allow.
type Equal<T, U> =
  (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2
    ? true
    : false;

declare function expectType<T extends true>(): void;

interface ItemData {
  title: string;
}

interface ContainerData {
  capacity: number;
}

declare const source: Draggable<ItemData> | null;
declare const target: Droppable<ItemData> | null;

if (isSortable(source)) {
  expectType<Equal<typeof source, SortableDraggable<ItemData>>>();
  expectType<Equal<typeof source.data, ItemData>>();
}

if (isSortable(target)) {
  expectType<Equal<typeof target, SortableDroppable<ItemData>>>();
  expectType<Equal<typeof target.data, ItemData>>();
}

// Source and target data need not have the same shape.
declare const mixedOperation: DragOperation<
  Draggable<ItemData>,
  Droppable<ContainerData>
>;

if (isSortableOperation(mixedOperation)) {
  expectType<
    Equal<
      typeof mixedOperation,
      DragOperation<
        SortableDraggable<ItemData>,
        SortableDroppable<ContainerData>
      >
    >
  >();
}
