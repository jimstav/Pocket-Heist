import styles from "./Skeleton.module.css"

export default function Skeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={`${styles.shape} ${styles.avatar}`} />
        <div className={styles.headerLines}>
          <div className={`${styles.shape} ${styles.lineLong}`} />
          <div className={`${styles.shape} ${styles.lineMedium}`} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={`${styles.shape} ${styles.lineFullWidth}`} />
        <div className={`${styles.shape} ${styles.lineFullWidth}`} />
        <div className={`${styles.shape} ${styles.lineShort}`} />
      </div>
    </div>
  )
}
