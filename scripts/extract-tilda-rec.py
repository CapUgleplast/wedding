import re
from pathlib import Path


def extract_rec(html: str, rec_id: str) -> str:
    marker = f'id="{rec_id}"'
    start = html.find(marker)
    if start == -1:
        raise ValueError(f"rec not found: {rec_id}")

    # Find the next Tilda record boundary (next id="rec...") after this marker.
    m = re.search(r'id="rec\d+"', html[start + len(marker) :])
    end = start + len(marker) + (m.start() if m else 0)
    return html[start:end] if end > start else html[start:]


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    src = root / "click2invite-our_story1.html"
    dst = root / "rec1862692141.html"

    html = src.read_text(encoding="utf-8")
    block = extract_rec(html, "rec1862692141")
    pretty = block.replace("><", ">\n<")
    dst.write_text(pretty, encoding="utf-8")

    print(f"wrote {dst} ({len(block)} chars)")


if __name__ == "__main__":
    main()
