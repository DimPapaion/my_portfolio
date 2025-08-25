"use client";

import React, { useCallback, useRef, useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

const MAX_FILE_MB = 12;

async function fetchSegment(file: File, signal?: AbortSignal): Promise<Blob> {
  const form = new FormData();
  form.append("file", file, file.name);

  const res = await fetch("/api/segment", { method: "POST", body: form, signal });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.blob();
}

// export default function FloodSegDemo(): JSX.Element {
//   const [status, setStatus] = useState<Status>("idle");
//   const [error, setError] = useState<string | null>(null);
//   const [inputUrl, setInputUrl] = useState<string | null>(null);
//   const [outputUrl, setOutputUrl] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const abortRef = useRef<AbortController | null>(null);

//   const revokeUrls = useCallback(() => {
//     if (inputUrl) URL.revokeObjectURL(inputUrl);
//     if (outputUrl) URL.revokeObjectURL(outputUrl);
//     setInputUrl(null);
//     setOutputUrl(null);
//   }, [inputUrl, outputUrl]);

//   const validateFile = (file: File): string | null => {
//     if (!file.type.startsWith("image/")) return "Please upload an image file.";
//     if (file.size > MAX_FILE_MB * 1024 * 1024) {
//       return `File is too large. Max ${MAX_FILE_MB} MB.`;
//     }
//     return null;
//   };

//   const run = useCallback(
//     async (file: File) => {
//       const validation = validateFile(file);
//       if (validation) {
//         setError(validation);
//         setStatus("error");
//         return;
//       }

//       // cancel previous request if any
//       abortRef.current?.abort();
//       abortRef.current = new AbortController();

//       // reset state
//       setError(null);
//       revokeUrls();
//       setStatus("loading");

//       // show preview immediately
//       setInputUrl(URL.createObjectURL(file));

//       try {
//         const blob = await fetchSegment(file, abortRef.current.signal);
//         setOutputUrl(URL.createObjectURL(blob));
//         setStatus("done");
//       } catch (e) {
//         const msg = e instanceof Error ? e.message : "Request failed.";
//         setError(msg);
//         setStatus("error");
//       } finally {
//         abortRef.current = null;
//       }
//     },
//     [revokeUrls]
//   );

//   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (f) void run(f);
//   };

//   const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//     const f = e.dataTransfer.files?.[0];
//     if (f) void run(f);
//   };

//   const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const reset = () => {
//     abortRef.current?.abort();
//     setStatus("idle");
//     setError(null);
//     revokeUrls();
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-10">
//       <h1 className="text-2xl md:text-3xl font-bold">Flood Segmentation (PIDNet)</h1>
//       <p className="mt-2 text-sm opacity-80">
//         Upload a flood image; the server returns a PNG overlay produced by my PIDNet model.
//       </p>

//       {/* Uploader */}
//       <div className="mt-6">
//         <label
//           onDrop={onDrop}
//           onDragOver={onDragOver}
//           onDragLeave={onDragLeave}
//           className={[
//             "block rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition",
//             isDragging
//               ? "border-sky-400 bg-sky-50/60 dark:bg-sky-400/10"
//               : "border-black/10 dark:border-white/10 hover:border-sky-400/60",
//           ].join(" ")}
//         >
//           <input
//             type="file"
//             accept="image/*"
//             onChange={onInputChange}
//             className="hidden"
//           />
//           <div className="text-sm">
//             <div className="font-semibold">Drag & drop an image here</div>
//             <div className="opacity-70 mt-1">or click to browse (max {MAX_FILE_MB} MB)</div>
//           </div>
//         </label>

//         {/* Status row */}
//         <div className="mt-3 flex items-center gap-3 text-sm">
//           {status === "loading" && <span>Running inference…</span>}
//           {status === "done" && <span className="text-emerald-600">Done.</span>}
//           {status === "error" && <span className="text-red-600">{error}</span>}
//           {(status === "done" || status === "error") && (
//             <button
//               onClick={reset}
//               className="ml-auto inline-flex items-center rounded-full px-3 py-1.5 text-sm bg-black text-white dark:bg-white dark:text-black"
//             >
//               Reset
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Preview / Output */}
//       {(inputUrl || outputUrl) && (
//         <div className="mt-6 grid gap-6 md:grid-cols-2">
//           <figure className="space-y-2">
//             <figcaption className="text-sm opacity-70">Input</figcaption>
//             {inputUrl ? (
//               <img
//                 src={inputUrl}
//                 alt="Input"
//                 className="w-full rounded-xl ring-1 ring-black/10 dark:ring-white/10"
//               />
//             ) : (
//               <div className="h-64 rounded-xl bg-black/5 dark:bg-white/5" />
//             )}
//           </figure>
//           <figure className="space-y-2">
//             <figcaption className="text-sm opacity-70">Overlay (PIDNet)</figcaption>
//             {status === "loading" && (
//               <div className="h-64 rounded-xl animate-pulse bg-black/5 dark:bg-white/5" />
//             )}
//             {outputUrl && (
//               <img
//                 src={outputUrl}
//                 alt="Overlay"
//                 className="w-full rounded-xl ring-1 ring-black/10 dark:ring-white/10"
//               />
//             )}
//           </figure>
//         </div>
//       )}
//     </div>
//   );
// }
