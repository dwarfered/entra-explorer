// components/ExportCSVButton.tsx
import React from 'react';
import { Button } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';
import { exportToCSV } from '@/lib/utils/csvExporter';

interface ExportCSVButtonProps<T extends object> {
  data: T[];
  fileName?: string;
  disabled?: boolean;
  buttonText?: string;
}

const useStyles = makeStyles({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '16px 0',
  },
});

const ExportCSVButton = <T extends object>({
  data,
  fileName = 'data.csv',
  disabled = false,
  buttonText = 'Export to CSV',
}: ExportCSVButtonProps<T>) => {
  const styles = useStyles();

  const handleExport = () => {
    exportToCSV<T>(data, fileName);
  };

  return (
    <div className={styles.buttonContainer}>
      <Button
        onClick={handleExport}
        disabled={disabled}
        appearance="primary"
        size="small"
        shape="square"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default ExportCSVButton;