function bestCharge(selectedItems) {
  //Helper functions
  function findItem(itemId){
    let items = loadAllItems();
    for(let i=0;i<items.length;i++){
      if(itemId===items[i].id){
        return [items[i].price, items[i].name];
      }
    }
    return 'item not found';
  }

  function inArray(search,array){
    for(var i in array){
      if(array[i]===search){
      return true;
        }
    }
    return false;
    }
  
  //Codes
  let input = selectedItems;
  let promotions = loadPromotions();
  let [promotionHalf, price] = [0, 0];
  let itemHalf = '';
  let order = `============= 订餐明细 =============`;

  for(let i=0;i<input.length;i++){
    itemId = input[i].split(' x ')[0];
    itemNum = Number(input[i].split(' x ')[1]);
    [itemPrice, itemName] = findItem(itemId);
    price += itemPrice*itemNum;
    if(inArray(itemId, promotions[1].items)){
      promotionHalf += 0.5*itemPrice*itemNum;
      itemHalf += itemName+'，';
    }
    order += `\n${itemName} x ${itemNum} = ${itemPrice*itemNum}元`;
  }
  
  if((price>=30)&&(promotionHalf>=6)){
    bestPrice = price - promotionHalf;
    order += `\n-----------------------------------\n使用优惠:`+
    `\n指定菜品半价(${itemHalf.slice(0,itemHalf.length-1)})，省${promotionHalf}元`+
    `\n-----------------------------------`+
    `\n总计：${bestPrice}元`+
    `\n===================================`;
  }
  else if((price>=30)&&(promotionHalf<6)){
    bestPrice = price - 6;
    order += `\n-----------------------------------\n使用优惠:`+
    `\n满30减6元，省6元`+
    `\n-----------------------------------`+
    `\n总计：${bestPrice}元`+
    `\n===================================`;
  }
  else if((price<30)&&(promotionHalf!==0)){
    bestPrice = price - promotionHalf;
    order += `\n-----------------------------------\n使用优惠:`+
    `\n指定菜品半价(${itemHalf.slice(0,itemHalf.length-2)})，省${promotionHalf}元`+
    `\n-----------------------------------`+
    `\n总计：${bestPrice}元`+
    `\n===================================`;
  }
  else{
    bestPrice = price;
    order += `\n-----------------------------------`+
    `\n总计：${bestPrice}元`+
    `\n===================================`;
  }
  
  return order.trim();
}