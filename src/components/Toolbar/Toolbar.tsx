import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolWrapper from "./ToolWrapper";
import ToolbarPanel from "./ToolbarPanel";
import {
  faCircle as faCircleFill,
  faEraser,
  faFileExport,
  faPen,
  faSquare as faSquareFill,
  faStar as faStarFill,
} from "@fortawesome/free-solid-svg-icons";

import {
  faCircle,
  faSquare,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import ToolbardDelimer from "./ToolDelimer";
import { Tool } from "../../utils/Shapes/Shape";

export default function Toolbar({
  setTool,
  color,
  setColor,
  exportFunc,
}: {
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  exportFunc: () => void;
}) {
  return (
    <ToolbarPanel>
      <ToolWrapper>
        <div
          className="aspect-square w-8 overflow-hidden rounded-full"
          style={{ backgroundColor: color }}
        >
          <input
            type="color"
            className="m-[-50%] h-[200%] w-[200%]"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </ToolWrapper>
      <ToolbardDelimer />
      <ToolWrapper onClick={() => setTool("line")}>
        <FontAwesomeIcon icon={faPen} />
      </ToolWrapper>
      <ToolWrapper onClick={() => setTool("eraser")}>
        <FontAwesomeIcon icon={faEraser} />
      </ToolWrapper>
      <ToolbardDelimer />
      <ToolWrapper onClick={() => setTool("circle")}>
        <FontAwesomeIcon icon={faCircle} />
      </ToolWrapper>
      <ToolWrapper onClick={() => setTool("rectangle")}>
        <FontAwesomeIcon icon={faSquare} />
      </ToolWrapper>
      <ToolWrapper onClick={() => setTool("star")}>
        <FontAwesomeIcon icon={faStar} />
      </ToolWrapper>
      <ToolbardDelimer />
      <ToolWrapper onClick={() => setTool("circleFill")}>
        <FontAwesomeIcon icon={faCircleFill} />
      </ToolWrapper>
      <ToolWrapper onClick={() => setTool("rectangleFill")}>
        <FontAwesomeIcon icon={faSquareFill} />
      </ToolWrapper>
      <ToolWrapper onClick={() => setTool("starFill")}>
        <FontAwesomeIcon icon={faStarFill} />
      </ToolWrapper>
      <ToolbardDelimer />
      <ToolWrapper onClick={exportFunc}>
        <FontAwesomeIcon icon={faFileExport} />
      </ToolWrapper>
    </ToolbarPanel>
  );
}
