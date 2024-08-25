#!/usr/bin/python3
# -*- coding: utf-8 -*-

# Get DS18B20 sensor values
# Dominic Buchheit, based on a script by Stefan Truppel
#
# Iterates over a set of sensors and reads there values.
# Summarizes the data into a single json file located in /var/www/html/sensors.json

import time, sys
import json
import psycopg2
from psycopg2 import sql
from datetime import datetime

# Database connection parameters
db_params = {
    'dbname': 'grafana',
    'user': 'grafana',
    'password': 'grafana',
    'host': 'localhost',  # use 'postgres' if connecting within the Docker network
    'port': 5432
}

# Set sensor base path, filename and sensorts themselves
# [sensor_basis]/sensors[x]/sensor_file
sensor_basis = '/sys/bus/w1/devices/'
sensor_file = '/w1_slave'

# DS18B20 sensor IDs, the keys can be freely chosen
sensors ={
  "p11": "28-011927810b61",
  "p12": "28-012032583bd8",
  "p13": "28-01192789e70f",
  "p14": "28-0120326dee7c",
  "p21": "28-01203267c10e",
  "p22": "28-012032fe77e4",
  "p23": "28-01203275215a",
  "p24": "28-0120325a4ed3",
   "hk": "28-01192783db7b",
   "hv": "28-011927638231",
   "hr": "28-0119276ccfa0",
   "hu": "28-011927832884",
   "ok": "28-0119278b4a64",
   "ov": "28-011927650fee",
   "or": "28-0119278b4a64",
   "kv": "28-0119276539ab",
   "kr": "28-011927644920"
}

# The output to print the results to
# result_output = "/home/pi/rpiheating/ui/src/sensors/sensors.json"
result_output = "/var/www/html/sensors.json"

def readTempSensor(sensorName) :
    f = open(sensorName, 'r')
    lines = f.readlines()
    f.close()
    return lines

def readTempLines(sensorName) :
    lines = readTempSensor(sensorName)
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = readTempSensor(sensorName)
    temperaturStr = lines[1].find('t=')
    if temperaturStr != -1 :
        tempData = lines[1][temperaturStr+2:]
        tempCelsius = int(round(float(tempData) / 1000.0))
        return tempCelsius

def write_to_database(temperatures):
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()

        # Create table if not exists
        create_table_query = '''
        CREATE TABLE IF NOT EXISTS heizung_data (
            id SERIAL PRIMARY KEY,
            timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            p11 FLOAT,
            p12 FLOAT,
            p13 FLOAT,
            p14 FLOAT,
            p21 FLOAT,
            p22 FLOAT,
            p23 FLOAT,
            p24 FLOAT,
            hk FLOAT,
            hv FLOAT,
            hr FLOAT,
            hu FLOAT,
            ok FLOAT,
            ov FLOAT,
            "or" FLOAT,
            kv FLOAT,
            kr FLOAT
        );
        '''
        cur.execute(create_table_query)
        conn.commit()

        temperatures["timestamp"] = datetime.now()

        # Insert data
        insert_query = '''
        INSERT INTO heizung_data (
            p11, p12, p13, p14, 
            p21, p22, p23, p24, 
            hk, hv, hr, hu, 
            ok, ov, "or", kv, kr,
            timestamp
        ) VALUES (
            %s, %s, %s, %s,
            %s, %s, %s, %s,
            %s, %s, %s, %s,
            %s, %s, %s, %s, %s,
            %s
        )
        '''

        cur.execute(insert_query, tuple(temperatures.values()))
        conn.commit()

        print("Data inserted successfully")
    except Exception as error:
        print(f"Error: {error}")

try:
    while True :
        try:
            temperatures = {}
            for key, value in sensors.items():
                sensor = sensor_basis + value + sensor_file
                temperatures[key] = str(readTempLines(sensor))
            with open(result_output, 'w') as fp:
                json.dump(temperatures, fp)
            print(temperatures)



        except Exception as e:
            print(str(e))
            sys.exit(1)
        finally:
            time.sleep(1)
except KeyboardInterrupt:
    print('Temperaturmessung wird beendet')
finally:
    print('Programm wird beendet.')
    sys.exit(0)