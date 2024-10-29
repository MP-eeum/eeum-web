import React from 'react';

interface EmergencyButtonProps {
  number: string;
  title: string;
  description: string;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ number, title, description }) => {
  const handleClick = () => {
    window.location.href = `tel:${number}`;
  };

  return (
    <button 
      onClick={handleClick}
      className="w-full bg-white rounded-2xl shadow-md p-4 mb-8 flex items-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <div className="bg-[#2E5F4B] w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-medium shrink-0">
        {number}
      </div>
      <div className="flex flex-col items-start ml-4">
        <span className="font-semibold text-lg">{title}</span>
        <span className="text-gray-600 text-sm">{description}</span>
      </div>
    </button>
  );
};

const Emergency = () => {
  const emergencyNumbers = [
    {
      number: "112",
      title: "경찰청",
      description: "범죄 신고"
    },
    {
      number: "119",
      title: "안전신고센터",
      description: "화재·구조·구급·재난신고"
    },
    {
      number: "110",
      title: "국민권익위원회",
      description: "로드킬 동물 신고 및 모든 민원상담"
    }
  ];

  return (
    <div className="w-10/12 mx-auto mt-8">
      {emergencyNumbers.map((item) => (
        <EmergencyButton
          key={item.number}
          number={item.number}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Emergency;