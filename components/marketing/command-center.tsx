import { approach } from "@/content/pages";
import { cx } from "@/utils/cx";

/**
 * The sponsor's view of the same record, beside the sponsor features on
 * /approach (sprint 7, after the previous clintrust.ai/solutions page): a
 * window with a live badge, three portfolio figures and a per-study table.
 * Example data, from `approach.commandCenter` in content/pages.ts. Static:
 * it is a picture of the product, so it is hidden from assistive technology
 * apart from its title.
 */
export function CommandCenter() {
  const data = approach.commandCenter;
  return (
    <figure className="overflow-hidden rounded-3xl border border-border-button-default bg-background-full shadow-xs">
      <div className="flex items-center justify-between gap-3 border-b border-separator-border px-5 py-4">
        <figcaption className="text-headline-medium text-text-primary">{data.title}</figcaption>
        <span className="flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-1 text-caption-1-medium text-accent-700">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-500 motion-safe:animate-pulse" />
          {data.status}
        </span>
      </div>

      <div aria-hidden="true" className="p-5">
        <dl className="grid grid-cols-3 gap-2">
          {data.tiles.map((tile) => (
            <div
              key={tile.label}
              className={cx(
                "rounded-2xl border p-3",
                "highlight" in tile && tile.highlight
                  ? "border-accent-200 bg-accent-50"
                  : "border-border-button-default bg-background-secondary-default",
              )}
            >
              <dt className="text-caption-1-medium text-text-secondary">{tile.label}</dt>
              <dd
                className={cx(
                  "mt-1 text-headline-semibold tabular-nums",
                  "highlight" in tile && tile.highlight ? "text-accent-700" : "text-text-primary",
                )}
              >
                {tile.value}
              </dd>
            </div>
          ))}
        </dl>

        <table className="mt-4 w-full text-start">
          <thead>
            <tr className="border-b border-separator-border">
              {data.columns.map((column, index) => (
                <th
                  key={column}
                  className={cx(
                    "pb-2 text-caption-1-medium text-text-tertiary",
                    index === 0 ? "text-start" : "text-end",
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.study} className="border-b border-separator-border last:border-b-0">
                <td className="py-2.5 text-body-2-medium text-text-primary">{row.study}</td>
                <td className="py-2.5 text-end text-body-2-regular tabular-nums text-text-secondary">{row.sites}</td>
                <td className="py-2.5 text-end text-body-2-regular tabular-nums text-text-secondary">{row.accrued}</td>
                <td className="py-2.5 text-end text-body-2-regular tabular-nums text-text-secondary">{row.paid}</td>
                <td className="py-2.5 text-end">
                  <span
                    className={cx(
                      "rounded-full px-2 py-0.5 text-caption-1-medium tabular-nums",
                      row.balance === "Current"
                        ? "bg-accent-50 text-accent-700"
                        : "bg-chart-8/15 text-text-primary",
                    )}
                  >
                    {row.balance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
