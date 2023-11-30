export default function weatherCounter(data) {
  const countMap = {};

  data.list.forEach((element) => {
    if (countMap[element.weather[0].main]) {
      countMap[element.weather[0].main]++;
    } else {
      countMap[element.weather[0].main] = 1;
    }
  });

  const resultArray = Object.keys(countMap).map((key) => ({
    weather: key,
    count: countMap[key],
  }));

  return resultArray;
  // return data.list.map(item => item.weather[0].main);
}