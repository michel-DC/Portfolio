import React, { PropsWithChildren } from "react";
import cn from "classnames";

export const Section = (props: PropsWithChildren<{ className?: string }>) => {
  return (
    <section className={cn("max-w-3xl px-4 m-auto py-4", props.className)}>
      {props.children}
    </section>
  );
};
