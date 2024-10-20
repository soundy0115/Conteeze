import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { getSonglists } from '../services/api';
import { Songlist } from '../types';

const SonglistManager: React.FC = () => {
  const [songlists, setSonglists] = useState<Songlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSonglists()
      .then(data => {
        setSonglists(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching songlists:", err);
        setError("플레이리스트를 불러오는 데 실패했습니다.");
        setIsLoading(false);
      });
  }, []);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(songlists);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSonglists(items);
  }, [songlists]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="songlist">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {songlists.map((songlist, index) => (
              <Draggable key={songlist.id} draggableId={songlist.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {songlist.title}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SonglistManager;
