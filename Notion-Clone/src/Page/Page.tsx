import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { BasicNode } from "../Node/BasicNode";
import { Title } from "./Title";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";
// <script src="https://gist.github.com/satansdeer/d9a59985d438054b475df7c85a4edb86.js"></script>
//<script src="https://gist.github.com/satansdeer/d10f7c4aeb126ccb113e2bd91735c947.js"></script>
export const Page = () => {
  const { title, nodes, addNode, setTitle } = useAppState();

  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        {nodes.map((node, index) => (
          <BasicNode
            key={node.id}
            node={node}
            isFocused={focusedNodeIndex === index}
            updateFocusedIndex={setFocusedNodeIndex}
            index={index}
          />
        ))}
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
