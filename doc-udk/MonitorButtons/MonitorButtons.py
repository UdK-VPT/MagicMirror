#!/usr/bin/env python

import RPi.GPIO as GPIO
import time
import sys

# Buttons - pins in BOARD notation
defaultButtons = {
    'POWER': 11,
    'SELECT' : 13,
    'UP': 15,
    'DOWN': 16,
    'MENU': 18,
}

# Leds - pins in BOARD notation
defaultLeds = {
    'POWER': 36,
    'STANDBY': 37
}


class MonitorButtons(object):
    
    def __init__(self, buttons=defaultButtons, leds=defaultLeds):
        self.buttons = buttons
        self.leds = leds
        GPIO.setmode(GPIO.BOARD)
        for pin in self.buttons.values():
            GPIO.setup(pin, GPIO.OUT, initial=GPIO.LOW)
        for pin in self.leds.values():
            GPIO.setup(pin, GPIO.IN)

    def __del__(self):
        GPIO.cleanup()

    def pushButton(self, name):
        pin = self.buttons[name]
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.05)
        GPIO.output(pin, GPIO.LOW)

    def getLed(self, name):
        pin = self.leds[name]
        return GPIO.input(pin)

    def getPowerState(self):
        """0:Off 1:On 2:Standby"""
        return self.getLed('POWER') + 2*self.getLed('STANDBY')

    def powerOn(self):
        if not self.getPower():
            self.pushButton('POWER')
            while not self.getPower():
                time.sleep(0.1)

    def powerOff(self):
        if self.getPower():
            self.pushButton('POWER')
            while self.getPower():
                time.sleep(0.1)


def interactiveButtons():
    from getkey import getkey, keys
    mb = MonitorButtons()
    k = getkey(False)
    while k != 'x':
        p = mb.getLed('POWER')
        s = mb.getLed('STANDBY')
        sys.stdout.write('\rP:%1d S:%1d - UP, DOWN, SPACE=MENU, ENTER=SELECT, ESC=POWER' % (p, s))
        sys.stdout.flush()
        k = getkey()
        if k==keys.UP:
            mb.pushButton('UP')
        elif k==keys.DOWN:
            mb.pushButton('DOWN')
        elif k==keys.SPACE:
            mb.pushButton('MENU')
        elif k==keys.ENTER:
            mb.pushButton('SELECT')
        elif k==keys.ESC:
            mb.pushButton('POWER')
    del mb
    sys.stdout.write('\n')


if __name__ == '__main__':
    interactiveButtons()
