import { ParentSize } from "@visx/responsive";
import type { FunctionComponent, ReactNode } from "react";

// read up on typescript react higher order components
// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb

export default function <P extends object>(
  OriginalComponent: FunctionComponent<P>
) {
  return function ReactComponentWrapper({ ...props }: P) {
    return (
      <ParentSize>
        {(parent) => (
          <OriginalComponent
            {...props}
            width={parent.width}
            height={parent.height || parent.width * 1}
          />
        )}
      </ParentSize>
    );
  };
}
