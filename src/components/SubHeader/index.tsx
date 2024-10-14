interface Props {
  left: any;
  right: any;
}

export default function SubHeader({ left, right }: Props) {
  return (
    <div className="z-30 flex justify-around w-full text-center bg-white border-b border-lightgray">
      <div className={`w-24 h-10 flex items-center justify-center`}>{left}</div>
      <div className={`w-24 h-10 flex items-center justify-center`}>
        {right}
      </div>
    </div>
  );
}
