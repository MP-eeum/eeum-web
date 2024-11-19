import logo_eeum from "../../assets/images/logo_eeum.png";

interface Props {
  title: string;
  button: any;
}

export default function Header({ title, button }: Props) {
  return (
    <div className="fixed z-30 flex items-center justify-center h-12 bg-white w-96">
      <img className="absolute left-7" alt="이음" src={logo_eeum} />
      <div className="text-lg">{title}</div>
      <div className="absolute right-3">{button}</div>
    </div>
  );
}
