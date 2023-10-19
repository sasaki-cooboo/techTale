/**
 * クエリパラメータ作成関数
 * @param Record obj obj
 * string
 */
export function convertObjectToQueryString(
  obj: Record<string, number[]>
): string {
  const queryParams = [];
  for (const key in obj) {
    if (obj[key].length > 0) {
      queryParams.push(`${key}=${obj[key].join(",")}`);
    }
  }
  return `?${queryParams.join("&")}`;
}
