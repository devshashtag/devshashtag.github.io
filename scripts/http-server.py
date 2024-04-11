#!/usr/bin/env python3

import sys
import random
import http.server
import socketserver

HOST = "localhost"

default_port= 8000

try:
    if sys.argv[1].isdigit():
        user_port = int(sys.argv[1])

    elif sys.argv[1] == 'random':
        user_port = random.randint(8000, 65535)

    else:
        user_port = default_port

    PORT = user_port
except:
    PORT = default_port

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_headers()
        http.server.SimpleHTTPRequestHandler.end_headers(self)

    def send_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")

if __name__ == '__main__':
    with socketserver.TCPServer((HOST, PORT), Handler) as httpd:

        print(f"serving at http://{HOST}:{PORT}")
        try:
            httpd.serve_forever()
        except:
            httpd.shutdown()
            httpd.server_close()

