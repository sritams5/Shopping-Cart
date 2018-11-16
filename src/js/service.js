import $ from 'jquery';
export async function loadOrders(){
  const result = await $.ajax({

    url: `http://localhost:3000/orderlist`,

    type: 'GET',

    // data: {varName : varValue},

  });

  return result;
}
export async function loadPromos(){
  const result = await $.ajax({

    url: `http://localhost:3000/promolist`,

    type: 'GET',

    // data: {varName : varValue},

  });

  return result;
}

export async function updateOrder(id,datajson){
  const result = await $.ajax({

    url: `http://localhost:3000/orderlist/${id}`,

    type: 'PATCH',

    data: datajson,

  });

  return result;
}
export async function deleteOrder(id){
  const result = await $.ajax({

    url: `http://localhost:3000/orderlist/${id}`,

    type: 'DELETE',

    //data: datajson,

  });

  return result;
}
export async function loadPromosPerPromocode(promocode){
  const result = await $.ajax({

    url: `http://localhost:3000/promolist?promocode=${promocode}`,

    type: 'GET',

    // data: {varName : varValue},

  });

  return result;
}
function saveBoardsData(boards) {
  $.ajax('http://localhost:3000/boards/', {
    type: 'POST',
    async: false,
    data: { data: JSON.stringify(boards) },
  });
}
