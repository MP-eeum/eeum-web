interface Props {
  title: string;
  button: any;
}

export default function Header({ title, button }: Props) {
  return (
    <div className="fixed z-30 flex items-center justify-center h-12 bg-white w-96">
      <div className="text-lg">{title}</div>
      <div className="absolute right-3">{button}</div>
    </div>
  );
}
