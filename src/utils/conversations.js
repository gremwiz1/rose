let unitConversions = {
    m: 1,
    cm: 0.01,
    in: 0.0254,
    ft: 0.3048
  };
  
 export function loadConversionData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Неверные данные. Ожидался объект с коэффициентами конверсии.');
    }
  
    for (let unit in data) {
      if (typeof unit !== 'string' || typeof data[unit] !== 'number') {
        throw new Error('Неверные данные. Каждая единица измерения должна быть строкой, а каждое значение - числом.');
      }
    }
  
    unitConversions = { ...unitConversions, ...data };
  }
  
 export function convertDistance(distanceObj, convertTo) {
    if (!distanceObj || typeof distanceObj !== 'object') {
      throw new Error('Неверный ввод. Ожидался объект со свойствами единицы измерения и значения.');
    }
    const { unit: fromUnit, value: fromValue } = distanceObj;
    
    if (typeof fromUnit !== 'string' || typeof fromValue !== 'number') {
      throw new Error('Неверный ввод. Единица измерения должна быть строкой, а значение - числом.');
    }
  
    if (!unitConversions.hasOwnProperty(fromUnit)) {
      throw new Error(`Значение ${fromUnit} не поддерживается.`);
    }
    if (!unitConversions.hasOwnProperty(convertTo)) {
      throw new Error(`Значение ${convertTo} не поддерживается.`);
    }
  
    const meters = fromValue * unitConversions[fromUnit];
    const result = meters / unitConversions[convertTo];
    
    return { unit: convertTo, value: parseFloat(result.toFixed(2)) };
  }
  
  // Пример использования
  try {
    const input = { distance: { unit: 'm', value: 0.5 }, convert_to: 'ft' };
    const output = convertDistance(input.distance, input.convert_to);
    console.log(output);
  } catch (error) {
    console.error(error.message);
  }
  
  // Расширение значение с помощью JSON
  const additionalUnits = {
    mm: 0.001,
    yd: 0.9144,
    km: 1000
  };
  
  try {
    loadConversionData(additionalUnits);
  } catch (error) {
    console.error(error.message);
  }
  