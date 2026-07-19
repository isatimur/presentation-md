import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import brand_tokens as bt

FIX = os.path.join(os.path.dirname(__file__), "fixtures", "brand.tokens.json")
SCRIPT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "brand_tokens.py")

def sample():
    return bt.load(FIX)

def test_load_reads_json():
    assert sample()["primary"] == "#7c3aed"

def test_to_root_css_maps_primary_to_accent():
    css = bt.to_root_css(sample())
    assert css.strip().startswith(":root {")
    assert "--accent: #7c3aed;" in css
    assert "--accent-2: #22d3ee;" in css
    assert "--bg-2: #17171d;" in css

def test_to_root_css_quotes_fonts():
    css = bt.to_root_css(sample())
    assert "--font-heading: 'Inter', sans-serif;" in css
    assert "--font-body: 'Inter', sans-serif;" in css

def test_to_root_css_skips_missing_tokens():
    css = bt.to_root_css({"primary": "#fff"})
    assert "--accent: #fff;" in css
    assert "--bg:" not in css

def test_to_meta_brand_drops_meta_keeps_logo():
    meta = bt.to_meta_brand(sample())
    assert "name" not in meta and "$schema" not in meta
    assert meta["logo"] == "swiirl.svg"
    assert meta["primary"] == "#7c3aed"

def test_cli_css():
    out = subprocess.run([sys.executable, SCRIPT, FIX, "--css"],
                         capture_output=True, text=True, check=True).stdout
    assert "--accent: #7c3aed;" in out

def test_cli_meta_is_valid_json():
    out = subprocess.run([sys.executable, SCRIPT, FIX, "--meta"],
                         capture_output=True, text=True, check=True).stdout
    assert json.loads(out)["accent"] == "#22d3ee"
