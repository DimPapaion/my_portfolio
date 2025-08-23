import React from "react";


export default function Section({
id,
title,
children,
}: React.PropsWithChildren<{ id?: string; title: string }>) {
return (
<section id={id} className="max-w-4xl mx-auto px-6 py-12">
<h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
<div className="mt-4 text-gray-700 leading-relaxed">{children}</div>
</section>
);
}