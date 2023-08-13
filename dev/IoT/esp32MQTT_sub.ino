#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "alveo";
const char* password = "905612yy@@";
const char* mqttServer = "13.124.11.62"; // MQTT 브로커의 IP 주소
const int mqttPort = 1883; // MQTT 브로커의 포트 번호
const char* clientId = "esp32";
const int ledPin = 18; // LED가 연결된 핀 번호
const int ledPinMax = 22; // LED가 연결된 핀 번호
const int movePin = 17; // 진동센서가 연결된 핀 번호
const char* deviceNum = "23145C09"; // 53E26709
const char* readerNum = "1111";     // 2222


WiFiClient espClient;
PubSubClient client(espClient);

bool ledOn = false;
unsigned long ledOnTime = 0;
//const unsigned long duration = 2 * 60 * 1000; // 2 minutes in milliseconds
const unsigned long duration = 5 * 1000; // 5초

bool ledOff = false;
unsigned long offTimestamp = 0;
//const unsigned long offDuration = 20 * 60 * 1000; // 20 minutes in milliseconds
const unsigned long offDuration = 10 * 1000;

TaskHandle_t countdownTask; // Task handle for the countdown task

void setup() {
  pinMode(ledPin, OUTPUT); // LED 핀을 출력으로 설정
  pinMode(ledPinMax, OUTPUT); // LED 핀을 출력으로 설정
  pinMode(movePin, OUTPUT); // 진동센서 핀을 출력으로 설정
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

  // Create the countdown task
  xTaskCreatePinnedToCore(
    countdownTaskFunction, // Task function
    "countdownTask",       // Task name
    2048,                  // Stack size
    NULL,                  // Task parameters (none in this case)
    1,                     // Priority of the task (1 is higher)
    &countdownTask,        // Task handle
    0                      // Core to run the task (0 or 1, choose one)
  );
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  Serial.print("Message received in topic: ");
  Serial.println(topic);
  Serial.print("Message: ");
  Serial.println(message);

  // LED 제어
  if (message == "on") {
    digitalWrite(ledPin, HIGH); // LED 켜기
    digitalWrite(movePin, HIGH); // 진동 켜기

    //////////led가 켜지면 2분 카운트 시작/////////////////////
    ledOn = true; //"on"
    ledOnTime = millis();
    //////////////////////////////////////////////////////////
  } 
  else if (message == "off") {
    digitalWrite(ledPin, LOW); // LED 끄기
    digitalWrite(movePin, LOW); // 진동 끄기
    
    ledOn = false;  //off 메시지를 받으면 2분 카운트 할 필요 없다
    

    /////////off 메시지를 받으면 20분 카운트 시작////////////////////
    ledOff = true;   // "off" 카운트를 활성화합니다.
    offTimestamp = millis();    // 현재 시간을 저장합니다.
    ///////////////////////////////////////////////////////////////////
  }
  else if (message == "end"){
    ledOff = false;
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect(clientId)) {
      Serial.println("connected");
      client.subscribe("esp32/led");  // Topic
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void countdownTaskFunction(void* parameter) {
  while (1) {
    if (ledOn && (millis() - ledOnTime >= duration)) {
      digitalWrite(ledPin, LOW); 
      digitalWrite(movePin, LOW); 
      ledOn = false;  // 카운트 비활성화
      char message[50];

      // deviceNum&readerNum&noshow 형식으로 메시지 저장
      snprintf(message, sizeof(message), "%s&%s&noshow", deviceNum, readerNum);

      // topic "esp32/status"으로 메시지 송신
      client.publish("esp32/status", message);
    }

    if (ledOff && (millis() - offTimestamp >= offDuration)) {
            ledOff = false; // 카운트를 비활성화

            char message[50];

            // deviceNum&readerNum&notag 형식으로 메시지 저장
            snprintf(message, sizeof(message), "%s&%s&notag", deviceNum, readerNum);

            // topic "esp32/status"으로 메시지 송신
            client.publish("esp32/status", message);
            // 20분이 지나도록 운동 끝 태그를 찍지 않는다면 LED 깜빡여주기
            int t = 0;
            while(t<5){
              digitalWrite(ledPinMax, HIGH);  
              delay(1000);                      
              digitalWrite(ledPinMax, LOW);   
              delay(1000);
              t++;
            }
    }

    vTaskDelay(100 / portTICK_PERIOD_MS); // delay를 줄이기 위해
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
