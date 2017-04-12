function combine() {
 
    var tab = document.getElementById("tb_doc_m"); //要合并的tableID
    if(!tab) {
        alert("未获取到表格！");
    }
    else{
        //从第二行开始，排除标题行
        var startRow = 1;
        //循环记录表格中td的内容,用来判断td中的value是否发生了改变
        var td1TempV = "";
//      var td2TempV = "";
//      var td3TempV = "";
        //如果td的值相同,那么变量加1, 否则将临时变量加入集合中
        var rowCount1 = 1;
//      var rowCount2 = 1;
//      var rowCount3 = 1;
        //得到相同内容的行数的集合www.2cto.com
        var totalcount1 = new Array();
//      var totalcount2 = newArray();
//      var totalcount3 = newArray();
        for(var i = 1; i < tab.rows.length; i++) {
            //首先拿出来td的值
            var td1Text = tab.rows[i].cells[0].innerText;
//          var td2Text = tab.rows[i].cells[1].innerText;
//          var td3Text = tab.rows[i].cells[2].innerText;
 
            //如果是第一次走循环,直接continue;
            if(i == startRow) {
                td1TempV = td1Text;
//              td2TempV = td2Text;
//              td3TempV = td3Text;
                continue;
            }
            //如果当前拿出来的值和出处的值相同,那么将临时数量加1，否则添加到集合里面
            if(td1TempV == td1Text && td1Text != null&& td1Text != "") {
                rowCount1++;
            } else{
                totalcount1.push(rowCount1);
                td1TempV = td1Text;
                rowCount1 = 1;
            }
 
//          if(td2TempV == td2Text && td2Text != null&& td2Text != "") {
//              rowCount2++;
//          } else{
//              totalcount2.push(rowCount2);
//              td2TempV = td2Text;
//              rowCount2 = 1;
//          }
// 
//          if(td3TempV == td3Text && td3Text != null&& td3Text != "") {
//              rowCount3++;
//          } else{
//              totalcount3.push(rowCount3);
//              td3TempV = td3Text;
//              rowCount3 = 1;
//          }
 
            //判断是否是循环的最后一次,如果是最后一次那个直接将当前的数量存储到集合里面
            if(i == tab.rows.length - 1) {
                totalcount1.push(rowCount1);
//              totalcount2.push(rowCount2);
//              totalcount3.push(rowCount3);
            }
        }
        //临时变量,再循环中判断是否和数组中的一项值相同 
        var tNum1 = 0;
//      var tNum2 = 0;
//      var tNum3 = 0;
        //注意这个循环是倒着来的
        for(var i = tab.rows.length - 1; i >= startRow; i--) {
            //临时变量,存储td 
            var tTd1 = tab.rows[i].cells[0];
//          var tTd2 = tab.rows[i].cells[1];
//          var tTd3 = tab.rows[i].cells[2];
            tNum1++;
//          tNum2++;
//          tNum3++;
            if(tab.rows.length == 2) {
                continue;
            }
            //如果发现tNum和数组中最后一个值相同,那么就可以断定相同的td已经结束[只是其中一个] 
            if(tNum1 == totalcount1[totalcount1.length - 1]) {
                //给当前td添加rowSpan属性
                tTd1.setAttribute("rowSpan", totalcount1[totalcount1.length - 1]);
                tTd1.setAttribute("style", "background-color:#ffffff");
                //将数组的最后一个元素弹出
                totalcount1.pop();
                tNum1 = 0;
            } else{
                //删除当前td 
                tab.rows[i].removeChild(tTd1);
            }
 
//          if(tNum2 == totalcount2[totalcount2.length - 1]) {
//              //给当前td添加rowSpan属性
// 
//              tTd2.setAttribute("rowSpan", totalcount2[totalcount2.length - 1]);
//              tTd2.setAttribute("style", "background-color:#ffffff");
//              //将数组的最后一个元素弹出
//              totalcount2.pop();
//              tNum2 = 0;
//          } else{
//              //删除当前td 
//              tab.rows[i].removeChild(tTd2);
//          }
// 
//          if(tNum3 == totalcount3[totalcount3.length - 1]) {
//              //给当前td添加rowSpan属性
//              tTd3.setAttribute("rowSpan", totalcount3[totalcount3.length - 1]);
//              tTd3.setAttribute("style", "background-color:#ffffff");
//              //将数组的最后一个元素弹出
//              totalcount3.pop();
//              tNum3 = 0;
//          } else{
//              //删除当前td 
//              tab.rows[i].removeChild(tTd3);
//          }
        }
    }
}