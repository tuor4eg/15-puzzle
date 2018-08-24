const values = [8, 3, 2, 9, 11, 15, 5, 1, 7, 6, 13, 4, 12, 10, 14];

const generatePlayingField = () => {
  const tableEl = document.createElement('table');

  tableEl.className = 'table-bordered';
  for (let i = 0; i < 4; i += 1) {
    const row = tableEl.insertRow();
    for (let j = 0; j < 4; j += 1) {
      const cell = row.insertCell();
      cell.className = 'p-3';
      if (i === 3 && j === 3) {
        cell.classList.add('table-active');
      } else {
        cell.textContent = values[i + (j * 4)];
      }
    }
  }
  return tableEl;
};

const moving = (element, emptyCell) => {
  const oldNode = element.childNodes[0];

  element.removeChild(oldNode);
  element.setAttribute('class', 'p-3 table-active');

  emptyCell.setAttribute('class', 'p-3');
  emptyCell.append(oldNode);
  return;
};

const partialApply = (f, arg1) => arg2 => f(arg1, arg2);

const makeMove = (table, {target}) => {
  const currentCell = target.cellIndex;
  const currentRow = target.parentNode.rowIndex;
  const rightCell = table.rows[currentRow].cells[currentCell + 1];
  const leftCell = table.rows[currentRow].cells[currentCell - 1];
  const bottomRow = (currentRow < 3) ? table.rows[currentRow + 1].cells[currentCell] : table.rows[currentRow].cells[currentCell];
  const topRow = (currentRow > 0) ? table.rows[currentRow - 1].cells[currentCell] : table.rows[currentRow].cells[currentCell];
  var getEmpty;
  var message = 'fuck';
  if (rightCell && rightCell.className === 'p-3 table-active') {
    getEmpty = rightCell;
    message = 'right'
  }
  if (leftCell && leftCell.className === 'p-3 table-active') {
    getEmpty = leftCell;
    message = 'left'
  }
  if (topRow && topRow.className === 'p-3 table-active') {
    getEmpty = topRow;
    message = 'top'
  }
  if (bottomRow && bottomRow.className === 'p-3 table-active') {
    getEmpty = bottomRow;
    message = 'bottom'
  }
  if (getEmpty) {
    moving(target, getEmpty);
  }
  return;
  };

const generate = () => {
  const makeGame = generatePlayingField();
  const inception = document.getElementsByClassName('gem-puzzle')[0];
  inception.append(makeGame);
  makeGame.addEventListener('click', partialApply(makeMove, makeGame));
};
