import os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import deck_metrics as dm


def _gate_ids(result):
    return {f["id"] for f in result["flags"] if f["severity"] == "gate"}


class TestBareTextTokenGatesContrast:
    """Codex GitHub review, P1: a deck using --text (no primary/secondary
    qualifier) with unreadable contrast must still trip G3, not pass silently."""

    def _deck(self, text_hex):
        return f"""<html><head><style>
        :root {{ --bg: #ffffff; --text: {text_hex}; }}
        body {{ background: var(--bg); color: var(--text); }}
        </style></head><body>
        <section class="slide"><h1>Title</h1><p>Body copy here for the slide.</p></section>
        </body></html>"""

    def test_low_contrast_bare_text_token_gates(self):
        result = dm.analyze(self._deck("#eeeeee"))  # ~1.16:1 on white
        assert "G3" in _gate_ids(result)
        assert "--text" in result["metrics"]["contrast_ratios"]

    def test_high_contrast_bare_text_token_no_gate(self):
        result = dm.analyze(self._deck("#111111"))  # near-black on white, plenty of contrast
        assert "G3" not in _gate_ids(result)

    def test_muted_bare_text_variant_is_minor_not_body(self):
        html = """<html><head><style>
        :root { --bg: #ffffff; --text-muted: #eeeeee; }
        body { background: var(--bg); }
        </style></head><body>
        <section class="slide"><h1>Title</h1></section>
        </body></html>"""
        result = dm.analyze(html)
        # muted/subtle text is intentionally excluded from the body-text gate
        assert "G3" not in _gate_ids(result)


class TestSingleQuotedSlideClass:
    """Codex GitHub review, P2: third-party/self-authored decks using
    class='slide' (single quotes) must still be detected as slides."""

    def test_single_quoted_slides_detected(self):
        html = ("<html><body>"
                "<section class='slide'><h1>One</h1></section>"
                "<section class='slide'><h1>Two</h1></section>"
                "</body></html>")
        result = dm.analyze(html)
        assert result["metrics"]["slide_count"] == 2

    def test_double_quoted_slides_still_detected(self):
        html = ('<html><body>'
                '<section class="slide"><h1>One</h1></section>'
                '</body></html>')
        result = dm.analyze(html)
        assert result["metrics"]["slide_count"] == 1

    def test_mixed_quote_styles_both_detected(self):
        html = ("<html><body>"
                "<section class='slide'><h1>One</h1></section>"
                '<section class="slide"><h1>Two</h1></section>'
                "</body></html>")
        result = dm.analyze(html)
        assert result["metrics"]["slide_count"] == 2


class TestFrameworkGateIgnoresSlideCopy:
    """Codex GitHub review, P2: a slide that talks ABOUT React/Tailwind/etc.
    in its visible text must not trip G5 — only real script/link/style
    references to those frameworks should."""

    def test_framework_word_in_slide_copy_does_not_gate(self):
        html = ("<html><body>"
                "<section class='slide'><h1>Why We Chose React</h1>"
                "<p>We use Tailwind and Bootstrap conventions as inspiration.</p>"
                "</section></body></html>")
        result = dm.analyze(html)
        assert "G5" not in _gate_ids(result)
        assert result["metrics"]["frameworks"] == []

    def test_real_script_src_still_gates(self):
        html = ('<html><head>'
                '<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>'
                '</head><body><section class="slide"><h1>Hi</h1></section></body></html>')
        result = dm.analyze(html)
        assert "G5" in _gate_ids(result)
        assert "React" in result["metrics"]["frameworks"]

    def test_real_link_href_still_gates(self):
        html = ('<html><head>'
                '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3/dist/tailwind.min.css">'
                '</head><body><section class="slide"><h1>Hi</h1></section></body></html>')
        result = dm.analyze(html)
        assert "G5" in _gate_ids(result)
        assert "Tailwind" in result["metrics"]["frameworks"]


class TestHyphenatedClassNotSlide:
    """Codex GitHub review round 2, P2: \\bslide\\b treats '-' as a word
    boundary, so hyphenated classes like 'title-slide' or 'slide-inner'
    falsely count as a slide. Must match only an exact 'slide' class token."""

    def test_title_slide_class_not_counted(self):
        html = ('<html><body>'
                '<section class="title-slide"><h1>Not a slide</h1></section>'
                '<section class="slide"><h1>Real</h1></section>'
                '</body></html>')
        result = dm.analyze(html)
        assert result["metrics"]["slide_count"] == 1

    def test_slide_inner_class_not_counted(self):
        html = ('<html><body>'
                '<div class="slide-inner"><h1>Not a slide</h1></div>'
                "<section class='slide'><h1>Real</h1></section>"
                '</body></html>')
        result = dm.analyze(html)
        assert result["metrics"]["slide_count"] == 1

    def test_slide_with_other_classes_still_counted(self):
        html = ('<html><body>'
                '<section class="deck-slide slide active"><h1>Real</h1></section>'
                '</body></html>')
        result = dm.analyze(html)
        assert result["metrics"]["slide_count"] == 1


