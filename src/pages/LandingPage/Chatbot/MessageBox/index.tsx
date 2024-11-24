interface Props {
  isRes: boolean;
  message: string;
}

export default function MessageBox({ isRes, message }: Props) {
  return (
    <div
      className={`px-4 py-2 rounded-2xl w-fit select-text text-sm font-medium ${isRes ? "bg-boxgray" : "bg-primary text-white"}`}
      dangerouslySetInnerHTML={{ __html: message }}
    ></div>
  );
}
