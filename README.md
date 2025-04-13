# 이음
2024-09 - 2024.12 (3人 팀 프로젝트)
![Image](https://github.com/user-attachments/assets/dab2d031-5d45-4bb8-9a9c-82630009ec1c)
![Image](https://github.com/user-attachments/assets/37fa47b9-9178-407e-bdd7-da4140aac359)
![Image](https://github.com/user-attachments/assets/eb1fdd61-2a84-4ee3-baea-4cf3871df1f0)
![Image](https://github.com/user-attachments/assets/c9785223-fff4-4520-ba17-c037f70c39f0)
![Image](https://github.com/user-attachments/assets/b860fce2-14f5-4e8e-b047-5874c5f74247)
![Image](https://github.com/user-attachments/assets/2a1a8428-88dd-4fb7-8d31-a1bb10c2116b)





### 🔗 URL
https://github.com/MP-eeum/eeum-web






### 📌 Summary
기상 예·특보 정보 제공 및 대피로 안내 등의 서비스를 제공하는 재난 안전 웹사이트
• 네이버, OPEN AI, 행정안전부, 기상청 등 다양한 외부 API를 활용하며 CORS 해결
• GPT 모델을 활용한 챗봇 구현
• 현 위치 기반의 기상정보 및 대피소, 병·의원 정보 조회 기능 구현
• 예·특보 자료를 활용한 재난 예측 기능 구현
주요기능: 예·특보 조회, 행동 요령 영상 제공, AI 챗봇, 재난 관련 뉴스 조회, 근처 병·의원 및 대피소까지의 길찾기






### 🤔 Background
각 재난 별 대비 방법과 재난 발생 시 행동 요령을 알고 계시나요? 어렸을 적부터 학교에서 재난 대피 훈련을 하고 영상 교육을 받은 경험이 있지만 정작 기억하고 있는 것은 지진 발생 시 행동 요령이 전부였습니다. 지진 외에도 태풍, 홍수, 산사태 등 수많은 재난이 있지만 그에 대한 행동 요령은 잘 알지 못합니다. 이에 각종 재난을 예측하고 대비 방법을 알려주는 서비스가 있다면 자연 재난, 사회 재난에 있어 큰 도움이 될 수 있다 생각했습니다.







### 🔍 Meaning
자체 API를 구축하는 대신 다양한 외부 API를 활용하여 서비스를 제공하였습니다. 연동 과정에서 각 API에서 호출되는 URL의 도메인이 서로 달라 CORS 오류가 빈번하게 발생하였습니다. 기존에 경험했던 Proxy 설정이나 서버 내 Express를 이용하는 방식으로는 해결이 어려웠으나 CORS 에러 처리 방식을 조사한 후, createProxyMiddleware를 활용하여 setupProxy.js를 작성함으로써 문제를 해결하며 CORS 개념과 에러 처리 방법을 보다 깊이 이해할 수 있었습니다.


또, 외부 API의 데이터를 필요한 형태로 가공하는 과정이 필요하였습니다. 예를 들어, 날씨 아이콘을 설정하는 과정에서 기상 데이터는 단순한 값(예: 'RAIN')으로 제공되는 것이 아니라, 구름 상태, 강수 확률, 강수 형태 등의 여러 요소로 나뉘어 제공되었습니다. 이에 따라 다양한 요소를 조합하여 적절한 날씨 아이콘을 매핑하는 알고리즘을 설계하였습니다.


또한, 기상청 API에서는 요청 시 기상청에서 자체적으로 사용하는 격자 좌표로 입력해야 함에 따라 사용자의 위치 정보를 격자 좌표로 변환하는 알고리즘도 새롭게 설계하였습니다. 이 과정에서 데이터의 규칙성을 파악하고 데이터 처리 및 변환 로직을 설계하는 능력을 더욱 향상시킬 수 있었습니다.







### 🔨 Technology Stacks
React, TypeScript, Tailwind CSS, Firebase
