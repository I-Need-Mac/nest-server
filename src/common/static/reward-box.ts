interface Reward {
  itemKey: string;
  amount: number;
  weight: number;
}

class LowestBox1 {
  rewardArray: Reward[];
  totalWeight: number;

  constructor(rewardArray: Reward[]) {
    this.rewardArray = rewardArray;
    this.totalWeight = rewardArray.reduce((prev, cur) => prev + cur.weight, 0);
  }

  getReward() {
    const randomTarget = Math.floor(Math.random() * this.totalWeight) + 1;

    let weight = 0;
    for (const reward of this.rewardArray) {
      weight += reward.weight;
      if (weight >= randomTarget) {
        console.log(weight, randomTarget);
        return reward;
      }
    }
  }
}

/*
  { itemKey: 'key', amount: 2, weight: 10 },
  { itemKey: 'box_[box_grade]', amount: 1, weight: 5 },
  { itemKey: 'soul_[saint_soul_name]_[soul_name]', amount: 2, weight: 1 },
*/

export const LowestBox1Instance = new LowestBox1([
  { itemKey: 'key', amount: 2, weight: 10 },
  { itemKey: 'box_low', amount: 1, weight: 5 },
  { itemKey: 'soul_001_001', amount: 2, weight: 1 },
]);
