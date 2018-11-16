import $ from 'jquery';
export async function loadOrders(){
  const result = await $.ajax({

url: `http://localhost:3000/orderlist`,

type: 'GET',

// data: {varName : varValue},

});

return result;
  // $.ajax({
  //       url: "http://localhost:3000/orderlist",
  //       type: 'GET',
  //       dataType: 'json', // added data type
  //       success: function(res) {
  //         return res;
  //           //console.log(res);
  //           //alert(res);
  //       },error: function(res) {
  //           // console.log(res);
  //           // alert(res);
  //           return res;
  //       }
  //   });
}

function saveBoardsData(boards) {
  $.ajax('http://localhost:3000/boards/', {
    type: 'POST',
    async: false,
    data: { data: JSON.stringify(boards) },
  });
}
