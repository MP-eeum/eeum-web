import { useState } from "react";
import icn_close from "../../../assets/icons/icn_close.svg";
import icn_btnAI from "../../../assets/icons/icn_btnAI.png";
import icn_send from "../../../assets/icons/icn_send.svg";
import MessageBox from "./MessageBox";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const questions = [
  "최근 한국에서 일어난 지진에 대해 알려줘.",
  "최근 한국에서 발생한 산불에 대해 알려줘.",
  "최근 한국에서 발생한 폭염에 대해 알려줘.",
];

export default function Chatbot({ setShowChat }: any) {
  const [chat, setChat] = useState<string[]>([
    "안녕하세요, 이음입니다.<br/>문의하실 내용이 있으신가요?",
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const day = new Date();

  const formatDate = (input: any) => {
    const date = new Date(input);
    return (
      date.toISOString().split("T")[0].replace(/-/g, ".") +
      " " +
      daysOfWeek[day.getDay()] +
      "요일"
    );
  };

  const handleInput = (e: any) => {
    setInput(e.target.value);
  };

  const handleOpenAIFunc = async (req: string) => {
    setInput("");
    setLoading(true);
    const message = req.trim();
    const url = "https://api.openai.com/v1/chat/completions";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.8,
          max_tokens: 1024,
          top_p: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0.5,
          stop: ["STOP"],
        }),
      });
      const data = await res.json();
      setChat([...chat, message, data.choices[0].message.content]);
    } catch (e) {
      console.log(e);
      setChat((chat) => chat.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full gap-2 bg-white rounded-3xl">
      <div className="relative w-full py-5 text-lg text-center">
        AI 재난 안내 챗봇
        <div className="absolute top-0 flex items-center h-full right-6">
          <img
            src={icn_close}
            className="cursor-pointer"
            onClick={() => setShowChat(false)}
          />
        </div>
      </div>
      <div className="text-sm text-center text-textlight">
        {formatDate(day)}
      </div>
      <div className="flex flex-col w-full gap-2 pb-4 mb-20 overflow-y-auto h-fit Chatbot">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`w-full py-3 flex px-6 gap-2 justify-${index % 2 === 0 ? "start" : "end"}`}
          >
            {index % 2 === 0 && <img className="w-10 h-10" src={icn_btnAI} />}
            <div
              className={`flex flex-col gap-2 text-sm items-${index % 2 === 0 ? "start" : "end"}`}
            >
              <MessageBox isRes={index % 2 === 0} message={msg} />
              {index % 2 === 0 && (
                <div className="flex flex-col gap-1">
                  {questions.map((item, index) => (
                    <div
                      className="px-3 py-2 border cursor-pointer border-boxgray rounded-3xl hover:border-primary"
                      key={index}
                      onClick={() => {
                        handleOpenAIFunc(item);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute flex items-center bottom-0 flex-1 w-[90%] h-12 p-2 my-8 text-sm border rounded-3xl border-primary bg-white">
        <input
          className="flex-1 px-2 outline-none"
          placeholder="무엇이든 물어보세요."
          onChange={handleInput}
          value={input}
        />
        {input !== "" && (
          <img
            className="cursor-pointer"
            src={icn_send}
            onClick={() => handleOpenAIFunc(input)}
          />
        )}
      </div>
    </div>
  );
}
