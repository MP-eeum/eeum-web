interface Props {
  title: string;
  pubDate: string;
}

export default function UrgentItem({ title, pubDate }: Props) {
  return (
    <div
      className={`min-w-44 h-28 rounded-2xl bg-primary px-4 flex flex-col justify-center text-white gap-2 cursor-pointer`}
    >
      <div className="font-bold">{title}</div>
      <div className="text-sm">{pubDate}</div>
    </div>
  );
}
