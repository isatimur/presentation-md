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
