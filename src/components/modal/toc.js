import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch } from "react-redux";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { closeModal } from "../../store/slices/UI/uiSlice";
import { tocMD } from "../../utils/tocMD";

export const Toc = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col bg-white w-full z-50">
      <p
        className="absolute top-0 right-2 text-sm text-white"
        onClick={() => dispatch(closeModal())}
      >
        x
      </p>
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
