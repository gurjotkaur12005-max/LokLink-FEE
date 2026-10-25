// Optional public API request. No API key is needed.
// JSONPlaceholder returns placeholder text, so we use it only to show how fetch works.
export async function fetchCommunityPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4");
  if (!response.ok) {
    throw new Error("The server answered with status " + response.status);
  }
  const data = await response.json();
  // Keep only the fields we need
  return data.map((post) => ({ id: "api-" + post.id, title: post.title, body: post.body }));
}
