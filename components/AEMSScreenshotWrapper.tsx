"use client";

import React, { forwardRef } from "react";

const AEMSScreenshotWrapper = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(function AEMSScreenshotWrapper(props, ref) {
  return (
    <div
      ref={ref}
      className="
        screenshot-target 
        relative 
        w-full 
        space-y-12 
        [&>*]:scroll-m-4
      "
    >
      {props.children}
    </div>
  );
});

export default AEMSScreenshotWrapper;
