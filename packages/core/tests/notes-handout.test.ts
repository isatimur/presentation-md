import { describe, expect, it } from "vitest";
import { formatVttTime, notesHandoutTxt, notesHandoutVtt } from "../src/notes-handout.js";

const DECK = {
  meta: { title: "Handout Deck" },
  slides: [
    { layout: "title", heading: "Hello", notes: "Open with the claim." },
    { layout: "closing", heading: "Thanks", notes: "" },
  ],
};

describe("notesHandout", () => {
  it("builds TXT blocks per slide", () => {
    const txt = notesHandoutTxt(DECK);
    expect(txt).toContain("Handout Deck — speaker notes");
    expect(txt).toContain("Slide 1: Hello");
    expect(txt).toContain("Open with the claim.");
    expect(txt).toContain("(no speaker notes)");
  });

  it("builds WebVTT cues with timestamps", () => {
    expect(formatVttTime(0)).toBe("00:00:00.000");
    expect(formatVttTime(30)).toBe("00:00:30.000");
    expect(formatVttTime(90)).toBe("00:01:30.000");
    const vtt = notesHandoutVtt({
      meta: { title: "V" },
      slides: [{ heading: "One", notes: "Cue one" }],
    });
    expect(vtt.startsWith("WEBVTT")).toBe(true);
    expect(vtt).toContain("00:00:00.000 --> 00:00:30.000");
    expect(vtt).toContain("Cue one");
  });
});
