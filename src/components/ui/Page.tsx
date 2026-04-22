import type { PropsWithChildren } from "react";

type PageProps = PropsWithChildren<{
  title: string;
  description?: string;
  actions?: React.ReactNode;
}>;

export function Page({
  title,
  description,
  actions,
  children,
}: PageProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          ) : null}
        </div>

        {actions ? <div>{actions}</div> : null}
      </div>

      {children}
    </section>
  );
}