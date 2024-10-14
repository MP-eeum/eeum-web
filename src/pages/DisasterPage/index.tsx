import Header from "../../components/Header";

export default function DisasterPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header title="긴급상황" button={null} />
      <div className="flex-1 w-full bg-lightgray" />
    </div>
  );
}
