import pandas as pd
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

excel_file = ROOT / "data" / "M&A Deals.xlsx"
json_file = ROOT / "data" / "deals.json"

df = pd.read_excel(excel_file)

df = df.fillna("")

records = df.to_dict(orient="records")

with open(json_file, "w", encoding="utf-8") as f:
    json.dump(records, f, indent=2, ensure_ascii=False)

print("deals.json created successfully")
