import * as fs from 'fs';
import * as csv from 'csv-parser';

interface RewardBox {
  id: number;
  group: number;
  item: string;
  amount: number;
  weight: number;
}

const isEmptyObject = (obj: any) => {
  return obj.constructor === Object && Object.keys(obj).length === 0;
};

const getRewardBoxesData = () =>
  new Promise((resolve, reject) => {
    const RewardBoxesData = {};

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
        console.log('CSV file to data objects successfully processed');
        resolve(RewardBoxesData);
      })
      .on('error', (err) => {
        console.log(err);
        reject({});
      });
  });

export const getRewardBoxObject = async () => {
  const rewardBoxes = await getRewardBoxesData();

  return async () => {
    if (isEmptyObject(rewardBoxes)) {
      return await getRewardBoxesData();
    }
    return rewardBoxes;
  };
};
