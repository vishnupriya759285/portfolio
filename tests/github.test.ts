import { describe, expect, it } from "vitest";
import { getReadmeSummary, toFeaturedProject } from "../lib/github";

const repository = {
  name: "career-compass",
  description: null,
  homepageUrl: "https://career-compass.example.com",
  isArchived: false,
  isFork: false,
  isPrivate: false,
  pushedAt: "2026-10-18T00:00:00Z",
  url: "https://github.com/vishnupriya759285/career-compass",
  primaryLanguage: { name: "TypeScript" },
  readme: {
    text: "# Career Compass\n\nA practical career-planning platform that helps students compare options, identify priorities, and create an achievable next-step plan.\n",
  },
};

describe("GitHub project selection", () => {
  it("uses an H1 and meaningful README paragraph for a public project", () => {
    expect(toFeaturedProject(repository)).toEqual({
      title: "Career Compass",
      description:
        "A practical career-planning platform that helps students compare options, identify priorities, and create an achievable next-step plan.",
      language: "TypeScript",
      sourceUrl: "https://github.com/vishnupriya759285/career-compass",
      liveUrl: "https://career-compass.example.com/",
    });
  });

  it("rejects forks and repositories without a clear README summary", () => {
    expect(toFeaturedProject({ ...repository, isFork: true })).toBeNull();
    expect(toFeaturedProject({ ...repository, readme: { text: "# Tiny\n\nShort note." } })).toBeNull();
  });

  it("strips Markdown and keeps summaries safe to render as plain text", () => {
    expect(
      getReadmeSummary(
        "# Test\n\n[Read the docs](https://example.com) for a detailed explanation of how this project supports reliable, collaborative planning."
      )
    ).toBe("Read the docs for a detailed explanation of how this project supports reliable, collaborative planning.");
  });
});
