import argparse
import time
import json
from datetime import datetime
from typing import Dict, List, Optional
from dataclasses import dataclass, asdict
import os


@dataclass
class Location:
    latitude: float
    longitude: float
    timestamp: str
    speed: float = 0.0


class LiveTracking:
    def __init__(self, datafile: str = "tracking_data.json"):
        self.datafile = datafile
        self.locations: List[Location] = []
        self._load()

    def _load(self):
        if os.path.exists(self.datafile):
            try:
                with open(self.datafile, "r") as f:
                    data = json.load(f)
                for d in data:
                    self.locations.append(Location(**d))
            except Exception:
                self.locations = []

    def _save(self):
        data = [asdict(loc) for loc in self.locations]
        with open(self.datafile, "w") as f:
            json.dump(data, f, indent=2)

    def start_tracking(self):
        print("Tracking started...")

    def stop_tracking(self):
        print("Tracking stopped...")

    def log_location(self, latitude: float, longitude: float, speed: float = 0.0):
        location = Location(latitude=latitude, longitude=longitude, timestamp=datetime.now().isoformat(), speed=speed)
        self.locations.append(location)
        self._save()
        print(f"Location logged: {latitude}, {longitude} (speed={speed})")
        
        # Broadcast to Admin Dashboard!
        import urllib.request
        try:
            req = urllib.request.Request("http://127.0.0.1:8000/trucks/T-01/location",
                data=json.dumps({"latitude": latitude, "longitude": longitude, "speed": speed}).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST")
            urllib.request.urlopen(req, timeout=2)
            print("Successfully beamed to Admin Dashboard Server!")
        except Exception as e:
            print("Failed to sync with Dashboard Server:", e)

    def get_current_location(self) -> Optional[Dict]:
        if self.locations:
            return asdict(self.locations[-1])
        return None

    def export_tracking_data(self, filename: str):
        data = [asdict(loc) for loc in self.locations]
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Data exported to {filename}")


def build_parser():
    p = argparse.ArgumentParser(description="Simple GPS tracking helper")
    p.add_argument("--datafile", "-d", default="tracking_data.json", help="path to JSON data file")
    sub = p.add_mutually_exclusive_group()
    sub.add_argument("--log", nargs=2, metavar=("LAT", "LON"), help="log a location")
    p.add_argument("--speed", type=float, default=0.0, help="speed for the logged location")
    p.add_argument("--show", action="store_true", help="show latest location")
    p.add_argument("--export", metavar="FILE", help="export data to FILE")
    return p


def main():
    parser = build_parser()
    args = parser.parse_args()

    tracker = LiveTracking(datafile=args.datafile)

    if args.log:
        lat = float(args.log[0])
        lon = float(args.log[1])
        tracker.log_location(lat, lon, speed=args.speed)
        return

    if args.show:
        loc = tracker.get_current_location()
        if loc:
            print(json.dumps(loc, indent=2))
        else:
            print("No locations logged yet.")
        return

    if args.export:
        tracker.export_tracking_data(args.export)
        return

    # default behavior: run a small demo and export
    tracker.start_tracking()
    tracker.log_location(40.7128, -74.0060)
    tracker.export_tracking_data(args.datafile)


if __name__ == "__main__":
    main()
