let cats = [
  { id: 1, parent: 0 },
  { id: 2, parent: 1 },
  { id: 3, parent: 2 },
  { id: 4, parent: 3 },
  { id: 5, parent: 3 },
  { id: 6, parent: 2 },
  { id: 7, parent: 1 },
  { id: 8, parent: 0 },
  { id: 9, parent: 0 },
  { id: 10, parent: 4 },
  { id: 11, parent: 10 },
  { id: 12, parent: 8 },
  { id: 13, parent: 2 },
  { id: 14, parent: 8 }
 ];
 
 // Сперва думал вариант с сортировкой, если бы нужна была сортировка, то можно было бы использовать эту
 // тогда паренты выстраиваются по возрастанию, но текущий метод исключает сортировку
 // cats.sort((a, b) => (a.parent > b.parent) ? 1 : ((b.parent > a.parent) ? -1 : 0));
 
 const createTree = (arr) => {
    let tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;
   
    for (let i = 0; i < arr.length; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['childs'] = [];
    }
    for (let idEl in mappedArr) {
      mappedElem = mappedArr[idEl];
    // Если бы требовалось выдать древовидную структуру не только с полями id, childs, а и с parent
    // то объект можно было бы не деконструировать, а сразу передавать дальше 
      let {id, childs} = mappedElem;
      if (mappedElem.parent) {
        mappedArr[mappedElem['parent']]['childs'].push({id: id, childs: childs});
      }
      else {
        tree.push({id: id, childs: childs});
      }
    }
    return tree;
}
 
 createTree(cats);