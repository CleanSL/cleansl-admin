# cleansl-driver-gps

Simple GPS tracking helper (demo).

Usage
-
- Log a location:

```powershell
python gps_tracking.py --log 37.7749 -122.4194 --speed 5.5
```

- Show latest location:

```powershell
python gps_tracking.py --show
```

- Export data to a file:

```powershell
python gps_tracking.py --export out.json
```

Files
- `gps_tracking.py`: main script with CLI (logging, show, export).
- `tracking_data.json`: default data file created/updated by the script.

Quick try
-
Run the demo behavior (script logs a sample point and writes `tracking_data.json`):

```powershell
python gps_tracking.py
```

Want an interactive demo or commit the changes? Pick one and I'll continue.
