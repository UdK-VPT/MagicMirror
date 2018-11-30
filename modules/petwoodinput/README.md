# PetWood Input
This is an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It uses an external device (PetWood) as input for the mirror.

## Installation
1. Copy this folder `petwoodinput` into your MagicMirror's `modules` folder.

## Using the module
First of all connect the PetWood device to your computer running the MM-server part. Use the Python or Node.js driver software to test the device and the connection.

To use this module, add it to the modules array in the `config/config.js` file and adjust the serial port name:
````javascript
modules: [
	{
		module: 'petwoodinput',
		config: {
			serPort: "/dev/ttyACM0",
		}
	}
]
````

## Configuration options

The following properties can be configured:

`serPort` : the serial port name (like `/dev/ttyUSB0` on Linux or `COM5` on Windows)

## Developer Notes

...

The MIT License (MIT)
=====================

Copyright © 2018 Joerg Raedler

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
