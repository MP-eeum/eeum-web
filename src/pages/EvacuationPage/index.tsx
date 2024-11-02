import { useState } from "react";
import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import Behaviors from "./Behaviors";
import Emergency from "./Emergercy";

export default function EvacuationPage() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex flex-col w-full">
      <div className="h-12">
        <Header title="대피요령" button={null} />
      </div>
      <SubHeader
        left={
          <button
            className={`w-full h-full ${current === 0 && "border-b border-primary"}`}
            onClick={() => setCurrent(0)}
          >
            국민행동요령
          </button>
        }
        right={
          <button
            className={`w-full h-full ${current === 1 && "border-b border-primary"}`}
            onClick={() => setCurrent(1)}
          >
            긴급신고
          </button>
        }
      />
      {current === 0 ? <Behaviors /> : <Emergency />}
    </div>
  );
}
