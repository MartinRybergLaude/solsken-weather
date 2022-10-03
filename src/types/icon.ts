import { FunctionComponent } from "react";

export type SVGIcon = FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;
