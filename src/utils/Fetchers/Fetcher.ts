export class Fetcher<T> {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  get = async (path: string): Promise<T> => {
    try {
      const response = await fetch(this.baseUrl + path);
      return response.json();
    } catch (err) {
      throw new Error(err as string);
    }
  };
}
