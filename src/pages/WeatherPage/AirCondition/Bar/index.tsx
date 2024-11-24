import styled from "styled-components";

interface BarProps {
  width: string;
  color: string;
}

const Bar = styled.div<BarProps>`
  width: ${(props) => props.width}%;
`;

interface Props {
  gauge: number;
}

export default function ProgressBar({ gauge }: Props) {
  return (
    <div className="relative h-full">
      <div className="relative w-full h-4 rounded-xl bg-lightgray"></div>
      <Bar
        className="absolute top-0 h-4 rounded-xl bg-primary"
        width={gauge.toString()}
        color={"black"}
      >
        <div className="absolute right-0 w-4 h-4 border-2 border-white bg-none rounded-xl" />
      </Bar>
    </div>
  );
}
