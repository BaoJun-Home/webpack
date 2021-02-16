export async function getProvinces() {
  return await fetch("/api/local").then((resp) => resp.json());
}
