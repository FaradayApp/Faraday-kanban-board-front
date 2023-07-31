import { makeAutoObservable } from 'mobx';

type State = 'EMPTY' | 'PENDING' | 'FULLFILLED' | 'REJECTED';
type Options<T> = {
  defaultValue: T;
};

export class DataCache<T> {
  private state: State = 'EMPTY';
  public data: T;

  constructor({ defaultValue }: Options<T>) {
    this.data = defaultValue;
    makeAutoObservable(this);
  }

  get isEmpty() {
    return this.state === 'EMPTY';
  }

  get isPending() {
    return this.state === 'PENDING';
  }

  get isFullfilled() {
    return this.state === 'FULLFILLED';
  }

  get isRejected() {
    return this.state === 'FULLFILLED';
  }

  set = async (fetcher: () => Promise<T>) => {
    try {
      this.state = 'PENDING';
      this.data = await fetcher();
      this.state = 'FULLFILLED';
    } catch {
      this.state = 'REJECTED';
    }
  };
}
