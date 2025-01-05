import * as React from "react";
import {
  Skeleton,
  SkeletonItem,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import type { SkeletonProps } from "@fluentui/react-components";

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  secondThirdRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: ("10px"),
  },
});

interface SkeletonGridProps extends Partial<SkeletonProps> {
  columns: number;
}

export const SkeletonGrid = ({ columns, ...props }: SkeletonGridProps) => {
  const styles = useStyles();

  // Create an array of SkeletonItem based on columns
  const skeletonItems = Array.from({ length: columns }, (_, index) => (
    <SkeletonItem key={index} size={16} />
  ));

  return (
    <div className={styles.invertedWrapper}>
      <Skeleton {...props}>
        <div className={styles.secondThirdRow}>
          {skeletonItems}
        </div>
      </Skeleton>
    </div>
  );
};