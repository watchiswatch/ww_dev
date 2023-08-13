#if ! (ESP8266 || ESP32 )
  #error This code is intended to run on the ESP8266/ESP32 platform! Please check your Tools->Board setting
#endif
#include <SPI.h>
#include <MFRC522.h>
#include <stdio.h>
#include <WiFi.h>
#include <MySQL_Generic.h>
#include <Wire.h>
#include <RTClib.h>

RTC_DS1302 rtc;


char ssid[] = "alveo";             // your network SSID (name)
char pass[] = "905612yy@@";         // your network password

char user[]         = "A104";          // MySQL user login username
char password[]     = "1234";          // MySQL user login password

// RFID 연결
#define SS_PIN  22  // ESP32 pin GIOP5 
#define RST_PIN 18 // ESP32 pin GIOP27 

MFRC522 rfid(SS_PIN, RST_PIN);

#define MYSQL_DEBUG_PORT      Serial

// Debug Level from 0 to 4
#define _MYSQL_LOGLEVEL_      1

#define USING_HOST_NAME     false

#if USING_HOST_NAME
  // Optional using hostname, and Ethernet built-in DNS lookup
  char SQL_server[] = ""; // change to your server's hostname/URL
#else
  IPAddress SQL_server(54, 180, 103, 16); //EC2 server
#endif

uint16_t server_port = 3306;


char default_database[] = "backend";           //"database";
char default_table[]    = "tag_info";          //"table name";

// MySQL_Generic 라이브러리
MySQL_Connection conn((Client *)&client); // 서버에 대한 연결 관리
MySQL_Query *query_mem;                   // SQL 쿼리를 수행
MySQL_Query sql_query = MySQL_Query(&conn);

void setup()
{
  Serial.begin(9600);

  SPI.begin(); // init SPI bus
  rfid.PCD_Init(); // init MFRC522

  
  if (!rtc.begin()){
    Serial.println("Couldn't find RTC");
    while (1);
  }
  

  MYSQL_DISPLAY1("\nStarting Basic_Insert_ESP on", ARDUINO_BOARD);
  MYSQL_DISPLAY(MYSQL_MARIADB_GENERIC_VERSION);

  // Begin WiFi section
  MYSQL_DISPLAY1("Connecting to", ssid);
  
  WiFi.begin(ssid, pass);
  
  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(500);
    MYSQL_DISPLAY0(".");
  }

  // print out info about the connection:
  MYSQL_DISPLAY1("Connected to network. My IP address is:", WiFi.localIP());

  MYSQL_DISPLAY3("Connecting to SQL Server @", SQL_server, ", Port =", server_port);
  MYSQL_DISPLAY5("User =", user, ", PW =", password, ", DB =", default_database);

  Serial.println();
  Serial.println("Tap an RFID/NFC tag on the RFID-RC522 reader");
}

String query = "";
String INSERT_SQL = "";



void loop() {
  if (rfid.PICC_IsNewCardPresent()) { // new tag is available
    if (rfid.PICC_ReadCardSerial()) { // NUID has been readed
      MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
      Serial.print("RFID/NFC Tag Type: ");
      Serial.println(rfid.PICC_GetTypeName(piccType));

      // 시리얼 모니터에 태그ID 출력 (HEX)
      Serial.print("UID:");
      for (int i = 0; i < rfid.uid.size; i++) {
        Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
        Serial.print(rfid.uid.uidByte[i], HEX);
      }
      Serial.println();
      
      String tm = "";
      DateTime now = rtc.now(); // Get the current time from RTC
      tm = String(now.year(), DEC) + '/' + String(now.month(), DEC) + '/' + String(now.day(), DEC) + ' ' + String(now.hour(), DEC) + ':' + String(now.minute(), DEC) + ':' + String(now.second(), DEC);

      Serial.print("Current Time: ");
      Serial.println(tm);
      
      // DB에 보내기 위해 새로운 변수 a에 문자열로 ID 저장
      String a = "";
      for (int i = 0; i < rfid.uid.size; i++) {
        if (rfid.uid.uidByte[i] < 0x10) {
          a += "0"; // Add leading zero for single-digit values
        }
        a += String(rfid.uid.uidByte[i], HEX); // Convert to hexadecimal and add to the string
      }

      rfid.PICC_HaltA(); // halt PICC
      rfid.PCD_StopCrypto1(); // stop encryption on PCD

      // Table에 데이터를 입력하는 쿼리문
      INSERT_SQL = "insert into backend.tag_info(user_id, device_code, tag_time, reader) values(1,";
      INSERT_SQL += "'" + a + "','" + tm + "','bench')";
      
      if (conn.connectNonBlocking(SQL_server, server_port, user, password) != RESULT_FAIL)
      {
        delay(500);
        runInsert();
        conn.close();                     // close the connection
      } 
      else 
      {
        MYSQL_DISPLAY("\nConnect failed. Trying again on next iteration.");
      }

      delay(5000);
    }
  }
}

void runInsert()
{
  // Initiate the query class instance
  MySQL_Query query_mem = MySQL_Query(&conn);

  if (conn.connected())
  {
    MYSQL_DISPLAY(INSERT_SQL);
    
    if ( !query_mem.execute(INSERT_SQL.c_str()) )
    {
      MYSQL_DISPLAY("Insert error");
    }
    else
    {
      MYSQL_DISPLAY("Data Inserted.");
    }
  }
  else
  {
    MYSQL_DISPLAY("Disconnected from Server. Can't insert.");
  }
}