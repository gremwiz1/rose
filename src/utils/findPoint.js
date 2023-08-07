// Инициализируем случайную точку в трехмерном пространстве
const randomPoint = {
    x: Math.floor(Math.random() * 101),
    y: Math.floor(Math.random() * 101),
    z: Math.floor(Math.random() * 101)
  };
  
  // Функция, вычисляющая расстояние от заданной точки до случайно сгенерированной точки
  function f(s) {
    return Math.sqrt(
      Math.pow(s.x - randomPoint.x, 2) +
      Math.pow(s.y - randomPoint.y, 2) +
      Math.pow(s.z - randomPoint.z, 2)
    );
  }
  
  // Адаптированный бинарный поиск, осуществляющий поиск в трехмерном пространстве
  function binarySearch(dimension) {
    let low = 0;
    let high = 100;
    let calls = 0; // количество вызовов функции f
    let searchPoints = []; // массив для сохранения проверенных точек
  
    // Ищем пока не найдем точку или пока не переберем все возможные точки
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      let point = { ...randomPoint };
      point[dimension] = mid;
      let distance = f(point);
  
      // сохраняем проверенную точку
      searchPoints.push(point);
      // увеличиваем счетчик вызовов функции f
      calls++;
  
      // если расстояние равно 0, то мы нашли искомую точку
      if (distance === 0) {
        return { mid, calls, searchPoints };
      } else if (distance < mid) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
  
    return { mid: -1, calls, searchPoints };
  }
  
  // Функция, осуществляющая поиск искомой точки
  export function findPoint() {
    const dimensions = ['x', 'y', 'z'];
    let totalCalls = 0; // общее количество вызовов функции f
    let searchPoints = []; // общий массив для сохранения проверенных точек
  
    // Поиск выполняется по каждой координате отдельно
    let resultPoint = dimensions.reduce((result, dimension) => {
      let { mid, calls, points } = binarySearch(dimension);
      // обновляем счетчик вызовов функции f и массив проверенных точек
      totalCalls += calls;
      searchPoints = [...searchPoints, ...points];
      result[dimension] = mid;
      return result;
    }, {});
  
    // Возвращаем результат в требуемом формате
    return {
      result: {
        random_point: randomPoint,
        search_points: searchPoints,
        calls: totalCalls
      }
    };
  }
  
  // Вызываем функцию поиска и выводим результат в консоль
  console.log(findPoint());
  