class TestNoSlideFallbackStillGatesWallOfText:
    """Codex GitHub review round 3, P2: when NO .slide container exists at all
    (a single-scroller deck, or a different structural convention), the
    word-density loop must not silently skip — it should fall back to
    measuring the whole document so a genuine wall of text still gates."""

    def test_no_slides_but_wall_of_text_still_gates_g1(self):
        big_block = "word " * 60  # > WORD_GATE (40) in one untagged block
        html = f"<html><body><p>{big_block}</p></body></html>"
        result = dm.analyze(html)
        assert result["metrics"]["slide_count"] == 0
        assert result["metrics"]["words_max"] > 0
        assert "G1" in _gate_ids(result)

    def test_no_slides_short_text_no_false_gate(self):
        html = "<html><body><p>Just a short paragraph.</p></body></html>"
        result = dm.analyze(html)
        assert result["metrics"]["slide_count"] == 0
        assert "G1" not in _gate_ids(result)


class TestModernRgbSyntax:
    """Codex GitHub review round 4, P2: CSS Color 4 space-separated rgb()
    (e.g. rgb(255 255 255) or rgb(255 255 255 / 0.5)) was silently unparsed,
    so contrast checks stopped working for decks using this syntax."""

    def _deck(self, bg, text):
        return f"""<html><head><style>
        :root {{ --bg: {bg}; --text: {text}; }}
        </style></head><body>
        <section class="slide"><h1>Title</h1><p>Body copy here for the slide.</p></section>
        </body></html>"""

    def test_space_separated_rgb_low_contrast_gates(self):
        result = dm.analyze(self._deck("rgb(255 255 255)", "rgb(238 238 238)"))
        assert "--text" in result["metrics"]["contrast_ratios"]
        assert "G3" in _gate_ids(result)

    def test_space_separated_rgb_with_alpha_parses(self):
        result = dm.analyze(self._deck("rgb(255 255 255)", "rgb(17 17 17 / 1.0)"))
        assert "--text" in result["metrics"]["contrast_ratios"]

    def test_legacy_comma_rgb_still_parses(self):
        result = dm.analyze(self._deck("rgb(255, 255, 255)", "rgb(238, 238, 238)"))
        assert "--text" in result["metrics"]["contrast_ratios"]
        assert "G3" in _gate_ids(result)


class TestWhitespaceAroundClassEquals:
    """Codex GitHub review round 5, P2: formatter-produced HTML can write
    class = "slide" with spaces around '=' — a literal class= misses it."""

    def test_spaced_equals_double_quoted(self):
        html = '<html><body><section class = "slide"><h1>Hi</h1></section></body></html>'
        result = dm.analyze(html)
        assert result["metrics"]["slide_count"] == 1

    def test_spaced_equals_single_quoted(self):
        html = "<html><body><section class = 'slide'><h1>Hi</h1></section></body></html>"
        result = dm.analyze(html)
        assert result["metrics"]["slide_count"] == 1

    def test_no_space_still_works(self):
        html = '<html><body><section class="slide"><h1>Hi</h1></section></body></html>'
        result = dm.analyze(html)
        assert result["metrics"]["slide_count"] == 1


class TestEmbeddedDeckJsonExcludedFromFrameworkGate:
    """Codex GitHub review round 6, P2: this pack's own renderer embeds the
    deck's full source as <script type="application/json" id="psp-deck">
    for round-tripping. That JSON duplicates every slide's visible text, so
    the code_surface framework scan must exclude it or the exact false-
    positive fixed in round 1 (a slide merely titled 'Why We Chose React')
    comes back through the embedded copy."""

    def test_framework_word_only_in_embedded_json_does_not_gate(self):
        html = ('<html><body>'
                '<section class="slide"><h1>Why We Chose React</h1></section>'
                '<script type="application/json" id="psp-deck">'
                '{"slides":[{"heading":"Why We Chose React"}]}</script>'
                '</body></html>')
        result = dm.analyze(html)
        assert "G5" not in _gate_ids(result)
        assert result["metrics"]["frameworks"] == []

    def test_real_script_src_still_gates_alongside_json_script(self):
        html = ('<html><head>'
                '<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>'
                '</head><body>'
                '<section class="slide"><h1>Hi</h1></section>'
                '<script type="application/json" id="psp-deck">{"slides":[]}</script>'
                '</body></html>')
        result = dm.analyze(html)
        assert "G5" in _gate_ids(result)
        assert "React" in result["metrics"]["frameworks"]
