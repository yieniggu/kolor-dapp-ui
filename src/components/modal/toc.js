import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { tocMD } from "../../utils/tocMD";

export const Toc = () => {
  return (
    <div className="flex flex-col bg-white w-full">
      <ReactMarkdown
        components={{
          hr: ({ node, ...props }) => (
            <div className="border-b-2 border-accent-light"></div>
          ),
        }}
        className={`mx-4 grow h-screen text-accent-light font-poppins max-h-[calc(100vh-13rem)] overflow-y-auto prose markdown`}
        remarkPlugins={[remarkGfm, rehypeHighlight]}
        children={tocMD}
      />
    </div>
  );
};
