import styles from './Loader.module.scss';

export const Loader = () => {
  const points = Array(9).fill(1);

  return (
    <div className={styles.loader}>
      {points.map((_, ind) => (<div key={ind}></div>))}
    </div>
  );
}
