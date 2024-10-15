interface Props {
  title: string;
  link: string;
  pubDate: string;
}

export default function Urgent({ title, link, pubDate }: Props) {
  return (
    <div
      className={`min-w-44 h-28 rounded-2xl bg-primary px-4 flex flex-col justify-center text-white gap-2 cursor-pointer select-none`}
      onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
    >
      <div className="font-bold">{title}</div>
      <div className="text-sm">{pubDate}</div>
    </div>
  );
}
