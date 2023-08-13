#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <MFRC522.h>
#include <SPI.h>

#define SS_PIN  5  // ESP32 pin GIOP5 
#define RST_PIN 27 // ESP32 pin GIOP27 

MFRC522 rfid(SS_PIN, RST_PIN);

const char* ssid = "alveo";
const char* password = "905612yy@@";

void setup() {
  Serial.begin(115200);
  delay(4000);
  WiFi.begin(ssid, password);
  
  // WiFi에 연결 시도
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  // WiFi 연결이 완료되면 "Connected to the WiFi network" 메시지를 출력, SPI 및 RFID 리더기 초기화
  Serial.println("Connected to the WiFi network");
  SPI.begin();
  rfid.PCD_Init();
}


void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("http://i9a104.p.ssafy.io:8080/sdata");
    http.addHeader("Content-Type", "application/json"); // HTTP POST 요청을 보낼 때, 요청 본문의 데이터가 JSON 형식임을 나타냄
  
    if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
      MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
      
      // RFID 태그 UID를 문자열로 변환
      String tagUID;
      for (int i = 0; i < rfid.uid.size; i++) {
        tagUID += String(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
        tagUID += String(rfid.uid.uidByte[i], HEX);
      }
  
      // JSON 문서 생성 및 태그 정보 추가
      // 보내고 싶은 데이터 여기서 수정해서 보낼 수 있음
      StaticJsonDocument<200> doc;
      doc["RFID_Tag_Type"] = rfid.PICC_GetTypeName(piccType);
      doc["RFID_Tag_UID"] = tagUID;
  
      // JSON 문서를 문자열로 직렬화하여 버퍼에 저장
      char jsonBuffer[512];
      serializeJson(doc, jsonBuffer);
  
      // 서버로 HTTP POST 요청
      int httpResponseCode = http.POST(jsonBuffer);
  
      // 응답 확인
      if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println("HTTP Response code: " + String(httpResponseCode));
        Serial.println("Response: " + response);
      } else {
        Serial.println("Error on sending POST request: " + String(httpResponseCode));
      }
    }
  
    http.end();
  } else {
    Serial.println("Error in WiFi connection");
  }
  
  delay(1000);
}
