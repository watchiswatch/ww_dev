# 베이스 이미지 선택
FROM node:20.5

# 작업 디렉토리 생성
WORKDIR /app

# 환경 변수 설정
ENV TZ=Asia/Seoul

# 포트 노출
EXPOSE 3000

# 사용자 변경
USER root

# 소스 코드 복사
COPY package.json .

RUN npm install

COPY . .

# 애플리케이션 실행

CMD [ "npm", "start" ]