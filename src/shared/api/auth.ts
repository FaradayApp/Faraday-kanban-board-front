type Auth = {
  login: string;
  password: string;
};

type Tokens = {
  access: string;
  refresh: string;
};

export const login = (data: Auth): Promise<Tokens> => {
  return Promise.resolve({
    access: '123',
    refresh: '123',
  });
};
