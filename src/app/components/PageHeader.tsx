import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { Heading } from "./typography";

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs: Crumb[];
}) {
  return (
    <div className="mb-8 md:mb-9">
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <Heading as="h1" variant="page-title" className={subtitle ? "mb-2.5" : undefined}>
        {title}
      </Heading>
      {subtitle && (
        <p className="w-full font-sans text-[0.92rem] font-light leading-[1.62] text-muted-foreground md:text-[0.98rem]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
