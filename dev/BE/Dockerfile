# 베이스 이미지 선택
FROM openjdk:8

# 작업 디렉토리 생성
WORKDIR /app

# 환경 변수 설정
ENV TZ=Asia/Seoul

# 포트 노출
EXPOSE 8081

# 사용자 변경
USER root

# 애플리케이션 JAR 파일을 Docker 이미지로 복사
COPY ./target/A104.jar /app.jar

# 애플리케이션 실행 명령
CMD ["java", "-jar", "/app.jar"]