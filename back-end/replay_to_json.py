#!/usr/bin/env python
# This file is a work in progress...
# Copyright (c) 2017 Jeff Patterson, Amanda Murphy, Paolo Villanueva,
# Patrick Overton, Connor Picken, Yun Cong Chen, Seth Amundsen, Michael
# Ohl, Matthew Tighe
# ALL RIGHTS RESERVED
# [This program is licensed under the "GNU General Public License"]
# Please see the file COPYING in the source distribution of this
# software for license terms.
import json
from psas_packet import io
import socket

def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(("127.0.0.1", 35001))
    network = io.Network(sock)
    packets = []
    while True:
        try:
            for timestamp, data in network.listen():
                fourcc, data = data
                data["recv"] = timestamp
                packets.append({fourcc: data})
        except KeyboardInterrupt:
            sock.close()
            file = open("sent.txt", 'w')
            for packet in packets:
                if "ADIS" in packet:
                    for key in ["Magn_X", "Magn_Y", "Magn_Z"]:
                        if key in packet["ADIS"]:
                            value = packet["ADIS"][key]
                            if value != 0:
                                if int(repr(value)[-1]) < 7:
                                    if '.' in repr(value):
                                        if value < 0:
                                            dps = (len(repr(value)) - 7) + int(repr(value)[-1])
                                        else:
                                            dps = (len(repr(value)) - 6) + int(repr(value)[-1])
                                    else:
                                        dps = int(repr(value)[-1])
                                    packet["ADIS"][key] = format(value, ('.' + str(dps) + 'f'))
                output = json.dumps(packet)
                output = output.replace(' ', '')
                output = output.replace(".0,", ',')
                output = output.replace(".0}", '}')
                output = output.replace(":\"", ':')
                output = output.replace("\",", ',')
                output = output.replace("e-0", "e-")
                file.write(output + '\n')
            file.close()
            return

if __name__ == "__main__":
    main()
