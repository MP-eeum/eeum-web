interface Props {
  left: any;
  right: any;
}

export default function SubHeader({ left, right }: Props) {
  return (
    <div className="fixed z-30 flex justify-around h-10 text-center bg-white border-b w-96 top-12 border-lightgray">
      <div className={`w-24 h-10 flex items-center justify-center`}>{left}</div>
      <div className={`w-24 h-10 flex items-center justify-center`}>
        {right}
      </div>
    </div>
  );
}
