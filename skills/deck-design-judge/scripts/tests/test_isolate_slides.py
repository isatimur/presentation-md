"""Unit tests for _isolate_slides.py (render_slides.sh helper)."""
from __future__ import annotations

import importlib.util
import pathlib
import sys
import tempfile
import unittest

SCRIPTS = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SCRIPTS))

spec = importlib.util.spec_from_file_location(
    "_isolate_slides", SCRIPTS / "_isolate_slides.py"
)
assert spec and spec.loader
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


TWO_SLIDE = """<!doctype html><html><head><meta charset="utf-8"/><title>T</title></head>
<body><main class="deck">
<section class="slide"><h1>One</h1></section>
<section class="slide title-slide"><h1>Two</h1></section>
</main></body></html>"""


class IsolateSlidesTest(unittest.TestCase):
    def test_extract_two_slides(self) -> None:
        chunks = mod.extract_slide_chunks(TWO_SLIDE)
        self.assertEqual(len(chunks), 2)
        self.assertIn("One", chunks[0])
        self.assertIn("Two", chunks[1])
        # title-slide still has token "slide" — counted; class list must include slide
        self.assertIn('class="slide title-slide"', chunks[1])

    def test_isolate_forces_in_view(self) -> None:
        chunks = mod.extract_slide_chunks(TWO_SLIDE)
        isolated = mod.isolate_slide_html(TWO_SLIDE, chunks[1])
        self.assertIn("Two", isolated)
        self.assertNotIn("One", isolated)
        self.assertIn("in-view", isolated)
        self.assertIn("<head", isolated)

    def test_main_writes_iso_files(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            deck = pathlib.Path(tmp) / "deck.html"
            out = pathlib.Path(tmp) / "out"
            deck.write_text(TWO_SLIDE, encoding="utf-8")
            old = sys.argv
            try:
                sys.argv = ["_isolate_slides.py", str(deck), str(out)]
                self.assertEqual(mod.main(), 0)
            finally:
                sys.argv = old
            self.assertTrue((out / "_iso" / "slide-01.html").exists())
            self.assertTrue((out / "_iso" / "slide-02.html").exists())


if __name__ == "__main__":
    unittest.main()
