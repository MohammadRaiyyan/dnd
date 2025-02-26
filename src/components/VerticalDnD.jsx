import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useCallback, useState } from "react";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function DefaultItemRenderer({ item }) {
  return <div>{item.content}</div>;
}

const ItemList = React.memo(function ItemList({
  items,
  itemRenderer: ItemRenderer,
}) {
  return items.map((item, index) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ItemRenderer item={item} />
        </div>
      )}
    </Draggable>
  ));
});

function VerticalDnD({
  initialItems,
  itemRenderer: ItemRenderer = DefaultItemRenderer,
}) {
  const [state, setState] = useState({ items: initialItems });

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      const items = reorder(
        state.items,
        result.source.index,
        result.destination.index
      );

      setState({ items });
    },
    [state.items]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: "#f9f9f9",
              padding: "10px",
              width: "max-content",
              border: `2px dotted ${
                snapshot.isDraggingOver ? "gray" : "transparent"
              }`,
              ...provided.droppableProps.style,
            }}
          >
            <ItemList items={state.items} itemRenderer={ItemRenderer} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default VerticalDnD;
