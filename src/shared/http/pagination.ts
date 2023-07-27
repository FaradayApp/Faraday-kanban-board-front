import { request } from '@/shared/http';

export type PaginationResponse<T> = {
  total: number;
  pages: number;
  is_last: boolean;
  results: T[];
};

export type PaginationOptions = {
  page?: number;
  page_size?: number;
};

type Options = {
  endpoint: string;
};

export async function getAllPages<T>(options: PaginationOptions & Options) {
  const { page, page_size, endpoint } = options;
  const paginationOptions = {
    page: page || 1,
    page_size: page_size || 100,
  };
  const params = { searchParams: paginationOptions };

  const results: T[] = [];

  const getData = async (): Promise<T[]> => {
    const response = await request.get(endpoint, params);
    const data = await response.json<PaginationResponse<T>>();

    results.push(...data.results);

    if (!data.is_last) {
      paginationOptions.page++;
      return getData();
    }

    return results;
  };

  return getData();
}
