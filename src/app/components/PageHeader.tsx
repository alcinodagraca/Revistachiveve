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
    <div className="mb-8 md:mb-10">
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <Heading as="h1" variant="page-title" className={subtitle ? "mb-2" : undefined}>
        {title}
      </Heading>
      {subtitle && (
        <p className="font-sans text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
