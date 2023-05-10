import React from 'react';
import { withLocalization, withLocalizationProps } from '../../context/Config';
import Text from '../Text/Text';
import './TimeViewer.less';

export type TimeViewerProps = {
  start?: string;
  end?: string;
  fromNow?: boolean;
  locale?: string;
  rows?: 1 | 2 | 3;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TTimeViewer: React.FC<TimeViewerProps & withLocalizationProps> = ({
  start,
  end,
  rows,
  fromNow = false,
  moment,
}) => {
  if (fromNow) {
    const startDate = moment(start).fromNow();
    return (
      <div className="e-time-viewer-container">
        <Text
          textColor="dark-30"
          title={moment(start).format('YYYY-MM-DD hh:mm')}
          level={4}
        >
          {startDate}
        </Text>
      </div>
    );
  }
  const startDate = moment(start).format('LT');

  // const startDateDay = moment(start).format('MMMM D');
  const endDate = moment(end).format('LT');
  const timeShow = () => {
    if (!!start && !!end) {
      return `${startDate} - ${endDate}`;
    }
    return start || end;
  };

  return (
    <div>
      <Text textColor="dark-30" rows={rows} level={4}>
        {timeShow()}
      </Text>
    </div>
  );
};

export default withLocalization(TTimeViewer);
