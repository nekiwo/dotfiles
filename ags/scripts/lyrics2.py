#!/usr/bin/env python3
import json
import sys

def main():
    for line in sys.stdin:
        sys.stdout.write(line[:-1] + "\n")
        sys.stdout.flush()


if __name__ == "__main__":
    main()