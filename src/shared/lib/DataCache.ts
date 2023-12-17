import { makeAutoObservable, runInAction } from 'mobx';

type State = 'EMPTY' | 'PENDING' | 'FULLFILLED' | 'REJECTED';
type Options<T> = {
  defaultValue: T;
};

export class DataCache<T> {
  private state: State = 'EMPTY';
  private defaultValue: T;
  public data: T;

  constructor({ defaultValue }: Options<T>) {
    makeAutoObservable(this);
    this.data = defaultValue;
    this.defaultValue = defaultValue;
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
    return this.state === 'REJECTED';
  }

  set = async (fetcher: () => Promise<T>) => {
    try {
      this.state = 'PENDING';
      const response = await fetcher();
      runInAction(() => {
        this.data = response;
        this.state = 'FULLFILLED';
      });
    } catch {
      runInAction(() => {
        this.state = 'REJECTED';
      });
    }
  };

  update = (newData: T) => {
    this.data = newData;
  };

  clear = () => {
    this.state = 'EMPTY';
    this.data = this.defaultValue;
  };
}
