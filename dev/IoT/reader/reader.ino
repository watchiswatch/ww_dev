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

const int buzzerPin = 25;  // 부저를 연결한 GPIO 핀
// 소리 크기 조절을 하기 위한 변수 세팅
const int freq = 2000;
const int channel = 0;
const int resolution = 8;

// wifi 연결
void initializeWiFi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
  Serial.println("Please tag your band");
}

// RFID 초기화
void initializeRFID() {
  SPI.begin();
  rfid.PCD_Init();
}

// 부저 울림 함수
void beep(int duration = 250) {
  int dutyCycle = 1;
  ledcWrite(channel, dutyCycle);
  delay(duration);
  ledcWrite(channel, 0);
  delay(duration);
}

// RFID 태그 UID 읽기
String getRFIDTagUID() {
  //if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    // RFID 태그 UID를 문자열로 변환
    String tagUID;
    for (int i = 0; i < rfid.uid.size; i++) {
      tagUID += String(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
      tagUID += String(rfid.uid.uidByte[i], HEX);
    }
    Serial.println(tagUID);
    return tagUID;
  //}
}

// HTTP POST 요청 보내기
void sendPostRequest(const String& tagUID) {
  HTTPClient http;
  http.begin("http://i9a104.p.ssafy.io:8080/tags");
  http.addHeader("Content-Type", "application/json");
  
  StaticJsonDocument<200> doc;
  doc["device_code"] = tagUID;
  doc["reader"] = 1111;
  
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);
  
  int httpResponseCode = http.POST(jsonBuffer);
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("HTTP Response code: " + String(httpResponseCode));
    Serial.println("Response: " + response);
  } 
  else {
    Serial.println("Error on sending POST request: " + String(httpResponseCode));
  }
  
  http.end();
}

void setup() {
  Serial.begin(115200);
  delay(4000);
  ledcSetup(channel, freq, resolution);
  ledcAttachPin(buzzerPin, channel);
  
  initializeWiFi();
  initializeRFID();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    
    if(rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()){
      beep();
      String tagUID = getRFIDTagUID();
      sendPostRequest(tagUID);
    }
  } 
  else {
    Serial.println("Error in WiFi connection or RFID reading.");
  }
  delay(1000);
}
