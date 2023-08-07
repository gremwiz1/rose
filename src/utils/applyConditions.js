// Объект с правилами обработки. Каждое правило - это функция,
// которая принимает массив объектов и правило и возвращает
// новый массив объектов после применения правила.
const rules = {
    include: (data, rule) => {
      // Фильтруем объекты, которые соответствуют всем условиям.
      return data.filter(item => 
        rule.every(condition => 
          Object.keys(condition).every(key =>
            item.hasOwnProperty(key) && item[key] === condition[key]
          )
        )
      );
    },
    exclude: (data, rule) => {
      // Фильтруем объекты, которые не соответствуют ни одному из условий.
      return data.filter(item => 
        rule.every(condition => 
          Object.keys(condition).every(key =>
            !item.hasOwnProperty(key) || item[key] !== condition[key]
          )
        )
      );
    },
    sort_by: (data, rule) => {
      // Сортируем объекты по заданным полям в естественном порядке.
      return data.sort((a, b) => 
        rule.map(field => a[field] > b[field] ? 1 : (a[field] < b[field] ? -1 : 0))
          .find(result => result !== 0) || 0
      );
    }
  };
  
  // Функция для проверки условий. Выводит ошибку, если условия
  // не являются объектом, если условие не поддерживается или если
  // значения условия не являются массивом.
  function validateConditions(conditions) {
    if (typeof conditions !== 'object' || conditions === null) {
      throw new Error('Условия должны быть объектом.');
    }
  
    Object.keys(conditions).forEach(condition => {
      if (!rules.hasOwnProperty(condition)) {
        throw new Error(`Неподдерживаемое условие: ${condition}.`);
      }
  
      if (!Array.isArray(conditions[condition])) {
        throw new Error(`Значения условия для ${condition} должны быть массивом.`);
      }
    });
  }
  
  // Функция для применения условий к данным. Применяет каждое условие
  // по очереди и возвращает результат.
  export function applyConditions(data, conditions) {
    validateConditions(conditions);
    
    let result = data;
    Object.keys(conditions).forEach(condition => {
      result = rules[condition](result, conditions[condition]);
    });
    return result;
  }
  
  // Применение функции applyConditions к входным данным. В случае
  // ошибки выводим сообщение об ошибке в консоль.
  try {
    const inputData = {
      data: [
        { user: 'mike@mail.com', rating: 20, disabled: false },
        { user: 'greg@mail.com', rating: 14, disabled: false },
        { user: 'john@mail.com', rating: 25, disabled: true }
      ],
      condition: {
        exclude: [{ disabled: true }],
        sort_by: ['rating']
      }
    };
  
    const outputData = applyConditions(inputData.data, inputData.condition);
    console.log({ result: outputData });
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
  }
  