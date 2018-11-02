let colorArr = ["#912CEE", "#99ff00", "#312520", "#801dae", "#25f8cb", "#CC3333", "#808080", "#a29b7c", "#bce672", "#44cef6", "#c2ccd0", "#8d4bbb", "#2e4e7e", "#50616d", "#845a33", "#622a1d", "#ff6666", "#e4c6d0", "#8c4356", "#a29b7c", "#30dff3", "#fffbf0", "#edd1d8", "#801dae", "#b0a4e3", "#0099ff", "#003371", "#60281e", "#8c4356", "#4c221b", "#ff99ff", "#ffff99", "#0aa344", "#99ffff", "#c0ebd7", "#1bd1a5", "#c32136", "#ff3333", "#009999", "#fff143", "#f9906f", "#be002f", "#8d4bbb", "#815476",
  "#CD0000", "#CCCCCC", "#CAFF70", "#CAE1FF", "#C9C9C9", "#C7C7C7", "#C71585", "#C6E2FF", "#C67171", "#C5C1AA", "#C4C4C4", "#C2C2C2", "#C1FFC1", "#C1CDCD", "#C1CDC1", "#C1C1C1", "#C0FF3E", "#BFEFFF", "#BFBFBF", "#BF3EFF", "#BEBEBE", "#BDBDBD", "#BDB76B", "#BCEE68", "#BCD2EE", "#BC8F8F", "#BBFFFF", "#BABABA", "#BA55D3", "#B9D3EE", "#B8B8B8", "#B8860B", "#B7B7B7", "#B5B5B5", "#B4EEB4", "#B4CDCD", "#B452CD", "#B3EE3A", "#B3B3B3", "#B2DFEE", "#B23AEE", "#B22222", "#919191",
  "#B0E2FF", "#B0E0E6", "#B0C4DE", "#B0B0B0", "#B03060", "#AEEEEE", "#ADFF2F", "#ADD8E6", "#ADADAD", "#ABABAB", "#AB82FF", "#AAAAAA", "#A9A9A9", "#A8A8A8", "#A6A6A6", "#A52A2A", "#A4D3EE", "#A3A3A3", "#A2CD5A", "#A2B5CD", "#A1A1A1", "#A0522D", "#A020F0", "#9FB6CD", "#9F79EE", "#9E9E9E", "#9C9C9C", "#9BCD9B", "#9B30FF", "#9AFF9A", "#9ACD32", "#9AC0CD", "#9A32CD", "#999999", "#9932CC", "#98FB98", "#98F5FF", "#97FFFF", "#96CDCD", "#969696", "#949494", "#9400D3", "#9370DB", "#90EE90"];


const startX = 20;
const startY = 5;
const endY = 30; //底部距离 用来写字.

// 画坐标图
var draw = function (tableData, allProcess, allTime) {

  let promise = new Promise((resolve, reject) => {
    let [w, h] = drawAxis(allProcess, allTime);
    resolve([w, h])
  }).then(([w, h]) => {
    console.log(w, h);
    drawData(tableData, allProcess, w, h);
  });

};



var drawAxis = function (allProcess, allTime) {

  const myCanvas = document.getElementById("canvasAxis");
  const ctx = myCanvas.getContext("2d");

  myCanvas.height = myCanvas.height; //清空画布

  // canvas的高和宽和css的不一致哦,不是视觉上的高和宽
  const ctxWidth = myCanvas.width; // 1000
  const ctxHeight = myCanvas.height; // 500



  ctx.beginPath();
  ctx.lineWidth = "3";
  ctx.strokeStyle = "#409EFF";
  // 横轴和纵轴
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX, ctxHeight - endY);
  ctx.lineTo(ctxWidth, ctxHeight - endY);

  // 轴上的箭头
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX - 10, endY);

  // Y轴上的箭头
  ctx.moveTo(ctxWidth, ctxHeight - endY);
  ctx.lineTo(ctxWidth - 15, ctxHeight - 10);


  // console.log(tableData,allProcess,allTime);
  // 根据总服务次数,写X轴上的字,切割 ctxWidth

  // X轴上的标线和字
  const oneWidth = (ctxWidth - startX - 50) / allTime;
  let nowX = startX + oneWidth;
  for (let i = 0; i < allTime; i++) {
    // 小竖线
    ctx.moveTo(nowX, ctxHeight - endY - 10);
    ctx.lineTo(nowX, ctxHeight - endY);

    ctx.font = "20px Arial";
    ctx.fillText(i + 1, nowX - 10, ctxHeight);

    nowX += oneWidth;
  }

  // Y轴的字 allProcess 从下往上
  ctx.stroke();

  const oneHeight = (ctxHeight - endY - 50) / (allProcess.length);
  let nowY = ctxHeight - endY - oneHeight;
  for (let i = 0; i < allProcess.length; i++) {
    // 小横线
    ctx.beginPath();

    ctx.moveTo(startX, nowY);
    ctx.lineTo(startX + 10, nowY);
    ctx.font = "20px Arial";
    // ctx.strokeStyle = colorArr[i];
    ctx.fillStyle = colorArr[i];
    ctx.fillText(allProcess[i].name, startX - 20, nowY + 10);

    ctx.stroke();

    nowY -= oneHeight;

  }


  return [oneWidth, oneHeight];


};


// 填充数据的函数
var drawData = function (tableData, allProcess, w, h) {
  let canvasContent = document.getElementById("canvasContent");
  canvasContent.height = canvasContent.height;

  const ctx = canvasContent.getContext("2d");
  ctx.lineWidth = "8";

  let i = 0;
  for (const index in tableData) {
    if (tableData[index].State !== "到达") {
      let id = 0;


      for (const key in allProcess) {
        if (allProcess[key].name == tableData[index].name) {
          id = key;
          break;
        }
      }
      // id 为 竖轴字母
      // console.log(id);

      let Y = ((allProcess.length - id) * h) - endY - 2;
      ctx.beginPath();

      ctx.moveTo(((i - 1) * w) + startX + 48, Y);
      ctx.lineTo((i * w) + startX + 48, Y);
      ctx.strokeStyle = colorArr[id];

      ctx.stroke();
      i++;
    }

  }

}



