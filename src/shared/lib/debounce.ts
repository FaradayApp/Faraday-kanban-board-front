export function debounce<T extends (...args: Parameters<T>) => void>(
  this: ThisParameterType<T>,
  fn: T,
  delay = 300
) {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}
