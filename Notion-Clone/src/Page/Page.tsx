import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { NodeContainer } from "../Node/NodeContainer";
import { Title } from "./Title";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";
import { DndContext, DragOverlay, DragEndEvent } from "@dnd-kit/core";
import {
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
// <script src="https://gist.github.com/satansdeer/d9a59985d438054b475df7c85a4edb86.js"></script>
//<script src="https://gist.github.com/satansdeer/d10f7c4aeb126ccb113e2bd91735c947.js"></script>
export const Page = () => {
  const { title, nodes, addNode, reorderNodes, setTitle } = useAppState();

  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });


  const handleDragEvent (event: DragEndEvent) => {
    const {active, over } = event;
    if(over?.id && active.id !== over?.id)
    reorderNodes(active.id as string, over.id as string)

  }

  return (
    <>
      <Cover />
      <div>
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext items={nodes}  strategy={verticalListSortingStrategy}>
            <Title addNode={addNode} title={title} changePageTitle={setTitle} />
            {nodes.map((node, index) => (
              <NodeContainer
                key={node.id}
                node={node}
                isFocused={focusedNodeIndex === index}
                updateFocusedIndex={setFocusedNodeIndex}
                index={index}
              />
            ))}
          </SortableContext>
          <DragOverlay />
        </DndContext>
        <Spacer
          showHint={!nodes.length}
          handleClick={() => {
            addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
          }}
        />
      </div>
    </>
  );
};
