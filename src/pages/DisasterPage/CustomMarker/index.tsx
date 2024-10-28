export default function CustomMarker({ title }: { title: string }) {
  const contentArray = [
    '<div style="margin: 0; display: table; padding: 0.25rem 0.5rem; table-layout: auto; border-radius: 10rem; border: 0.15rem solid var(--color--darkgreen); background: white; cursor: pointer; position: relative; z-index: 2">',
    '<div style="padding: 0 0.25rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: table-cell; vertical-align: middle; cursor: pointer; font-size: 0.75rem; font-weight: 500;">',
    title,
    "</div>",
    '<span style="position: absolute; border-style: solid; border-width: 0.5rem 0.35rem 0 0.35rem; border-color: #ffffff transparent; width: 0; z-index: 1; top: 1.4rem; left: 1rem;"></span>',
    '<span style="position: absolute; border-style: solid; border-width: 0.5rem 0.35rem 0 0.35rem; border-color: var(--color--darkgreen) transparent; width: 0; z-index: 0; top: 1.65rem; left: 1rem;"></span>',
    "</div>",
  ];
  return contentArray.join("");
}
