import styles from './Loader.module.scss';

type LoaderProps = {
  size?: number;
}

export const Loader2 = (props: LoaderProps) => {
  const { size } = props;
  const arcs = Array(9).fill(1);

  return (
    <div className={styles.loader2} style={{width: size || 16, height: size || 16}}>
      {arcs.map((_, ind) => (<div key={ind}></div>))}
    </div>
  );
};
