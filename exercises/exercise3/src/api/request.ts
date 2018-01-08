export function request<T>({ url, ...requestInit }: RequestInit & { url: string }): Promise<T> {
  return fetch(url, requestInit)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)));
}
