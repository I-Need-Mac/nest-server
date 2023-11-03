import * as fs from 'fs';
import * as csv from 'csv-parser';

interface RewardBox {
  id: number;
  group: number;
  item: string;
  amount: number;
  weight: number;
}

interface RewardBoxTime {
  id: number;
  opening_time: number;
}

interface RewardBoxObject {
  [group: string]: Omit<RewardBox, 'group'>[];
}

interface RewardBoxTimeObject {
  [id: string]: number;
}

const isEmptyObject = (obj: any) => {
  return obj.constructor === Object && Object.keys(obj).length === 0;
};

const getRewardBoxesData = (): Promise<{
  RewardBoxesData: RewardBoxObject;
  RewardBoxesTimeData: RewardBoxTimeObject;
}> =>
  new Promise((resolve, reject) => {
    const RewardBoxesData = {};
    const RewardBoxesTimeData = {};

    fs.createReadStream('./src/common/static/dummy_reward_box.csv')
      .pipe(csv())
      .on('data', (row: RewardBox) => {
        if (RewardBoxesData[row.group] == null) {
          RewardBoxesData[row.group] = [];
        }
        RewardBoxesData[row.group].push({
          id: Number(row.id),
          item: row.item,
          amount: Number(row.amount),
          weight: Number(row.weight),
        });
      })
      .on('end', () => {
        console.log('[reward_box]: CSV file to data objects successfully processed');
      })
      .on('error', (err) => {
        console.log(err);
        reject({});
      });

    fs.createReadStream('./src/common/static/reward_box.csv')
      .pipe(csv())
      .on('data', (row: RewardBoxTime) => {
        console.log('test: ', row);
        RewardBoxesTimeData[101] = Number(10);
      })
      .on('end', () => {
        resolve({ RewardBoxesData, RewardBoxesTimeData });
        console.log('[reward box time]: CSV file to data objects successfully processed');
      })
      .on('error', (err) => {
        console.log(err);
        reject({});
      });
  });

export const getRewardBoxObject = async () => {
  const { RewardBoxesData, RewardBoxesTimeData } = await getRewardBoxesData();
  console.log('----------------');
  console.log(RewardBoxesTimeData);

  return async () => {
    if (isEmptyObject(RewardBoxesData) || isEmptyObject(RewardBoxesTimeData)) {
      return await getRewardBoxesData();
    }
    return { RewardBoxesData, RewardBoxesTimeData };
  };
};
