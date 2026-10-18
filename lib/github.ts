export type FeaturedProject = {
  title: string;
  description: string;
  language: string | null;
  sourceUrl: string;
  liveUrl: string | null;
};

type GitHubRepository = {
  name: string;
  description: string | null;
  homepageUrl: string | null;
  isArchived: boolean;
  isFork: boolean;
  isPrivate: boolean;
  pushedAt: string;
  url: string;
  primaryLanguage: { name: string } | null;
  readme: { text: string } | null;
};

type GitHubResponse = {
  data?: {
    user: {
      repositories: {
        nodes: GitHubRepository[];
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const GITHUB_USERNAME = "vishnupriya759285";
const PORTFOLIO_REPOSITORY = "portfolio";
const PROJECT_LIMIT = 6;
const SUMMARY_MINIMUM_LENGTH = 60;

const projectsQuery = `
  query PortfolioProjects($login: String!) {
    user(login: $login) {
      repositories(
        first: 100
        affiliations: OWNER
        privacy: PUBLIC
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          homepageUrl
          isArchived
          isFork
          isPrivate
          pushedAt
          url
          primaryLanguage { name }
          readme: object(expression: "HEAD:README.md") {
            ... on Blob { text }
          }
        }
      }
    }
  }
`;

function cleanMarkdown(value: string) {
  return value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getReadmeTitle(readme: string) {
  const match = readme.match(/^#\s+(.+?)\s*#*\s*$/m);
  return match ? cleanMarkdown(match[1]) : null;
}

export function getReadmeSummary(readme: string) {
  const withoutFrontmatter = readme.replace(/^---\s*[\s\S]*?---\s*/u, "");
  const blocks = withoutFrontmatter.split(/\r?\n\s*\r?\n/u);

  for (const block of blocks) {
    const trimmed = block.trim();
    if (
      !trimmed ||
      trimmed.startsWith("#") ||
      trimmed.startsWith(">") ||
      trimmed.startsWith("[![") ||
      trimmed.startsWith("!") ||
      trimmed.startsWith("|") ||
      trimmed.startsWith("```") ||
      trimmed.startsWith("-") ||
      trimmed.startsWith("*") ||
      /^\d+\.\s/u.test(trimmed)
    ) {
      continue;
    }

    const summary = cleanMarkdown(trimmed);
    if (summary.length >= SUMMARY_MINIMUM_LENGTH) {
      return summary.length > 240 ? `${summary.slice(0, 237).trimEnd()}…` : summary;
    }
  }

  return null;
}

function getSecureLiveUrl(homepageUrl: string | null) {
  if (!homepageUrl) return null;

  try {
    const url = new URL(homepageUrl);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function toFeaturedProject(repository: GitHubRepository): FeaturedProject | null {
  if (
    repository.isArchived ||
    repository.isFork ||
    repository.isPrivate ||
    repository.name.toLowerCase() === PORTFOLIO_REPOSITORY ||
    repository.name.toLowerCase() === GITHUB_USERNAME
  ) {
    return null;
  }

  const readme = repository.readme?.text;
  if (!readme) return null;

  const title = getReadmeTitle(readme);
  const readmeSummary = getReadmeSummary(readme);
  if (!title || !readmeSummary) return null;

  return {
    title,
    description: readmeSummary,
    language: repository.primaryLanguage?.name ?? null,
    sourceUrl: repository.url,
    liveUrl: getSecureLiveUrl(repository.homepageUrl),
  };
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("GITHUB_TOKEN is not configured; live GitHub projects are unavailable.");
    return [];
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ query: projectsQuery, variables: { login: GITHUB_USERNAME } }),
      cache: "force-cache",
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error(`GitHub project request failed with ${response.status}.`);
      return [];
    }

    const payload = (await response.json()) as GitHubResponse;
    if (payload.errors?.length || !payload.data?.user) {
      console.error("GitHub project response did not contain repository data.");
      return [];
    }

    return payload.data.user.repositories.nodes
      .map(toFeaturedProject)
      .filter((project): project is FeaturedProject => project !== null)
      .slice(0, PROJECT_LIMIT);
  } catch (error) {
    console.error("Unable to load live GitHub projects.", error);
    return [];
  }
}
