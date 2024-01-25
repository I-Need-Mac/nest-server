import * as fs from 'fs';
import * as csv from 'csv-parser';

interface RewardBox {
  id: number;
  group: number;
  item: string;
  amount: number;
  weight: number;
}
interface RewardBoxProb {
  id: number;
  opening_time: number;
  box_type_1: number;
  box_type_1_prob: number;
  box_type_2: number;
  box_type_2_prob: number;
  box_type_3: number;
  box_type_3_prob: number;
  box_type_4: number;
  box_type_4_prob: number;
}

interface RewardBoxObject {
  [group: string]: Omit<RewardBox, 'group'>[];
}

interface RewardBoxProbObject {
  [group: string]: Omit<RewardBoxProb, 'id'>;
}

const isEmptyObject = (obj: any) => {
  return obj.constructor === Object && Object.keys(obj).length === 0;
};

const getRewardBoxesData = (): Promise<{
  RewardBoxesData: RewardBoxObject;
  RewardBoxesProbData: RewardBoxProbObject;
}> =>
  new Promise((resolve, reject) => {
    const RewardBoxesData = {};
    const RewardBoxesProbData = {};

    // fs.createReadStream('./src/common/static/dummy_reward_box.csv')
    //   .pipe(csv())
    //   .on('data', (row: RewardBox) => {
    //     if (RewardBoxesData[row.group] == null) {
    //       RewardBoxesData[row.group] = [];
    //     }
    //     RewardBoxesData[row.group].push({
    //       id: Number(row.id),
    //       item: row.item,
    //       amount: Number(row.amount),
    //       weight: Number(row.weight),
    //     });
    //   })
    //   .on('end', () => {
    //     console.log('[reward_box]: CSV file to data objects successfully processed');
    //   })
    //   .on('error', (err) => {
    //     console.log(err);
    //     reject({});
    //   });

    // fs.createReadStream('./src/common/static/reward_box.csv')
    //   .pipe(csv())
    //   .on('data', (row: RewardBoxProb) => {
    //     RewardBoxesProbData[row.id] = {
    //       opening_time: Number(row.opening_time),
    //       box_type_1: Number(row.box_type_1),
    //       box_type_1_prob: Number(row.box_type_1_prob),
    //       box_type_2: Number(row.box_type_2),
    //       box_type_2_prob: Number(row.box_type_2_prob),
    //       box_type_3: Number(row.box_type_3),
    //       box_type_3_prob: Number(row.box_type_3_prob),
    //       box_type_4: Number(row.box_type_4),
    //       box_type_4_prob: Number(row.box_type_4_prob),
    //     };
    //   })
    //   .on('end', () => {
    //     resolve({ RewardBoxesData, RewardBoxesProbData });
    //     console.log('[reward box time]: CSV file to data objects successfully processed');
    //   })
    //   .on('error', (err) => {
    //     console.log(err);
    //     reject({});
    //   });
  });

export const getRewardBoxObject = async () => {
  const { RewardBoxesData, RewardBoxesProbData } = await getRewardBoxesData();
  console.log('----------------');
  console.log(RewardBoxesProbData);

  return async () => {
    if (isEmptyObject(RewardBoxesData) || isEmptyObject(RewardBoxesProbData)) {
      return await getRewardBoxesData();
    }
    return { RewardBoxesData, RewardBoxesProbData };
  };
};
