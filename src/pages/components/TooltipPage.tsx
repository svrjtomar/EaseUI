import { Tooltip } from "@/components/Tooltip";
import ComponentDemo from "../ComponentsDemo";
import { Button } from "@/components/Button";

const TooltipPage = () => {
  const usageCode = `import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/Button";

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center p-8">
      {/* Dark Variant (Top) */}
      <Tooltip content="This is a dark tooltip" position="top" variant="dark">
        <Button variant="outline">Top (Dark)</Button>
      </Tooltip>

      {/* Light Variant (Bottom) */}
      <Tooltip content="This is a light tooltip" position="bottom" variant="light">
        <Button variant="outline">Bottom (Light)</Button>
      </Tooltip>

      {/* Primary Variant (Left) */}
      <Tooltip content="This is a primary tooltip" position="left" variant="primary">
        <Button variant="outline">Left (Primary)</Button>
      </Tooltip>

      {/* Custom Rich Content (Right) */}
      <Tooltip
        position="right"
        variant="dark"
        content={
          <div className="flex flex-col gap-1">
            <span className="font-bold text-indigo-400">Rich Tooltip</span>
            <span>Supports custom JSX layout</span>
          </div>
        }
      >
        <Button>Right (Rich Content)</Button>
      </Tooltip>
    </div>
  );
}`;

  return (
    <div>
      <ComponentDemo code={usageCode}>
        <div className="flex flex-wrap gap-4 items-center justify-center p-8 min-h-[200px]">
          {/* Dark Variant (Top) */}
          <Tooltip content="This is a dark tooltip" position="top" variant="dark">
            <Button variant="outline">Top (Dark)</Button>
          </Tooltip>

          {/* Light Variant (Bottom) */}
          <Tooltip content="This is a light tooltip" position="bottom" variant="light">
            <Button variant="outline">Bottom (Light)</Button>
          </Tooltip>

          {/* Primary Variant (Left) */}
          <Tooltip content="This is a primary tooltip" position="left" variant="primary">
            <Button variant="outline">Left (Primary)</Button>
          </Tooltip>

          {/* Custom Rich Content (Right) */}
          <Tooltip
            position="right"
            variant="dark"
            content={
              <div className="flex flex-col gap-1">
                <span className="font-bold text-indigo-400">Rich Tooltip</span>
                <span>Supports custom JSX layout</span>
              </div>
            }
          >
            <Button>Right (Rich Content)</Button>
          </Tooltip>
        </div>
      </ComponentDemo>
    </div>
  );
};

export default TooltipPage;