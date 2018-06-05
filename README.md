# homebridge-arduinobridge
This plugin (will) allow you to send serial data to an Arduino, ex. to control an led light strip.

`/home/pi/.homebridge/config.json`

```
"accessories": [
        {
            "accessory": "PWM-Devices",
            "name": "Desk Lights",
            "pwmRchannel": 0,
            "pwmGchannel": 1,
            "pwmBchannel": 2
        }
    ]
```

optionally you can always add more light strips with:

```
"accessories": [
        {
            "accessory": "PWM-Devices",
            "name": "Bar Lights",
            "pwmRchannel": 3,
            "pwmGchannel": 4,
            "pwmBchannel": 5
        }
    ]
```

`"accessory": "PWM-Devices"` is required
`"name": "<NAME>"` <NAME> can be what ever you would like, this will show up as your device name in the home app
`"pwmRchannel": <VALUE>` <VALUE> is the hat's channel you're using for the red leds
`"pwmGchannel": <VALUE>` <VALUE> is the hat's channel you're using for the green leds
`"pwmBchannel": <VALUE>` <VALUE> is the hat's channel you're using for the blue leds
